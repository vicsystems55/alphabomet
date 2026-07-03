import officeImage from "../assets/images/slides/office.jpg";
import agricultureImage from "../assets/images/slides/agriculture.jpg";
import logisticsImage from "../assets/images/slides/logistics.jpg";
import corporateOfficeImage from "../assets/images/slides/corporate-office.jpg";

export const homeSlides = [
  {
    id: 1,
    label: "Corporate Headquarters",
    title: "Building Enterprises That Power Economies",
    subtitle:
      "Africa-focused. Globally positioned. Building sustainable value through investment, infrastructure, technology and trade.",
    buttonText: "Discover Our Businesses",
    buttonLink: "/businesses",
    image: officeImage,
  },
  {
    id: 2,
    label: "Agriculture",
    title: "Agriculture For a Sustainable Tomorrow",
    subtitle:
      "Investing in modern agriculture and agri-businesses that enhance food security, empower communities and drive inclusive growth.",
    buttonText: "Explore Agriculture",
    buttonLink: "/businesses",
    image: agricultureImage,
  },
  {
    id: 3,
    label: "Global Logistics",
    title: "Global Logistics. Connecting Opportunities",
    subtitle:
      "Delivering integrated logistics and trade solutions that connect markets, enable commerce and drive economic growth.",
    buttonText: "Explore Logistics",
    buttonLink: "/businesses",
    image: logisticsImage,
  },
  {
    id: 4,
    label: "Global Corporate Office",
    title: "A Global Presence. A Local Commitment",
    subtitle:
      "Driving strategy, governance and innovation to unite our businesses and create lasting impact across Africa and beyond.",
    buttonText: "Partner With Us",
    buttonLink: "/partnerships",
    image: corporateOfficeImage,
  },
];