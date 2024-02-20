import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Button } from "antd";
import { NetworkType } from "./types";
import { Header } from "antd/es/layout/layout";
import Homepage, { aboutLinks, socialMediaLinks } from "./pages/HomePage";
import Footer from "./pages/Footer";
function App() {

  const [unisatInstalled, setUnisatInstalled] = useState(false);
  const [connected, setConnected] = useState(false);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [address, setAddress] = useState("");
  const [network, setNetwork] = useState(NetworkType.testnet.toString());

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
    } else {
      setConnected(false);
    }
  };

  const handleNetworkChanged = (network: string) => {
    setNetwork(network);
  };

  const connectWallet = async () => {
    const result = await unisat.requestAccounts();
    handleAccountsChanged(result);
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
              <Homepage receiverAddress={address} />
            </div>
          </div>
        ) : (
          <div className="App">
            <Button
              type="primary"
              onClick={connectWallet}
              className="connect-button"
            >
              Connect Wallet
            </Button>
            <Header style={{ marginTop: '50px', backgroundColor: "beige" }}>
              <h1>Metalversal Marketplace</h1>
            </Header>
            <main>
              <section className="about-section">
                <h2>What are Bitcoin NFTs?</h2>
                <p>Bitcoin NFTs, also known as Bitcoin ordinals or digital artifacts, provide a means to engrave digital content onto the Bitcoin blockchain.

                  Casey Rodarmor introduced the Bitcoin ordinals protocol in January 2023. This protocol enables the inscription of digital content such as art onto the Bitcoin blockchain. In contrast to non-fungible tokens (NFTs) found on Ethereum and other blockchains, Rodarmor aimed to establish an immutable on-chain representation of art, text, or video. The genesis ordinal, a pixel art depicting a skull, was inscribed by Rodarmor on December 14, 2022.

                  With the surge of the NFT space built on Ethereum’s ERC-721 standard in 2021, Rodarmor, a programmer and artist, recognized the opportunity to create a similar yet distinctive experience on the Bitcoin blockchain. His solution, Bitcoin ordinals, draws inspiration from ordinal theory, which he diligently implemented throughout 2022.

                  Ordinal theory focuses on individualizing satoshis, providing them with unique identities that facilitate tracking, transfer, and imbuing them with significance. The excitement surrounding ordinals gained momentum in February 2023, approximately six weeks after the creation of the genesis ordinal.

                  For a brief period, the number of inscriptions doubled every week. However, this figure could have been significantly higher had there been better planning and execution in terms of infrastructure for inscribing and trading ordinals. The rise of Bitcoin ordinals has propelled the Bitcoin network to new heights in terms of usage, fees, and storage space. This breakthrough may also mark a significant milestone for the Bitcoin application tier, shifting the narrative from being solely a “store of value” to encompassing more utilitarian aspects.</p>
              </section>
              <section className="services-section">
                <h2>How do Bitcoin Ordinals work?</h2>
                <p>The Ordinals protocol serves as a system to assign serial numbers to satoshis, granting each satoshi a unique identifier that can be tracked across transactions. Essentially, ordinals enable users to differentiate individual satoshis by attaching additional data to them, a process referred to as “inscription.”

                  Satoshi, named after the pseudonymous creator of Bitcoin, Satoshi Nakamoto, represents the smallest denomination of Bitcoin (BTC). One BTC can be divided into 100,000,000 satoshis, with each satoshi valued at 0.00000001 BTC.

                  The numbering of satoshis is based on their order of mining and transfer. The ordinal scheme relies on the mining order of satoshis, while the transfer scheme relies on the order of transaction inputs and outputs. Thus, the term “ordinals” arises. The first satoshi in the first block is assigned the ordinal number 0, the second satoshi is assigned 1, and so forth. According to ordinal theory, these ordinal numbers serve as stable identifiers for the data associated with the satoshis.

                  While there are similarities between traditional NFTs and ordinals, there are several key distinctions. NFTs are typically created using smart contracts on blockchains like Ethereum, Solana, and the BNB Chain, often with the assets they represent hosted elsewhere.

                  In contrast, ordinals are directly inscribed onto individual satoshis, which are then included in blocks on the Bitcoin blockchain. Ordinals exist entirely on the blockchain and do not require a sidechain or separate token. This characteristic allows ordinal inscriptions to inherit the simplicity, immutability, security, and durability inherent in Bitcoin itself.</p>
              </section>
              <section className="services-section">
                <h2>What is Ordinal Theory?</h2>
                <p>Ordinal Theory, within the Bitcoin context, proposes a methodology for identifying and tracking each satoshi using a serial number throughout its lifespan of transactions within the Bitcoin coin supply. This allows for the creation of ordinal inscriptions, which are digital assets similar to NFTs but inscribed directly on a satoshi within the Bitcoin network. The implementation of Ordinal Theory became possible with the Taproot upgrade, which was launched on November 14, 2021, eliminating the need for a separate sidechain or token.

                  With the ability to track and transfer individual satoshis, collecting them has become a possibility. The rarity of different satoshis is determined based on the total supply of bitcoins, and the following ranks have been assigned:

                  Common: Any satoshi other than the first satoshi of its block (2.1 quadrillion total supply).
                  Uncommon: The first satoshi of each block (6,929,999 total supply).
                  Rare: The first satoshi of each difficulty adjustment period (3437 total supply).
                  Epic: The first satoshi after each halving (32 total supply).
                  Legendary: The first satoshi of each cycle* (5 total supply).
                  Mythic: The first satoshi of the genesis block (1 total supply).
                  *A cycle represents the period between conjunctions, which occur when a halving and a difficulty adjustment coincide. While a cycle theoretically occurs every 6 halvings, the first conjunction is yet to occur and is expected to take place in 2032.

                </p>
              </section>
              <section className="services-section">
                <h2>How to mine Bitcoin Ordinals?</h2>
                <p>The process of creating Bitcoin ordinals has been referred to as mining, minting, or inscribing. However, unlike minting NFTs on the Ethereum blockchain, which has become a relatively mature process, mining Bitcoin ordinals is technically complex and lacks intuitive tools.

                  During the early days of Bitcoin ordinals, only those running a Bitcoin node could mine them. Tech-savvy users would utilize a Bitcoin node with the ord app, a command line wallet, as the entry point for mining ordinals. Node operators would load their wallets with some satoshis to cover gas fees and then perform the inscription process on their ordinals.

                  Nevertheless, there are now no-code ordinal mining applications such as Gamma or the Ordinals Bot that aim to enable users to upload the content they wish to inscribe and create their own Bitcoin ordinals. The user journey typically involves a payment process using a QR code, making it more intuitive for those who are less technically inclined.

                  The tools and infrastructure surrounding Bitcoin ordinals are still in the early stages of development. It has only been a few months since the genesis ordinals were inscribed. As demand from regular users and followers increases, the ecosystem and tooling around Bitcoin ordinals should start to mature, offering more user-friendly experiences.
                </p>
              </section>
            </main>
            <div>
              <Footer socialMediaLinks={socialMediaLinks} aboutLinks={aboutLinks} />
            </div>

          </div>
        )}
      </header>
    </div>
  );
};

export default App;
