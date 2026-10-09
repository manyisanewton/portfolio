// Import your project images
import aiQuotationImg from '../assets/images/ai-quotation-generator.png';
import vortexusImg from '../assets/images/vortexus-marketplace.png';
import neldaImg from '../assets/images/nelda-engineering.png';
import erpnextImg from '../assets/images/erpnext-customization.png';
import norwaImg from '../assets/images/newton-profile.png';

export const projectData = [
  {
    title: 'AI-Powered Water Treatment Quotation Generator',
    shortDescription: 'AI-assisted workflow reducing quotation prep from 5 hours to under 10 minutes.',
    description: 'An AI-powered workflow for preparing water treatment proposals and quotations. Supports uploading water analysis information as PDF documents or text for AI-assisted processing. Combines OCR and AI capabilities to support analysis and document-generation workflows. Produces downloadable quotations in PDF and Word formats. Designed to reduce quotation preparation time from approximately five hours to under ten minutes.',
    problem: 'Water treatment quotation preparation was a manual, time-consuming process taking ~5 hours per quotation, requiring engineers to analyze water reports and manually compile proposals.',
    approach: [
      'Built an AI-assisted workflow using Python/Flask with Hugging Face and Ollama for document processing',
      'Implemented OCR to extract data from uploaded PDF water analysis reports',
      'Integrated AI for automated proposal generation with PDF and Word output',
      'Containerized with Docker and deployed on Hostinger for production reliability',
    ],
    result: [
      'Reduced quotation preparation time from ~5 hours to under 10 minutes',
      'Automated document generation with professional PDF/Word output',
      'Streamlined workflow for water treatment sales team',
    ],
    tech: ['Python', 'Flask', 'Hugging Face', 'Ollama', 'JavaScript', 'OCR', 'Docker', 'Hostinger'],
    imageUrl: aiQuotationImg,
    githubUrl: 'https://github.com/manyisanewton/ai-quotation-generator',
    liveUrl: 'https://www.wari.norwawater.com/',
  },
  {
    title: 'Vortexus Industrial Marketplace',
    shortDescription: 'E-commerce marketplace with Blazor/ASP.NET Core and M-Pesa Daraja STK Push payments.',
    description: 'A full-featured e-commerce marketplace with responsive user interface and backend API integration. Built with Blazor and ASP.NET Core technologies. Integrated Safaricom M-Pesa Daraja STK Push for secure payment processing in the Kenyan market.',
    problem: 'Industrial suppliers needed a modern digital marketplace with local payment integration to reach customers online and process transactions securely.',
    approach: [
      'Developed responsive e-commerce frontend using Blazor WebAssembly',
      'Built backend APIs with ASP.NET Core for product catalog, orders, and user management',
      'Integrated Safaricom M-Pesa Daraja STK Push for seamless mobile payments',
      'Implemented secure authentication and role-based access control',
    ],
    result: [
      'Launched functional marketplace connecting industrial buyers and sellers',
      'Enabled M-Pesa mobile payments for Kenyan customers',
      'Delivered responsive UI across desktop and mobile devices',
    ],
    tech: ['Blazor', 'ASP.NET Core', 'C#', 'M-Pesa Daraja API', 'SQL Server'],
    imageUrl: vortexusImg,
    githubUrl: 'https://github.com/manyisanewton/vortexus-marketplace',
    liveUrl: 'https://reesolmart.com/',
  },
  {
    title: 'Nelda Engineering — Water Treatment Website',
    shortDescription: 'React website with ERPNext API integration, React Query, debounced search, and Framer Motion.',
    description: 'A React-based website for browsing and searching water treatment products. Integrated product data through the ERPNext API for real-time inventory and pricing. Implemented React Query for data fetching, React Router for navigation, debounced search, and pagination. Used Framer Motion and SweetAlert2 to support interface interactions and user feedback.',
    problem: 'Water treatment company needed a modern product catalog website with real-time ERP data integration and smooth user experience.',
    approach: [
      'Built responsive product catalog with React and Tailwind CSS',
      'Integrated ERPNext REST API for live product, pricing, and inventory data',
      'Implemented React Query for efficient data fetching and caching',
      'Added debounced search, pagination, and Framer Motion animations',
      'Used SweetAlert2 for user feedback and confirmation dialogs',
    ],
    result: [
      'Delivered modern product catalog with real-time ERP data',
      'Improved product discovery with fast search and filtering',
      'Enhanced UX with smooth animations and clear feedback',
    ],
    tech: ['React', 'Tailwind CSS', 'ERPNext API', 'React Query', 'React Router', 'Framer Motion', 'SweetAlert2'],
    imageUrl: neldaImg,
    githubUrl: 'https://github.com/manyisanewton/nelda-engineering',
    liveUrl: 'https://nelda-engineering.example.com/',
  },
  {
    title: 'ERPNext Customization & Workflow Automation',
    shortDescription: 'ERPNext modules for sales/HR, Zoho/n8n automation, and business system integrations.',
    description: 'Customized ERPNext functionality to support business operations across sales, HR, and operations. Worked with Zoho and n8n to automate workflows and reduce manual processes. Contributed to business system integrations and operational workflow improvements using Frappe Framework.',
    problem: 'Business operations relied on manual processes across multiple systems, causing delays, errors, and lack of visibility.',
    approach: [
      'Customized ERPNext modules (Sales, HR, Inventory) using Frappe Framework',
      'Built automated workflows with n8n connecting ERPNext, Zoho, and other tools',
      'Integrated Zoho CRM for lead-to-order automation',
      'Developed custom reports and dashboards for operational visibility',
    ],
    result: [
      'Automated key business workflows reducing manual effort',
      'Unified data across ERPNext, Zoho, and other systems',
      'Improved operational efficiency and reporting capabilities',
    ],
    tech: ['ERPNext', 'Frappe Framework', 'Zoho', 'n8n', 'Python', 'JavaScript', 'REST APIs'],
    imageUrl: erpnextImg,
    githubUrl: 'https://github.com/manyisanewton/erpnext-customization',
    liveUrl: '#',
  },
  {
    title: 'Norwa Africa Website',
    shortDescription: 'React/Flask full-stack website with PostgreSQL, chatbot, and cPanel deployment.',
    description: 'Full-stack company website built with React frontend and Flask backend. Integrated PostgreSQL database for dynamic content management. Implemented Dialogflow chatbot for customer support automation. Deployed on cPanel with Nginx reverse proxy configuration.',
    problem: 'Company needed a professional web presence with content management, customer support automation, and reliable hosting.',
    approach: [
      'Developed responsive React frontend with Tailwind CSS',
      'Built Flask REST API for content management and form handling',
      'Integrated PostgreSQL for persistent data storage',
      'Implemented Dialogflow chatbot for automated customer inquiries',
      'Configured cPanel deployment with Nginx reverse proxy and SSL',
    ],
    result: [
      'Launched professional company website with CMS capabilities',
      'Automated customer support with AI chatbot integration',
      'Achieved reliable production deployment on shared hosting',
    ],
    tech: ['React', 'Flask', 'PostgreSQL', 'Tailwind CSS', 'Dialogflow', 'cPanel', 'Nginx', 'Docker'],
    imageUrl: norwaImg,
    githubUrl: 'https://github.com/manyisanewton/norwa-africa-website',
    liveUrl: 'https://norwaafrica.com/',
  },
];
