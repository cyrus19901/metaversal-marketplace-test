import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Button, Card, Input, } from "antd";
import Modal from "./pages/Modal";
import { NetworkType } from "./types";
function App() {

  const [unisatInstalled, setUnisatInstalled] = useState(false);
  const [connected, setConnected] = useState(false);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [publicKey, setPublicKey] = useState("");
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState({
    confirmed: 0,
    unconfirmed: 0,
    total: 0,
  });
  const [network, setNetwork] = useState(NetworkType.testnet.toString());

  // const getBasicInfo = async () => {
  //   const unisat = (window as any).unisat;
  //   const [address] = await unisat.getAccounts();
  //   setAddress(address);

  //   const publicKey = await unisat.getPublicKey();
  //   setPublicKey(publicKey);

  //   const balance = await unisat.getBalance();
  //   setBalance(balance);

  //   const network = await unisat.getNetwork();
  //   setNetwork(network);
  // };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(true);
  };
  const selfRef = useRef<{ accounts: string[] }>({
    accounts: [],
  });
  const self = selfRef.current;
  const handleAccountsChanged = (_accounts: string[]) => {
    if (self.accounts[0] === _accounts[0]) {
      // prevent from triggering twice
      return;
    }
    self.accounts = _accounts;
    if (_accounts.length > 0) {
      setAccounts(_accounts);
      setConnected(true);

      setAddress(_accounts[0]);

      // getBasicInfo();
    } else {
      setConnected(false);
    }
  };

  const handleNetworkChanged = (network: string) => {
    setNetwork(network);
    // getBasicInfo();
  };

  const connectWallet = async () => {
    const result = await unisat.requestAccounts();
    handleAccountsChanged(result);
  };

  interface NFTCardProps {
    imageUrl: string;
    name: string;
    price: number;
  }

  const NFTCard: React.FC<NFTCardProps> = ({ imageUrl, name, price }) => {

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
        {isModalOpen && <Modal
          name={name}
          onClose={closeModal}
          image={imageUrl}
          price={price}
          receiveAddress={address}
          feeRate={1}
          fileName="NFT--collection"
          devFee={0}
          size={0}
        />}
      </Card>
    );
  };

  interface FooterProps {
    socialMediaLinks: {
      name: string;
      url: string;
    }[];
    aboutLinks: {
      name: string;
      url: string;
    }[];
  }

  const socialMediaLinks = [
    { name: "Twitter", url: "https://twitter.com/example" },
    { name: "Facebook", url: "https://facebook.com/example" },
    { name: "Instagram", url: "https://instagram.com/example" },
  ];

  const aboutLinks = [
    { name: "About Us", url: "/about" },
    { name: "Contact Us", url: "/contact" },
    { name: "Privacy Policy", url: "/privacy" },
  ];

  const Footer: React.FC<FooterProps> = ({ socialMediaLinks, aboutLinks }) => {
    return (
      <div>
        <p style={{ textAlign: "center" }}>© 2024 Cool NFT Collection</p>
        <footer className="footer">
          <div className="footer-section">
            <h3>Social Media</h3>
            <ul className="footer-links">
              {socialMediaLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-section">
            <h3>About</h3>
            <ul className="footer-links">
              {aboutLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.url}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    );
  };

  interface NFT {
    id: number;
    name: string;
    owner: string;
    imageUrl: string;
    price: number;
  }
  const nfts: NFT[] = [
    {
      id: 1,
      name: "NFT 1",
      owner: "Owner 1",
      imageUrl: require("./images/705.webp"),
      price: 10,
    },
    {
      id: 2,
      name: "NFT 2",
      owner: "Owner 2",
      imageUrl: require("./images/1656.webp"),
      price: 20,
    },
    {
      id: 3,
      name: "NFT 3",
      owner: "Owner 3",
      imageUrl: require("./images/2104.webp"),
      price: 20,
    },
    {
      id: 4,
      name: "NFT 4",
      owner: "Owner 4",
      imageUrl: require("./images/2318.webp"),
      price: 20,
    },
    {
      id: 5,
      name: "NFT 5",
      owner: "Owner 5",
      imageUrl: require("./images/5439.webp"),
      price: 20,
    },
    {
      id: 6,
      name: "NFT 6",
      owner: "Owner 6",
      imageUrl: require("./images/6290.webp"),
      price: 20,
    },
    {
      id: 7,
      name: "NFT 7",
      owner: "Owner 7",
      imageUrl: require("./images/6819.webp"),
      price: 20,
    },
    {
      id: 8,
      name: "NFT 8",
      owner: "Owner 8",
      imageUrl: require("./images/7456.webp"),
      price: 20,
    },
    {
      id: 9,
      name: "NFT 9",
      owner: "Owner 9",
      imageUrl: require("./images/9859.webp"),
      price: 20,
    },
    {
      id: 10,
      name: "NFT 10",
      owner: "Owner 10",
      imageUrl: require("./images/7488.webp"),
      price: 20,
    },
    {
      id: 11,
      name: "NFT 11",
      owner: "Owner 11",
      imageUrl: require("./images/7959.webp"),
      price: 20,
    },
    {
      id: 12,
      name: "NFT 12",
      owner: "Owner 12",
      imageUrl: require("./images/8569.avif"),
      price: 20,
    },
  ];

  const Homepage: React.FC = () => {

    return (
      <div className="App" style={{ color: "bisque" }}>
        <header className="header">
          <h1>Cool NFT Collection</h1>
        </header>
        <main className="main-content">
          <div className="nft-container">
            {nfts.map((nft, index) => (
              <NFTCard
                key={index}
                imageUrl={nft.imageUrl}
                name={nft.name}
                price={nft.price}
              />
            ))}
          </div>
        </main>
        <div>
          <Footer socialMediaLinks={socialMediaLinks} aboutLinks={aboutLinks} />
        </div>
      </div>
    );
  };

  useEffect(() => {
    async function checkUnisat() {
      let unisat = (window as any).unisat;

      for (let i = 1; i < 10 && !unisat; i += 1) {
        await new Promise((resolve) => setTimeout(resolve, 100 * i));
        unisat = (window as any).unisat;
      }

      if (unisat) {
        setUnisatInstalled(true);
      } else if (!unisat) return;

      unisat.getAccounts().then((accounts: string[]) => {
        handleAccountsChanged(accounts);
      });

      unisat.on("accountsChanged", handleAccountsChanged);
      unisat.on("networkChanged", handleNetworkChanged);

      return () => {
        unisat.removeListener("accountsChanged", handleAccountsChanged);
        unisat.removeListener("networkChanged", handleNetworkChanged);
      };
    }

    checkUnisat().then();
  }, []);

  if (!unisatInstalled) {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <Button
              onClick={() => {
                window.location.href = "https://unisat.io";
              }}
            >
              Install Unisat Wallet
            </Button>
          </div>
        </header>
      </div>
    );
  }

  const unisat = (window as any).unisat;
  return (
    <div className="App">
      <header
        className="App-header"
        style={{
          backgroundColor: "black",
          color: "bisque",
          paddingTop: "20px",
          backgroundImage: require("./images/dark-grunge-style-scratched-metal-surface.jpg"),
        }}
      >
        {connected ? (
          <div>
            <div className="App">
              <Button
                type="primary"
                onClick={connectWallet}
                className="connect-button"
              >
                Connect Wallet
              </Button>
              <Homepage />
            </div>
          </div>
        ) : (
          <div>
            <div className="App">
              <Button
                type="primary"
                onClick={connectWallet}
                className="connect-button"
              >
                Connect Wallet
              </Button>
              <Homepage />
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

function SignPsbtCard() {
  const [psbtHex, setPsbtHex] = useState("");
  const [psbtResult, setPsbtResult] = useState("");
  return (
    <Card size="small" title="Sign Psbt" style={{ width: 300, margin: 10 }}>
      <div style={{ textAlign: "left", marginTop: 10 }}>
        <div style={{ fontWeight: "bold" }}>PsbtHex:</div>
        <Input
          defaultValue={psbtHex}
          onChange={(e) => {
            setPsbtHex(e.target.value);
          }}
        ></Input>
      </div>
      <div style={{ textAlign: "left", marginTop: 10 }}>
        <div style={{ fontWeight: "bold" }}>Result:</div>
        <div style={{ wordWrap: "break-word" }}>{psbtResult}</div>
      </div>
      <Button
        style={{ marginTop: 10 }}
        onClick={async () => {
          try {
            const psbtResult = await (window as any).unisat.signPsbt(psbtHex);
            setPsbtResult(psbtResult);
          } catch (e) {
            setPsbtResult((e as any).message);
          }
        }}
      >
        Sign Psbt
      </Button>
    </Card>
  );
}

function SignMessageCard() {
  const [message, setMessage] = useState("hello world~");
  const [signature, setSignature] = useState("");
  return (
    <Card size="small" title="Sign Message" style={{ width: 300, margin: 10 }}>
      <div style={{ textAlign: "left", marginTop: 10 }}>
        <div style={{ fontWeight: "bold" }}>Message:</div>
        <Input
          defaultValue={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></Input>
      </div>
      <div style={{ textAlign: "left", marginTop: 10 }}>
        <div style={{ fontWeight: "bold" }}>Signature:</div>
        <div style={{ wordWrap: "break-word" }}>{signature}</div>
      </div>
      <Button
        style={{ marginTop: 10 }}
        onClick={async () => {
          const signature = await (window as any).unisat.signMessage(message);
          setSignature(signature);
        }}
      >
        Sign Message
      </Button>
    </Card>
  );
}

function PushTxCard() {
  const [rawtx, setRawtx] = useState("");
  const [txid, setTxid] = useState("");
  return (
    <Card
      size="small"
      title="Push Transaction Hex"
      style={{ width: 300, margin: 10 }}
    >
      <div style={{ textAlign: "left", marginTop: 10 }}>
        <div style={{ fontWeight: "bold" }}>rawtx:</div>
        <Input
          defaultValue={rawtx}
          onChange={(e: any) => {
            setRawtx(e.target.value);
          }}
        ></Input>
      </div>
      <div style={{ textAlign: "left", marginTop: 10 }}>
        <div style={{ fontWeight: "bold" }}>txid:</div>
        <div style={{ wordWrap: "break-word" }}>{txid}</div>
      </div>
      <Button
        style={{ marginTop: 10 }}
        onClick={async () => {
          try {
            const txid = await (window as any).unisat.pushTx(rawtx);
            setTxid(txid);
          } catch (e) {
            setTxid((e as any).message);
          }
        }}
      >
        PushTx
      </Button>
    </Card>
  );
}

function PushPsbtCard() {
  const [psbtHex, setPsbtHex] = useState("");
  const [txid, setTxid] = useState("");
  return (
    <Card size="small" title="Push Psbt Hex" style={{ width: 300, margin: 10 }}>
      <div style={{ textAlign: "left", marginTop: 10 }}>
        <div style={{ fontWeight: "bold" }}>psbt hex:</div>
        <Input
          defaultValue={psbtHex}
          onChange={(e: any) => {
            setPsbtHex(e.target.value);
          }}
        ></Input>
      </div>
      <div style={{ textAlign: "left", marginTop: 10 }}>
        <div style={{ fontWeight: "bold" }}>txid:</div>
        <div style={{ wordWrap: "break-word" }}>{txid}</div>
      </div>
      <Button
        style={{ marginTop: 10 }}
        onClick={async () => {
          try {
            const txid = await (window as any).unisat.pushPsbt(psbtHex);
            setTxid(txid);
          } catch (e) {
            setTxid((e as any).message);
          }
        }}
      >
        pushPsbt
      </Button>
    </Card>
  );
}

function SendBitcoin() {
  const [toAddress, setToAddress] = useState(
    "tb1qmfla5j7cpdvmswtruldgvjvk87yrflrfsf6hh0",
  );
  const [satoshis, setSatoshis] = useState(1000);
  const [txid, setTxid] = useState("");
  return (
    <Card size="small" title="Send Bitcoin" style={{ width: 300, margin: 10 }}>
      <div style={{ textAlign: "left", marginTop: 10 }}>
        <div style={{ fontWeight: "bold" }}>Receiver Address:</div>
        <Input
          defaultValue={toAddress}
          onChange={(e) => {
            setToAddress(e.target.value);
          }}
        ></Input>
      </div>

      <div style={{ textAlign: "left", marginTop: 10 }}>
        <div style={{ fontWeight: "bold" }}>Amount: (satoshis)</div>
        <Input
          defaultValue={satoshis}
          onChange={(e: any) => {
            setSatoshis(parseInt(e.target.value));
          }}
        ></Input>
      </div>
      <div style={{ textAlign: "left", marginTop: 10 }}>
        <div style={{ fontWeight: "bold" }}>txid:</div>
        <div style={{ wordWrap: "break-word" }}>{txid}</div>
      </div>
      <Button
        style={{ marginTop: 10 }}
        onClick={async () => {
          try {
            const txid = await (window as any).unisat.sendBitcoin(
              toAddress,
              satoshis,
            );
            setTxid(txid);
          } catch (e) {
            setTxid((e as any).message);
          }
        }}
      >
        SendBitcoin
      </Button>
    </Card>
  );
}

export default App;
