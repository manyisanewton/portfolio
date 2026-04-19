// Import your project images
import shoeStoreImg from '../assets/images/shoe-store-project.png';
import cocktailImg from '../assets/images/cocktail-project.png';
import realEstateImg from '../assets/images/real-estate-project.png';

export const projectData = [
  {
    title: 'Shoes Store Application',
    description: 'A polished full-stack e-commerce platform built with Angular, Tailwind CSS, and Flask, featuring responsive shopping flows, secure authentication, animated product experiences, and M-Pesa STK Push payments through the Daraja API.',
    tech: ['Angular', 'Tailwind CSS', 'Flask', 'PostgreSQL', 'Daraja API'],
    imageUrl: shoeStoreImg,
    githubUrl: 'https://github.com/manyisanewton/shoes-haven.git', 
    liveUrl: 'https://shoes-haven.onrender.com/', 
  },
  {
    title: 'Cocktail Recipe Finder',
    description: 'A stylish recipe discovery experience powered by TheCocktailDB API, built with Next.js and Framer Motion, with debounced search, pagination, animated transitions, and clear feedback states that improve usability.',
    tech: ['Next.js', 'React', 'Framer Motion', 'SweetAlert2', 'REST API'],
    imageUrl: cocktailImg,
    githubUrl: 'https://github.com/manyisanewton/cocktail.git', 
    liveUrl: 'https://manyisa-cocktail.onrender.com/', 
  },
  {
    title: 'Cashewnuts Shop',
    description: 'An online storefront for cashew products with a responsive shopping experience, PayPal checkout integration, and full-stack functionality that supports browsing, ordering, and transaction handling.',
    tech: ['React', 'Flask', 'PayPal', 'PostgreSQL'],
    imageUrl: realEstateImg,
    githubUrl: 'https://github.com/manyisanewton/muji.git', 
    liveUrl: 'https://muji-512d1.web.app/', 
  },
];
