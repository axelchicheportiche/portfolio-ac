import React from "react";
import './Contact.css';
import LinkedinLogo from '../../assets/img/linkedin.png';
import EmailIcon from '../../assets/img/email-icon.png';
import GitIcon from '../../assets/img/github-icon.png';

const Contact = () => {
    return (
        <div className="contact">
            <h1>Contacts</h1>
            <div className="icon-box">
            <a  href="mailto:axelchicheportiche@gmail.com" target="_blank" rel="noopener noreferrer">
                <img src={EmailIcon} alt="mail icon" className="contact-icon" />
            </a>
            <a  href="https://www.linkedin.com/in/axel-chicheportiche/" target="_blank" rel="noopener noreferrer">
                <img src={LinkedinLogo} alt="logo linkedin" className="contact-icon" />
            </a>
            <a  href="https://github.com/axelchicheportiche/" target="_blank" rel="noopener noreferrer">
                <img src={GitIcon} alt="logo github" className="contact-icon" />
            </a>
            </div>
        </div>
    );
}

export default Contact;