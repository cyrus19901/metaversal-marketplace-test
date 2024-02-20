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

export default Footer;