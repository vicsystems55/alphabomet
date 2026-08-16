import agronomyImage from "../assets/slide-3.png";
import bonstructionImage from "../assets/slide-1.png";
import industrialImage from "../assets/slide-2.png";
import energyImage from "../assets/images/globe.jpg";
import fintechImage from "../assets/images/office.jpg";

export const homeSlides = [
  {
    id: 1,
    company: "Bonstruction Engineering",
    sector: "Infrastructure",
    title: "Infrastructure that moves economies forward.",
    subtitle:
      "Delivering engineering, civil construction and resilient infrastructure for Africa's next generation of growth.",
    buttonText: "Explore Bonstruction",
    buttonLink: "/businesses/infrastructure/bonstruction-engineering",
    image: bonstructionImage,
    logoKey: "bonstruction",
    imagePosition: "center",
  },
  {
    id: 2,
    company: "Saudhi Energy",
    sector: "Oil & Gas",
    title: "Powering progress across the energy value chain.",
    subtitle:
      "Advancing integrated upstream, midstream and downstream solutions that strengthen energy security and economic development.",
    buttonText: "Explore Saudhi Energy",
    buttonLink: "/businesses/energy/saudhi-energy",
    image: energyImage,
    logoKey: "saudhi",
    imagePosition: "center",
  },
  {
    id: 3,
    company: "Agronomy Development",
    sector: "Agriculture",
    title: "Cultivating food security. Growing shared prosperity.",
    subtitle:
      "Building modern agribusiness systems that improve productivity, strengthen value chains and nourish communities.",
    buttonText: "Explore Agronomy",
    buttonLink: "/businesses/agriculture/agronomy-development",
    image: agronomyImage,
    logoKey: "agronomy",
    imagePosition: "center",
  },
  {
    id: 4,
    company: "Underearth",
    sector: "Mining",
    title: "Unlocking resources with responsibility.",
    subtitle:
      "Developing Africa's mineral potential through responsible exploration, beneficiation and long-term value creation.",
    buttonText: "Explore Underearth",
    buttonLink: "/businesses/mining/underearth",
    image: industrialImage,
    logoKey: "underearth",
    imagePosition: "center",
  },
  {
    id: 5,
    company: "Paymanent",
    sector: "Fintech",
    title: "Digital finance designed to move without borders.",
    subtitle:
      "Enabling inclusive payments, remittance, digital wallets and embedded-finance infrastructure for modern African markets.",
    buttonText: "Explore Paymanent",
    buttonLink: "/businesses/financial-services/paymanent",
    image: fintechImage,
    logoKey: "paymanent",
    imagePosition: "center",
  },
];
