// Import your project images
import shoeStoreImg from '../assets/images/shoe-store-project.png';
import cocktailImg from '../assets/images/cocktail-project.png';
import realEstateImg from '../assets/images/real-estate-project.png';

export const projectData = [
  {
    title: 'Shoes Store Application',
    description: 'A full-stack e-commerce solution with Mpesa integration and admin dashboards.',
    tech: ['React', 'Flask', 'PostgreSQL', 'Render'],
    imageUrl: shoeStoreImg,
    githubUrl: 'https://github.com/manyisanewton/shoes-haven.git', 
    liveUrl: 'https://shoes-haven.onrender.com/', 
  },
  {
    title: 'Cocktail Recipe Finder',
    description: 'A web app for browsing cocktails using TheCocktailDB API with a modern UI.',
    tech: ['React', 'Framer Motion', 'React Query'],
    imageUrl: cocktailImg,
    githubUrl: 'https://github.com/manyisanewton/cocktail.git', 
    liveUrl: 'https://manyisa-cocktail.onrender.com/', 
  },
  {
    title: 'Cashewnuts Shop',
    description: 'An online Shop  that sells cashewnuts  with a paypal intergration as a mode of payment.',
    tech: ['React', 'Flask', 'WebSocket', 'PostgreSQL'],
    imageUrl: realEstateImg,
    githubUrl: 'https://github.com/manyisanewton/muji.git', 
    liveUrl: 'https://muji-512d1.web.app/', 
  },
];