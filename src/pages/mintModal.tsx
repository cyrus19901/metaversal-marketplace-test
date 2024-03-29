import { Button, Card, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { getStringByteCount, handleError, stringToBase64 } from '../utils/utils';
import { OrderDetail } from '../components/OrderDetails';
import { useEventEmitter } from "ahooks";
import { setApiKey, setApiNetwork } from "../utils/httpUtils";
import { NetworkType } from '../types';
import { CreateOrderFile } from '../utils/api-types';


interface ModalProps {
    name: string;
    onClose: () => void;
    image: string;
    price: number;
    receiveAddress: string;
    feeRate: number;
    fileName: string;
    devFee: number;
    size: number;
    description: string;
}

export type InscribeFileData = {
    filename: string
    dataURL: string
    size: number
    type?: string
}

const MintModal: React.FC<ModalProps> = ({ name, onClose, image, price, receiveAddress, feeRate, fileName, devFee, description }) => {
    const [receiveAddress_, setReceiveAddress_] = useState('');
    const [outputValue_, setOutputValue_] = useState(546);
    const [feeRate_, setFeeRate_] = useState<number>(1)
    const [devFee_, setDevFee_] = useState(0);
    const [devAddress_, setDevAddress_] = useState('');
    const [fileName_, setfileName_] = useState('');
    const [imageUrl_, setImageUrl_] = useState('');
    const [totalFee, setTotalFee] = useState(0);
    const [fileList, setFileList] = useState<InscribeFileData[]>([])
    const [orderId, setOrderId] = useState('');
    const [baseFee, setBaseFee] = useState(1999);
    const newOrder$ = useEventEmitter<void>();


    useEffect(() => {
        setReceiveAddress_(receiveAddress);
        setDevFee_(0);
        setDevAddress_(receiveAddress);
        setfileName_(fileName);
        setImageUrl_(image);
        setApiKey('c2b8064b78301fdf58c69e42838adea56fb1c8010613f57b8e9490bf6cc5be51');
        setApiNetwork(NetworkType.testnet);
        setFileList([
            {
                filename: fileName.slice(0, 512),
                dataURL: `data:text/plain;charset=utf-8;base64,${stringToBase64(fileName)}`,
                size: getStringByteCount(fileName)
            }
        ])
    }, [receiveAddress, name, price, feeRate, fileName, image]);


    const getFeeDetail = () => {

        const inscriptionBalance = outputValue_; // the balance in each inscription
        const fileCount = fileList.length; // the fileCount
        const fileSize = fileList.reduce((pre, item) => pre + item.size, 0); // the total size of all files
        const contentTypeSize = fileList.reduce((pre, item) => pre + item.dataURL.split('data:')[1].split('base64')[0].length, 0); // the size of contentType
        const feeFileSize = fileList.slice(0, 25).reduce((pre, item) => pre + item.size, 0); // the total size of first 25 files
        const feeFileCount = 25 // do not change this
        const balance = inscriptionBalance * fileCount;

        let addrSize = 25 + 1; // p2pkh
        if (receiveAddress.indexOf('bc1q') === 0 || receiveAddress.indexOf('tb1q') === 0) {
            addrSize = 22 + 1;
        } else if (receiveAddress.indexOf('bc1p') === 0 || receiveAddress.indexOf('tb1p') === 0) {
            addrSize = 34 + 1;
        } else if (receiveAddress.indexOf('2') === 0 || receiveAddress.indexOf('3') === 0) {
            addrSize = 23 + 1;
        }

        const baseSize = 88;

        let networkFee = Math.ceil(((fileSize + contentTypeSize) / 4 + (baseSize + 8 + addrSize + 8 + 23)) * feeRate);
        if (fileCount > 1) {
            networkFee = Math.ceil(((fileSize + contentTypeSize) / 4 + (baseSize + 8 + addrSize + (35 + 8) * (fileCount - 1) + 8 + 23 + (baseSize + 8 + addrSize + 0.5) * (fileCount - 1))) * feeRate);
        }
        let networkSatsByFeeCount = Math.ceil(((feeFileSize + contentTypeSize) / 4 + (baseSize + 8 + addrSize + 8 + 23)) * feeRate);
        if (fileCount > 1) {
            networkSatsByFeeCount = Math.ceil((((feeFileSize) + contentTypeSize * (feeFileCount / fileCount)) / 4 + (baseSize + 8 + addrSize + (35 + 8) * (fileCount - 1) + 8 + 23 + (baseSize + 8 + addrSize + 0.5) * Math.min(fileCount - 1, feeFileCount - 1))) * feeRate);
        }

        const baseFee = 1999 * Math.min(fileCount, feeFileCount); // 1999 base fee for top 25 files
        setBaseFee(baseFee);
        const floatFee = Math.ceil(networkSatsByFeeCount * 0.0499); // 4.99% extra miner fee for top 25 transations
        const serviceFee = Math.floor(baseFee + floatFee);
        const total = balance + networkFee + serviceFee;
        const truncatedTotal = Math.floor((total) / 1000) * 1000; // truncate
        const amount = truncatedTotal + devFee; // add devFee at the end
        setTotalFee(amount)
        console.log(feeRate)
        console.log(total)
        return amount;
    }

    function imageUrlToBase64(url: any) {
        return fetch(url)
            .then(response => response.blob())
            .then(blob => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });
            });
    }


    const createOrder = async () => {
        try {
            const fileData: any = await imageUrlToBase64('https://iili.io/JELfRNj.webp');
            console.log(receiveAddress_, feeRate_, outputValue_, imageUrl_, fileName_, devAddress_, devFee_)
            const imageObject: CreateOrderFile[] = [{
                dataURL: fileData, filename: fileName_
            }];
            const { orderId } = await api.createOrder({
                receiveAddress: receiveAddress_,
                feeRate: feeRate_,
                outputValue: outputValue_,
                files: imageObject,
                devAddress: devAddress_,
                devFee: devFee_,
            })
            console.log(orderId)
            newOrder$.emit()

            setOrderId(orderId)
        } catch (e) {
            handleError(e)
        }
    }

    const handleFeeRateOnChange = async (event: any) => {
        setFeeRate_(event.target.value);
        getFeeDetail();
    };

    const handleOutputOnChange = async (event: any) => {
        setOutputValue_(event.target.value);
        getFeeDetail();
    };

    return (
        <Modal
            visible={true}
            onCancel={onClose}
            footer={null}
            centered
            width={400}
            className="nft-container"
        >
            <Card
                cover={<img alt="Product" src={image} />}
                className="nft-card-container" // Replace 'your-image-url.jpg' with the URL of your image
            >
                <Card.Meta
                    className="nft-container"
                    title={name}
                    description={description}
                />
                <Input placeholder="Output Value" style={{ marginTop: '10px' }} onChange={handleOutputOnChange} />
                <Input placeholder="Fee rate" style={{ marginTop: '10px' }} onChange={handleFeeRateOnChange} />
                <div style={{ color: "beige" }}>
                    <p>Base Fee: {baseFee}</p>
                    <p>Total: {totalFee}</p>
                </div>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <Button type="primary" style={{ width: "100%", marginBottom: "10px", paddingBottom: "5px" }} className="mint-button" onClick={createOrder}>Mint</Button>
                    <Button type="primary" className="cancel-button" style={{ width: "100%" }} onClick={onClose}>Cancel</Button>
                </div>
                {orderId && <OrderDetail orderId={orderId} close={() => {
                    setOrderId('')
                }} />}
            </Card>
        </Modal >)
}

export default MintModal; 