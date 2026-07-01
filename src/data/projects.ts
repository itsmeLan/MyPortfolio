import i4cImg from '@/assets/i4cIMG.png';
import inventoryImg from '@/assets/inventoryIMG.png';
import gymIMG from '@/assets/gymIMG.png';

export interface Project {
  title: string;
  category: 'Full Stack' | 'Frontend';
  description: string;
  tags: string[];
  github: string;
  demo: string;
  image: string;
  details: string;
}

export const projects: Project[] = [
  {
    title: 'i4C Construction Website',
    category: 'Full Stack',
    description: 'A full-stack construction website with admin dashboard.',
    tags: ['React', 'Tailwind CSS', 'MongoDB', 'TypeScript'],
    github: 'https://github.com/itsmeLan/i4c-website',
    demo: 'https://i4c-website-frontend.vercel.app',
    image: i4cImg,
    details:
      'A company website for i4C Construction with service pages, project showcases, and contact flows. The admin dashboard lets staff manage content and site data through a React frontend, Node.js API, and MongoDB backend built with TypeScript.',
  },
  {
    title: 'Inventory and Order Management System',
    category: 'Full Stack',
    description:
      'This is a personal project that i built for a famous local clothing brand in cebu called Underground Apparel.',
    tags: ['React', 'Tailwind CSS', 'MongoDB', 'Javascript'],
    github: 'https://github.com/itsmeLan/UA-Project',
    demo: 'https://ua-project-opal.vercel.app',
    image: inventoryImg,
    details:
      'Built for Underground Apparel to track stock levels, manage product listings, and process customer orders in one place. Staff can update inventory, monitor order status, and keep sales data organized through a React dashboard backed by MongoDB.',
  },
  {
    title: 'Rise Fitness Hub Cebu',
    category: 'Full Stack',
    description: 'Fitness gym website with a realtime Dashboard',
    tags: ['Firebase', 'TypeScript', 'React', 'Tailwind CSS'],
    github: 'https://github.com/itsmeLan/Rise-Fitness-Website',
    demo: 'https://rise-fitness-website.vercel.app',
    image: gymIMG,
    details:
      'A gym website for Rise Fitness Hub Cebu featuring membership info, class schedules, and gym highlights. The realtime admin dashboard uses Firebase to update content and track gym data live, with a responsive React and Tailwind CSS frontend.',
  },
];
