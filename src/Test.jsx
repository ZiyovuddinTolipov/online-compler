import { Link } from "react-router-dom";

const socials = [
    { id: 1, iconName: "RiTelegramLine", link: "https://t.me/algorithmicit/", className: "hover:text-[#6fcfff] duration-200" },
    { id: 2, iconName: "RiInstagramLine", link: "https://www.instagram.com/algorithmicit/", className: "hover:text-[#6fcfff] duration-200" },
    { id: 3, iconName: "RiFacebookCircleFill", link: "https://www.facebook.com/profile.php?id=61550537820791", className: "hover:text-[#6fcfff] duration-200" }
];

function SocialMediaLinks() {
    return (
        <div className="social-links">
            {socials.map((social) => (
                <Link key={social.id} to={social.link} target="_blank" rel="noopener noreferrer" className={social.className}>
<social.iconName /> hi
                </Link>
            ))}
        </div>
    );
}

export default SocialMediaLinks;