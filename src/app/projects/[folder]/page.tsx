'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useParams } from 'next/navigation';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  downloadUrl?: string;
}

const ProjectFolderPage = () => {
  const params = useParams();
  const folderId = params.folder as string;
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [password, setPassword] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<Project | null>(null);

  // Project data organized by folders
  const folderProjects: Record<string, { title: string; description: string; projects: Project[] }> = {
    'design-projects': {
      title: 'Design Projects',
      description: 'A collection of graphic design and UI/UX projects showcasing creative work and visual design skills.',
      projects: [
        {
          id: 'sa-page-design',
          title: 'SA Page Design',
          description: 'Modern and elegant page design showcasing clean typography, balanced layout, and professional visual hierarchy. This project demonstrates advanced design principles and creative problem-solving.',
          image: '/sa_page.png',
          downloadUrl: '/api/download/sa-page-design',
        },
        {
          id: 'sa-homepage-design',
          title: 'SA Homepage Design',
          description: 'Comprehensive homepage design featuring modern web aesthetics, intuitive navigation, and engaging user experience. This project showcases responsive design principles and contemporary web design trends.',
          image: '/sa_homepage.png',
          downloadUrl: '/api/download/sa-homepage-design',
        },
      ],
    },
    'photography-projects': {
      title: 'Photography Portfolio',
      description: 'A curated collection of photography work including portraits, landscapes, and commercial photography projects.',
      projects: [
        {
          id: 'plechovka-o',
          title: 'Plechovka Original',
          description: 'Original photography project showcasing creative composition and lighting techniques. This project demonstrates professional photography skills and artistic vision.',
          image: '/plechovkaop.png',
          downloadUrl: '/api/download/plechovka-o',
        },
        {
          id: 'plechovka-p',
          title: 'Plechovka Portrait',
          description: 'Portrait photography project featuring elegant composition and natural lighting. This work highlights the art of capturing human expression and emotion.',
          image: '/plechovkapp.png',
          downloadUrl: '/api/download/plechovka-p',
        },
        {
          id: 'plechovka-g',
          title: 'Plechovka Gallery',
          description: 'Gallery-style photography collection showcasing diverse subjects and creative approaches. This project represents a comprehensive portfolio of photographic work.',
          image: '/plechovkagp.png',
          downloadUrl: '/api/download/plechovka-g',
        },
      ],
    },
    'illustration-projects': {
      title: 'Illustration Portfolio',
      description: 'A collection of creative illustrations and digital artwork showcasing artistic talent and creative expression.',
      projects: [
        {
          id: 'maco',
          title: 'Maco Illustration',
          description: 'Creative illustration featuring unique artistic style and imaginative composition. This piece demonstrates artistic vision and technical illustration skills.',
          image: '/maco.png',
          downloadUrl: '/api/download/maco',
        },
        {
          id: 'zajac',
          title: 'Zajac Illustration',
          description: 'Whimsical illustration showcasing playful design elements and creative character development. This work highlights artistic creativity and storytelling through visuals.',
          image: '/zajac.png',
          downloadUrl: '/api/download/zajac',
        },
        {
          id: 'srdce',
          title: 'Srdce Illustration',
          description: 'Heart-themed illustration with emotional depth and artistic expression. This piece demonstrates the power of visual storytelling and emotional connection through art.',
          image: '/srdce.png',
          downloadUrl: '/api/download/srdce',
        },
      ],
    },
    'brand-identity-projects': {
      title: 'Brand Identity Portfolio',
      description: 'A comprehensive collection of brand identity work including letterheads, monograms, and design manuals showcasing professional branding expertise.',
      projects: [
        {
          id: 'hlavickovypapier',
          title: 'Letterhead Design',
          description: 'Professional letterhead design featuring elegant typography and corporate branding elements. This project demonstrates attention to detail and professional communication design.',
          image: '/hlavickovy papier.png',
          downloadUrl: '/api/download/hlavickovypapier',
        },
        {
          id: 'inicialky',
          title: 'Monogram Design',
          description: 'Custom monogram design showcasing sophisticated typography and personal branding. This work highlights the art of creating distinctive personal or corporate identity elements.',
          image: '/inicialky.png',
          downloadUrl: '/api/download/inicialky',
        },
        {
          id: 'artboard-1',
          title: 'Design Manual',
          description: 'Comprehensive design manual and brand guidelines showcasing systematic approach to brand identity development. This project demonstrates professional brand strategy and documentation.',
          image: '/Artboard 1.png',
          downloadUrl: '/api/download/dizajnmanual',
        },
      ],
    },
    'web-design-projects': {
      title: 'Web Design Portfolio',
      description: 'A collection of modern web design projects including UI/UX designs, landing pages, and interactive interfaces showcasing digital design expertise.',
      projects: [
        {
          id: 'login-stranka',
          title: 'Login Page Design',
          description: 'Modern login page design featuring cloud-themed aesthetics and user-friendly interface. This project demonstrates contemporary web design principles and user experience optimization.',
          image: '/Artboard 2.png',
          downloadUrl: '/api/download/login-stranka',
        },
        {
          id: 'travel-slovakia',
          title: 'Travel Slovakia Landing',
          description: 'Comprehensive landing page design for travel website showcasing Slovakia tourism. This project highlights responsive design, visual storytelling, and conversion-focused user experience.',
          image: '/traveltoslovakia.png',
          downloadUrl: '/api/download/travel-slovakia',
        },
      ],
    },
    'creative-projects': {
      title: 'Creative Portfolio',
      description: 'A diverse collection of creative projects including logos, caricatures, and artistic works showcasing versatility and creative expression across different mediums.',
      projects: [
        {
          id: 'discord-logo',
          title: 'Discord Logo Design',
          description: 'Custom Discord logo design featuring modern aesthetics and brand identity principles. This project demonstrates logo design expertise and digital branding skills.',
          image: '/unnamed.png',
          downloadUrl: '/api/download/discord-logo',
        },
        {
          id: 'caricatura',
          title: 'Caricature Artwork',
          description: 'Creative caricature artwork showcasing artistic talent and character illustration skills. This work demonstrates the ability to capture personality and humor through visual art.',
          image: '/Artboard 3.png',
          downloadUrl: '/api/download/caricatura',
        },
        {
          id: 'kniha',
          title: 'Book Design Project',
          description: 'Comprehensive book design project featuring typography, layout, and visual storytelling. This project showcases editorial design skills and creative publication work.',
          image: '/Artboard 4.png',
          downloadUrl: '/api/download/kniha',
        },
      ],
    },
  };

  const folderData = folderProjects[folderId];

  if (!folderData) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold mb-4">Folder Not Found</h1>
          <p className="text-gray-400 mb-8">The requested project folder does not exist.</p>
          <Link href="/#projects" className="btn-primary">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const handleDownload = async (project: Project) => {
    if (!project.downloadUrl) return;
    
    setSelectedProject(project);
    setShowPasswordModal(true);
  };

  const submitPassword = async () => {
    if (!selectedProject) return;
    
    setIsDownloading(true);
    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: selectedProject.id,
          password: password,
        }),
      });

      if (response.ok) {
        // Get the filename from the response headers
        const contentDisposition = response.headers.get('content-disposition');
        const filename = contentDisposition?.split('filename=')[1]?.replace(/"/g, '') || `${selectedProject.title}.zip`;
        
        // Create blob from response
        const blob = await response.blob();
        
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        setShowPasswordModal(false);
        setPassword('');
        setSelectedProject(null);
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Incorrect password');
      }
    } catch (error) {
      alert('Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const openProjectModal = (project: Project) => {
    setSelectedProjectForModal(project);
  };

  const closeProjectModal = () => {
    setSelectedProjectForModal(null);
  };

  const navigateProject = (direction: 'next' | 'prev') => {
    if (!selectedProjectForModal) return;
    
    const currentIndex = folderData.projects.findIndex(p => p.id === selectedProjectForModal.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = currentIndex + 1 >= folderData.projects.length ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex - 1 < 0 ? folderData.projects.length - 1 : currentIndex - 1;
    }
    
    setSelectedProjectForModal(folderData.projects[newIndex]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800/50 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/#projects" className="text-[var(--accent-green)] hover:underline flex items-center gap-2 mb-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Back to Projects
              </Link>
              <h1 className="text-4xl font-bold text-[var(--accent-green)]">{folderData.title}</h1>
              <p className="text-gray-400 mt-2">{folderData.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-300">{folderData.projects.length}</div>
              <div className="text-sm text-gray-500">Projects</div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {folderData.projects.map((project, index) => (
            <div 
              key={project.id} 
              className="group relative cursor-pointer"
              style={{
                animationDelay: `${index * 150}ms`,
                animation: 'slideInUp 0.6s ease-out forwards',
                opacity: 0,
                transform: 'translateY(30px)'
              }}
              onClick={() => openProjectModal(project)}
            >
              <div className="card aspect-square overflow-hidden relative">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                  {/* Title with slide animation */}
                  <h3 className="text-xl font-semibold mb-2 text-[var(--accent-green)] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    {project.title}
                  </h3>
                  
                  {/* Description with fade animation */}
                  <p className="text-gray-300 mb-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 line-clamp-3">
                    {project.description}
                  </p>
                  
                  {/* Buttons with slide animation */}
                  <div className="flex gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-300">
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-primary text-sm px-3 py-2 bg-[var(--accent-green)]/20 backdrop-blur-sm border border-[var(--accent-green)]/30 hover:bg-[var(--accent-green)]/40 hover:border-[var(--accent-green)]/60 transition-all duration-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Project
                      </a>
                    )}
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[var(--accent-green)] hover:text-white transition-colors duration-300 flex items-center gap-1 text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        Source
                      </a>
                    )}
                    {project.downloadUrl && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(project);
                        }}
                        className="text-[var(--accent-green)] hover:text-white transition-colors duration-300 flex items-center gap-1 text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        Download
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Floating corner accent */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-[var(--accent-green)]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-400 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[var(--accent-green)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17l9.2-9.2M17 17V7H7"></path>
                  </svg>
                </div>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-green)]/0 via-[var(--accent-green)]/10 to-[var(--accent-green)]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl scale-110 group-hover:scale-100"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal/Lightbox */}
      {selectedProjectForModal && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            {/* Close Button */}
            <button
              onClick={closeProjectModal}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={() => navigateProject('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>

            <button
              onClick={() => navigateProject('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>

            {/* Project Image */}
            <div className="relative w-full h-96 md:h-[70vh]">
              <Image
                src={selectedProjectForModal.image}
                alt={selectedProjectForModal.title}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Project Info */}
            <div className="p-8 bg-gray-900">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-[var(--accent-green)] mb-2">
                    {selectedProjectForModal.title}
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {selectedProjectForModal.description}
                  </p>
                </div>
                
                {/* Project Actions */}
                <div className="flex gap-3 ml-6">
                  {selectedProjectForModal.liveUrl && (
                    <a 
                      href={selectedProjectForModal.liveUrl}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-primary px-6 py-3"
                    >
                      View Project
                    </a>
                  )}
                  {selectedProjectForModal.githubUrl && (
                    <a 
                      href={selectedProjectForModal.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-300 flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      Source Code
                    </a>
                  )}
                  {selectedProjectForModal.downloadUrl && (
                    <button 
                      onClick={() => handleDownload(selectedProjectForModal)}
                      className="px-6 py-3 bg-[var(--accent-green)]/20 hover:bg-[var(--accent-green)]/30 border border-[var(--accent-green)]/30 hover:border-[var(--accent-green)]/60 rounded-lg transition-all duration-300 flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      Download
                    </button>
                  )}
                </div>
              </div>

              {/* Project Counter */}
              <div className="text-center text-gray-400 text-sm">
                {folderData.projects.findIndex(p => p.id === selectedProjectForModal.id) + 1} of {folderData.projects.length}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4 text-white">Enter Password</h3>
            <p className="text-gray-300 mb-4">
              This project requires a password to download.
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-[var(--accent-green)] mb-4"
            />
            <div className="flex gap-4">
              <button
                onClick={submitPassword}
                disabled={isDownloading}
                className="btn-primary flex-1 disabled:opacity-50"
              >
                {isDownloading ? 'Downloading...' : 'Download'}
              </button>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPassword('');
                  setSelectedProject(null);
                }}
                className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ProjectFolderPage; 