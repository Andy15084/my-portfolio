'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!project.downloadUrl) return;
    
    setShowPasswordModal(true);
  };

  const submitPassword = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: project.id,
          password: password,
        }),
      });

      if (response.ok) {
        // Get the filename from the response headers
        const contentDisposition = response.headers.get('content-disposition');
        const filename = contentDisposition?.split('filename=')[1]?.replace(/"/g, '') || `${project.title}.zip`;
        
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

  if (project.isFolder) {
    return (
      <Link href={`/projects/${project.id}`} className="card group cursor-pointer block">
        <div className="relative overflow-hidden rounded-lg mb-4">
          {/* Project Images Collage */}
          <div className="w-full h-48 bg-gray-800 relative overflow-hidden">
            {project.projects && project.projects.length > 0 && (
              <div className="grid grid-cols-2 gap-1 h-full p-2">
                {project.projects.slice(0, 4).map((subProject, index) => (
                  <div key={subProject.id} className="relative overflow-hidden rounded">
                    <Image
                      src={subProject.image}
                      alt={subProject.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            
            {/* Folder Icon Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-white text-center">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z"></path>
                </svg>
                <p className="text-lg font-semibold">{project.title}</p>
                <p className="text-sm opacity-80">{project.projects?.length || 0} projects</p>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-[var(--accent-green)]">
          {project.title}
        </h3>
        <p className="text-gray-400 mb-4">
          {project.description}
        </p>
        <div className="flex items-center gap-2 text-gray-300">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span className="text-sm">View Projects</span>
        </div>
      </Link>
    );
  }

  return (
    <>
      <div className="card group">
        <div className="relative overflow-hidden rounded-lg mb-4">
          <Image
            src={project.image}
            alt={project.title}
            width={600}
            height={400}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-[var(--accent-green)]">
          {project.title}
        </h3>
        <p className="text-gray-400 mb-4">
          {project.description}
        </p>
        <div className="flex gap-4">
          {project.liveUrl && (
            <a 
              href={project.liveUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary"
            >
              View Project
            </a>
          )}
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[var(--accent-green)] hover:underline flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Source Code
            </a>
          )}
          {project.downloadUrl && (
            <button 
              onClick={handleDownload}
              className="text-[var(--accent-green)] hover:underline flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Download
            </button>
          )}
        </div>
      </div>

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
                }}
                className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard; 