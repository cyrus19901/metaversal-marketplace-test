import NFTCard from "../components/NFTCard";
import Footer from "./Footer";

interface NFT {
    id: number;
    name: string;
    owner: string;
    imageUrl: string;
    price: number;
    description: string;
}

const nfts: NFT[] = [
    {
        id: 1,
        name: "NFT 1",
        owner: "Owner 1",
        imageUrl: require("../images/705.webp"),
        price: 0.000001,
        description: "Some description for the NFT. Attributes can be added here in the form of an HTML"
    },
    {
        id: 2,
        name: "NFT 2",
        owner: "Owner 2",
        imageUrl: require("../images/1656.webp"),
        price: 0.0000015,
        description: "Some description for the NFT. Attributes can be added here in the form of an HTML"
    },
    {
        id: 3,
        name: "NFT 3",
        owner: "Owner 3",
        imageUrl: require("../images/2104.webp"),
        price: 0.000002,
        description: "Some description for the NFT. Attributes can be added here in the form of an HTML"
    },
    {
        id: 4,
        name: "NFT 4",
        owner: "Owner 4",
        imageUrl: require("../images/2318.webp"),
        price: 0.000001998,
        description: "Some description for the NFT. Attributes can be added here in the form of an HTML"
    },
    {
        id: 5,
        name: "NFT 5",
        owner: "Owner 5",
        imageUrl: require("../images/5439.webp"),
        price: 0.000001111,
        description: "Some description for the NFT. Attributes can be added here in the form of an HTML"
    },
    {
        id: 6,
        name: "NFT 6",
        owner: "Owner 6",
        imageUrl: require("../images/6290.webp"),
        price: 0.0000013312,
        description: "Some description for the NFT. Attributes can be added here in the form of an HTML"
    },
    {
        id: 7,
        name: "NFT 7",
        owner: "Owner 7",
        imageUrl: require("../images/6819.webp"),
        price: 0.0000011,
        description: "Some description for the NFT. Attributes can be added here in the form of an HTML"
    },
    {
        id: 8,
        name: "NFT 8",
        owner: "Owner 8",
        imageUrl: require("../images/7456.webp"),
        price: 0.002,
        description: "Some description for the NFT. Attributes can be added here in the form of an HTML"
    },
    {
        id: 9,
        name: "NFT 9",
        owner: "Owner 9",
        imageUrl: require("../images/9859.webp"),
        price: 0.00008,
        description: "Some description for the NFT. Attributes can be added here in the form of an HTML"
    },
    {
        id: 10,
        name: "NFT 10",
        owner: "Owner 10",
        imageUrl: require("../images/7488.webp"),
        price: 0.0008,
        description: "Some description for the NFT. Attributes can be added here in the form of an HTML"
    },
    {
        id: 11,
        name: "NFT 11",
        owner: "Owner 11",
        imageUrl: require("../images/7959.webp"),
        price: 0.000001777,
        description: "Some description for the NFT. Attributes can be added here in the form of an HTML"
    },
    {
        id: 12,
        name: "NFT 12",
        owner: "Owner 12",
        imageUrl: require("../images/8569.avif"),
        price: 0.000009,
        description: "Some description for the NFT. Attributes can be added here in the form of an HTML"
    },
];

export const aboutLinks = [
    { name: "About Us", url: "/about" },
    { name: "Contact Us", url: "/contact" },
    { name: "Privacy Policy", url: "/privacy" },
];

export const socialMediaLinks = [
    { name: "Twitter", url: "https://twitter.com/example" },
    { name: "Facebook", url: "https://facebook.com/example" },
    { name: "Instagram", url: "https://instagram.com/example" },
];

interface HomePageProps {
    receiverAddress: string,
}

const Homepage: React.FC<HomePageProps> = (props: HomePageProps) => {
    return (
        <div className="App" style={{ color: "bisque" }}>
            <header className="header">
                <h1>Cool NFT Collection</h1>
            </header>
            <main className="main-content">
                <div className="nft-container">
                    {nfts.map((nft, index) => (
                        <NFTCard
                            receiverAddress={props.receiverAddress}
                            key={index}
                            description={nft.description}
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

export default Homepage;