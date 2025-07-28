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
    githubUrl: 'https://github.com/your-username/shoe-store', // Add your link
    liveUrl: '#', // Add your link
  },
  {
    title: 'Cocktail Recipe Finder',
    description: 'A web app for browsing cocktails using TheCocktailDB API with a modern UI.',
    tech: ['React', 'Framer Motion', 'React Query'],
    imageUrl: cocktailImg,
    githubUrl: 'https://github.com/your-username/cocktail-recipe', // Add your link
    liveUrl: '#', // Add your link
  },
  {
    title: 'Real Estate Platform',
    description: 'Implements real-time updates with WebSocket to showcase property listings.',
    tech: ['React', 'Flask', 'WebSocket', 'PostgreSQL'],
    imageUrl: realEstateImg,
    githubUrl: 'https://github.com/your-username/real-estate-app', // Add your link
    liveUrl: '#', // Add your link
  },
];