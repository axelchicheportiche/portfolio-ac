import { useState } from "react";
import IconAccordion from "../../assets/img/icon-v.png";
import "./Experience.css";

const Experience = () => {

  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null)
    }
    setSelected(i)
  };

  return (
    <div className="experience-container">
      <h1>Experience</h1>
      
        {data.map((item, i) => (
          <div className="item" key={i}>
            <div className="experience" onClick={() => toggle(i)}>
              <div>
                {item.experience}
                <br />
                {item.role}
              </div>
              <img
                className={`icon-v ${selected === i ? "rotate" : ""}`}
                src={IconAccordion}
                alt="icon-accordion"
              />
            </div>
            <div className={`content ${selected === i ? "show" : ""}`}>
              <div>{item.content}</div>
            </div>
          </div>
        ))}
      
    </div>
  );
};

const data = [
  {
    experience: "2025 - Present - Progarden",
    role: "Web Developer",
    content:
      "Manage and maintain a network of four Prestashop-based e-commerce websites. Handle hosting, maintenance, SEO optimization, and complete website redesigns. Connect and integrate new technologies such as ERP and PIM systems to streamline business operations. Oversee technical upgrades, improve website performance, and manage the integration of third-party services.",
  },
  {
    experience: "2021-2023 - Centre Commercial / Veja Fair Trade",
    role: "E-commerce Project Manager",
    content:
      "Website overhaul, management and coordination of subcontractors. Trained business teams on Magento 2, conducted technical monitoring, and implemented tests (load testing, penetration testing). Developed SEO strategies, managed inventory, and scheduled sales and other commercial operations.",
  },
  {
    experience: "2018 - 2021 - Centre Commercial / Veja Fair Trade ",
    role: "E-commerce Assistant",
    content:
      "Developed shooting procedures (worn/packshot), managed refunds, merchandising, and configured the customer service platform (Zendesk).",
  },
  {
    experience: "2018 -  Gaya Productions",
    role: "Production Coordinator",
    content:
      "General production and administrative management: overseeing schedules, travel arrangements, accommodation logistics, and budget tracking. Responsible for documentation, filing, archiving, and record maintenance. Drafting and managing contracts (licensing, coproduction, employment) and handling administrative procedures for detachment.",
  },
  {
    experience: "2016-2017 Bleu Citron Production",
    role: "Assistant d'administration de tournées",
    content:
      "General production and administrative management: overseeing schedules, travel arrangements, accommodation logistics, and budget tracking. Responsible for documentation, filing, archiving, and record maintenance. Drafting and managing contracts (licensing, coproduction, employment) and handling administrative procedures for detachment.",
  },
];

export default Experience;
