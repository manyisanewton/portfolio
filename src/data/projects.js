// Import your project images
import shoeStoreImg from '../assets/images/shoe-store-project.png';
import cocktailImg from '../assets/images/cocktail-project.png';
import realEstateImg from '../assets/images/real-estate-project.png';

export const projectData = [
  {
    title: 'Shoes Store Application',
    shortDescription: 'Full-stack e-commerce platform with responsive UI and M-Pesa checkout.',
    description: 'A polished full-stack e-commerce platform built with Angular, Tailwind CSS, and Flask, featuring responsive shopping flows, secure authentication, animated product experiences, and M-Pesa STK Push payments through the Daraja API.',
    problem: 'Build a modern commerce experience that feels smooth on mobile, handles payments cleanly, and supports real product browsing without sacrificing speed.',
    approach: [
      'Designed a responsive storefront with Angular and Tailwind CSS.',
      'Connected the frontend to Flask APIs for product, auth, and transaction flows.',
      'Integrated Daraja STK Push to support local payment handling.',
    ],
    result: [
      'A production-ready shopping flow with local payment support.',
      'Cleaner user journeys across product browsing, checkout, and account access.',
    ],
    tech: ['Angular', 'Tailwind CSS', 'Flask', 'PostgreSQL', 'Daraja API'],
    imageUrl: shoeStoreImg,
    githubUrl: 'https://github.com/manyisanewton/shoes-haven.git', 
    liveUrl: 'https://shoes-haven.onrender.com/', 
  },
  {
    title: 'Cocktail Recipe Finder',
    shortDescription: 'Recipe discovery app with search, pagination, and animated interactions.',
    description: 'A stylish recipe discovery experience powered by TheCocktailDB API, built with Next.js and Framer Motion, with debounced search, pagination, animated transitions, and clear feedback states that improve usability.',
    problem: 'Create a discovery interface that makes searching and browsing recipe content feel fast, playful, and easy to follow.',
    approach: [
      'Built the UI with Next.js and React for a structured frontend flow.',
      'Used debounced search and pagination to improve browsing performance.',
      'Added Framer Motion and feedback states to make interactions feel smoother.',
    ],
    result: [
      'A cleaner API-driven browsing experience with better search usability.',
      'Improved visual flow through transitions, alerts, and clearer user feedback.',
    ],
    tech: ['Next.js', 'React', 'Framer Motion', 'SweetAlert2', 'REST API'],
    imageUrl: cocktailImg,
    githubUrl: 'https://github.com/manyisanewton/cocktail.git', 
    liveUrl: 'https://manyisa-cocktail.onrender.com/', 
  },
  {
    title: 'Cashewnuts Shop',
    shortDescription: 'Responsive storefront with PayPal checkout and full-stack ordering flow.',
    description: 'An online storefront for cashew products with a responsive shopping experience, PayPal checkout integration, and full-stack functionality that supports browsing, ordering, and transaction handling.',
    problem: 'Deliver a straightforward product storefront for a niche product business with reliable checkout and a responsive customer experience.',
    approach: [
      'Built the shopping interface in React with a responsive layout.',
      'Connected Flask backend flows to support catalog and transaction handling.',
      'Integrated PayPal to support online checkout for customer orders.',
    ],
    result: [
      'A focused storefront that supports browsing, ordering, and payments.',
      'A more accessible commerce flow for a smaller product business.',
    ],
    tech: ['React', 'Flask', 'PayPal', 'PostgreSQL'],
    imageUrl: realEstateImg,
    githubUrl: 'https://github.com/manyisanewton/muji.git', 
    liveUrl: 'https://muji-512d1.web.app/', 
  },
];
