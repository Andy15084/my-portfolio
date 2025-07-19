'use client';

import ProjectCard from './ProjectCard';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  downloadUrl?: string;
  isFolder?: boolean;
  projects?: Project[];
}

const Projects = () => {
  // Sample project data - you can expand this with your actual projects
  const projects: Project[] = [
    // Web Development Projects
    {
      id: 'nextlayer-website',
      title: 'NextLayer Studio Website',
      description: 'A modern, responsive website built with Next.js and TypeScript. Features include dynamic content management, SEO optimization, and a sleek user interface.',
      image: '/nextlayerstudiowebsite.jpg',
      liveUrl: 'https://www.nextlayer.studio/',
      githubUrl: 'https://github.com/Andy15084/NextLayer_Studio_wbapp',
    },
    {
      id: 'nextlayer-marketing',
      title: 'NextLayer Studio Marketing',
      description: 'A comprehensive marketing website showcasing digital services and solutions. Built with Next.js and TypeScript, featuring modern animations and responsive design.',
      image: '/nextlayerstudiomarketingwebsite.jpg',
      liveUrl: 'https://next-layer-studio-marketing.vercel.app',
      githubUrl: 'https://github.com/Andy15084/NextLayer-Studio-Marketing',
    },
    // Design Projects Folder
    {
      id: 'design-projects',
      title: 'Design Projects',
      description: 'A collection of graphic design and UI/UX projects showcasing creative work and visual design skills.',
      image: '',
      isFolder: true,
      projects: [
        {
          id: 'sa-page-design',
          title: 'SA Page Design',
          description: 'Modern and elegant page design showcasing clean typography, balanced layout, and professional visual hierarchy.',
          image: '/sa_page.png',
          downloadUrl: '/api/download/sa-page-design',
        },
        {
          id: 'sa-homepage-design',
          title: 'SA Homepage Design',
          description: 'Comprehensive homepage design featuring modern web aesthetics, intuitive navigation, and engaging user experience.',
          image: '/sa_homepage.png',
          downloadUrl: '/api/download/sa-homepage-design',
        },
      ],
    },
    // Photography Projects Folder
    {
      id: 'photography-projects',
      title: 'Photography Portfolio',
      description: 'A curated collection of photography work including portraits, landscapes, and commercial photography projects.',
      image: '',
      isFolder: true,
      projects: [
        {
          id: 'plechovka-o',
          title: 'Plechovka Original',
          description: 'Original photography project showcasing creative composition and lighting techniques.',
          image: '/plechovkaop.png',
          downloadUrl: '/api/download/plechovka-o',
        },
        {
          id: 'plechovka-p',
          title: 'Plechovka Portrait',
          description: 'Portrait photography project featuring elegant composition and natural lighting.',
          image: '/plechovkapp.png',
          downloadUrl: '/api/download/plechovka-p',
        },
        {
          id: 'plechovka-g',
          title: 'Plechovka Gallery',
          description: 'Gallery-style photography collection showcasing diverse subjects and creative approaches.',
          image: '/plechovkagp.png',
          downloadUrl: '/api/download/plechovka-g',
        },
      ],
    },
    // Illustration Projects Folder
    {
      id: 'illustration-projects',
      title: 'Illustration Portfolio',
      description: 'A collection of creative illustrations and digital artwork showcasing artistic talent and creative expression.',
      image: '',
      isFolder: true,
      projects: [
        {
          id: 'maco',
          title: 'Maco Illustration',
          description: 'Creative illustration featuring unique artistic style and imaginative composition.',
          image: '/maco.png',
          downloadUrl: '/api/download/maco',
        },
        {
          id: 'zajac',
          title: 'Zajac Illustration',
          description: 'Whimsical illustration showcasing playful design elements and creative character development.',
          image: '/zajac.png',
          downloadUrl: '/api/download/zajac',
        },
        {
          id: 'srdce',
          title: 'Srdce Illustration',
          description: 'Heart-themed illustration with emotional depth and artistic expression.',
          image: '/srdce.png',
          downloadUrl: '/api/download/srdce',
        },
      ],
    },
    // Brand Identity Projects Folder
    {
      id: 'brand-identity-projects',
      title: 'Brand Identity Portfolio',
      description: 'A comprehensive collection of brand identity work including letterheads, monograms, and design manuals showcasing professional branding expertise.',
      image: '',
      isFolder: true,
      projects: [
        {
          id: 'hlavickovypapier',
          title: 'Letterhead Design',
          description: 'Professional letterhead design featuring elegant typography and corporate branding elements.',
          image: '/hlavickovy papier.png',
          downloadUrl: '/api/download/hlavickovypapier',
        },
        {
          id: 'inicialky',
          title: 'Monogram Design',
          description: 'Custom monogram design showcasing sophisticated typography and personal branding.',
          image: '/inicialky.png',
          downloadUrl: '/api/download/inicialky',
        },
        {
          id: 'artboard-1',
          title: 'Design Manual',
          description: 'Comprehensive design manual and brand guidelines showcasing systematic approach to brand identity development.',
          image: '/Artboard 1.png',
          downloadUrl: '/api/download/dizajnmanual',
        },
      ],
    },
    // Web Design Projects Folder
    {
      id: 'web-design-projects',
      title: 'Web Design Portfolio',
      description: 'A collection of modern web design projects including UI/UX designs, landing pages, and interactive interfaces showcasing digital design expertise.',
      image: '',
      isFolder: true,
      projects: [
        {
          id: 'login-stranka',
          title: 'Login Page Design',
          description: 'Modern login page design featuring cloud-themed aesthetics and user-friendly interface.',
          image: '/Artboard 2.png',
          downloadUrl: '/api/download/login-stranka',
        },
        {
          id: 'travel-slovakia',
          title: 'Travel Slovakia Landing',
          description: 'Comprehensive landing page design for travel website showcasing Slovakia tourism.',
          image: '/traveltoslovakia.png',
          downloadUrl: '/api/download/travel-slovakia',
        },
      ],
    },
    // Creative Projects Folder
    {
      id: 'creative-projects',
      title: 'Creative Portfolio',
      description: 'A diverse collection of creative projects including logos, caricatures, and artistic works showcasing versatility and creative expression across different mediums.',
      image: '',
      isFolder: true,
      projects: [
        {
          id: 'discord-logo',
          title: 'Discord Logo Design',
          description: 'Custom Discord logo design featuring modern aesthetics and brand identity principles.',
          image: '/unnamed.png',
          downloadUrl: '/api/download/discord-logo',
        },
        {
          id: 'caricatura',
          title: 'Caricature Artwork',
          description: 'Creative caricature artwork showcasing artistic talent and character illustration skills.',
          image: '/Artboard 3.png',
          downloadUrl: '/api/download/caricatura',
        },
        {
          id: 'kniha',
          title: 'Book Design Project',
          description: 'Comprehensive book design project featuring typography, layout, and visual storytelling.',
          image: '/Artboard 4.png',
          downloadUrl: '/api/download/kniha',
        },
      ],
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-center">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 