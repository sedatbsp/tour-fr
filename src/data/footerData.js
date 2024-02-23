import logo from "@/images/resources/odeontech.jpeg";

const social = [
  { icon: "fa-twitter", link: "" },
  { icon: "fa-instagram", link: "" },
  { icon: "fa-linkedin-in", link: "https://www.linkedin.com/company/odeontech/" },
];

const footerData = {
  logo,
  social,
  year: new Date().getFullYear(),
  author: "OdeonTech",
  about:
    "Welcome to our Tour Guide Agency.",
  icons: [
    {
      id: 1,
      icon: "fas fa-phone-square-alt",
      content: "+ 90 216 599 19 09",
      subHref: "tel",
    },
    {
      id: 2,
      icon: "fas fa-envelope",
      content: "info@odeontech.com",
      subHref: "mailto",
    },
    {
      id: 3,
      icon: "fas fa-map-marker-alt",
      content: "Kolektif House Ataşehir, İstanbul",
    },
  ],
  companies: [
    { id: 1, link: "/about", title: "About Us" },
    { id: 2, link: "#", title: "Community Blog" },
    { id: 3, link: "#", title: "Rewards" },
    { id: 4, link: "#", title: "Work with Us" },
    { id: 5, link: "#", title: "Meet the Team" },
  ],
  explore: [
    { id: 1, link: "#", title: "Account" },
    { id: 2, link: "#", title: "Legal" },
    { id: 3, link: "#", title: "Contact" },
    { id: 4, link: "#", title: "Affilitate Program" },
    { id: 5, link: "#", title: "Privacy Policy" },
  ],
};

export default footerData;
