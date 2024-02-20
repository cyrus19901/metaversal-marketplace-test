import { Button, Card } from "antd";
import { useState } from "react";
import MintModal from "../pages/MintModal";


interface NFTCardProps {
    receiverAddress: string;
    imageUrl: string;
    name: string;
    price: number;
    description: string;
}

const NFTCard: React.FC<NFTCardProps> = ({ imageUrl, name, price, receiverAddress, description }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <Card
            className="nft-box"
            hoverable
            cover={<img alt={name} src={imageUrl} style={{ width: "100%" }} />}
        >
            <Card.Meta
                title={name}
                description={`Price: ${price} BTC`}
                style={{ color: "white" }}
            />
            <Button type="primary" style={{ width: "100%" }} onClick={openModal}>
                Mint
            </Button>
            {isModalOpen && <MintModal
                name={name}
                description={description}
                onClose={closeModal}
                image={imageUrl}
                price={price}
                receiveAddress={receiverAddress}
                feeRate={1}
                fileName="NFT--collection"
                devFee={0}
                size={0}
            />}
        </Card>
    );
};

export default NFTCard;