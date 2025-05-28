'use client';
import Image from "next/image";
import Navbar from '@/components/Navbar';
import SolarSystem from '@/components/SolarSystem';
import HeroSection from '@/components/HeroSection';
import { useState } from 'react';

export default function Home() {
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: '' });

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormStatus({
          type: 'success',
          message: 'Message sent successfully! I will get back to you soon.',
        });
        (e.target as HTMLFormElement).reset();
      } else {
        setFormStatus({
          type: 'error',
          message: 'Failed to send message. Please try again.',
        });
      }
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Something went wrong. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <SolarSystem />
      <HeroSection />
      
      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <p className="text-gray-300 mb-4 text-lg leading-relaxed">
                I&apos;m a passionate Full-Stack Developer with a keen eye for design.
                With expertise in both frontend and backend technologies, I create
                seamless digital experiences that users love.
              </p>
              <p className="text-gray-300 mb-4 text-lg leading-relaxed">
                I began programming seriously in high school, where I quickly learned the 
                fundamentals of logical programming in Python. Later on, I became very 
                interested in creating websites using languages like HTML, PHP, and JavaScript, 
                but I soon realized these technologies are outdated for today&apos;s demands. 
                That&apos;s why I started focusing more on Next.js and building modern, 
                performant websites with it.
              </p>
              <p className="text-gray-300 mb-4 text-lg leading-relaxed">
                My interests extend beyond coding - I&apos;m deeply involved in sports, 
                particularly basketball, which I&apos;ve played both professionally and at 
                an amateur level. It has taught me tremendous discipline and responsibility—to 
                face everything head-on and fight through whatever comes my way. This mindset 
                translates perfectly into my approach to development challenges.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                I&apos;m also passionate about cooking and 3D modeling, which connect with my 
                love for design. These creative outlets have enhanced my ability to think 
                outside the box when designing digital experiences. In fact, my journey into 
                3D modeling began with 3D printing and naturally evolved into UI/UX design. 
                This diverse background allows me to bring unique perspectives to every project, 
                often revealing design possibilities you might not have considered.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 text-gray-300 text-lg">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--accent-green)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span>Bratislava, Slovakia</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--accent-green)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                  <span>SPŠE Zochova</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--accent-green)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Open for Freelance Work</span>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-80 h-[32rem] rounded-2xl overflow-hidden border-2 border-[var(--accent-green)] shadow-lg shadow-[var(--accent-green)]/10">
        <Image
                  src="/images/profile.jpg"
                  alt="Andrej Paulicka"
                  fill
          priority
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  className="hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Frontend Development */}
            <div className="card">
              <h3 className="text-2xl font-semibold mb-4 text-[var(--accent-green)]">Frontend Development</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js'].map((skill) => (
                  <div key={skill} className="flex items-center gap-2 text-gray-300">
                    <svg className="w-4 h-4 text-[var(--accent-green)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Backend Development */}
            <div className="card">
              <h3 className="text-2xl font-semibold mb-4 text-[var(--accent-green)]">Backend Development</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['Node.js', 'Python', 'MongoDB', 'SQL'].map((skill) => (
                  <div key={skill} className="flex items-center gap-2 text-gray-300">
                    <svg className="w-4 h-4 text-[var(--accent-green)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Design */}
            <div className="card">
              <h3 className="text-2xl font-semibold mb-4 text-[var(--accent-green)]">Design</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['Photoshop', 'Figma', 'Illustrator', 'Adobe XD', 'Fusion 360'].map((skill) => (
                  <div key={skill} className="flex items-center gap-2 text-gray-300">
                    <svg className="w-4 h-4 text-[var(--accent-green)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Others */}
            <div className="card">
              <h3 className="text-2xl font-semibold mb-4 text-[var(--accent-green)]">Operating Systems</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['Linux', 'Windows', 'macOS'].map((skill) => (
                  <div key={skill} className="flex items-center gap-2 text-gray-300">
                    <svg className="w-4 h-4 text-[var(--accent-green)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((project) => (
              <div key={project} className="card">
                <h3 className="text-xl font-semibold mb-2 text-[var(--accent-green)]">
                  Project {project}
                </h3>
                <p className="text-gray-400 mb-4">
                  A brief description of the project and the technologies used.
                </p>
                <div className="flex gap-4">
                  <button className="btn-primary">View Project</button>
                  <button className="text-[var(--accent-green)] hover:underline">
                    Source Code
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-center">Get in Touch</h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-gray-300 mb-8 text-lg text-center">
              Interested in working together? Let&apos;s connect!
            </p>
            <form 
              onSubmit={handleSubmit}
              className="space-y-6 mb-16"
            >
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 focus:outline-none focus:border-[var(--accent-green)] transition-colors"
                  placeholder="Your name"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 focus:outline-none focus:border-[var(--accent-green)] transition-colors"
                  placeholder="your.email@example.com"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 focus:outline-none focus:border-[var(--accent-green)] transition-colors resize-none"
                  placeholder="Your message..."
                  disabled={isSubmitting}
                ></textarea>
              </div>
              {formStatus.type && (
                <div className={`text-center p-3 rounded-lg ${
                  formStatus.type === 'success' ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'
                }`}>
                  {formStatus.message}
                </div>
              )}
              <div className="text-center">
                <button
                  type="submit"
                  className="btn-primary text-lg px-8 py-3 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
            
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <svg className="w-5 h-5 text-[var(--accent-green)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <a href="mailto:andrejpaulicka@gmail.com" className="hover:text-[var(--accent-green)] transition-colors">
                  andrejpaulicka@gmail.com
          </a>
        </div>
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <svg className="w-5 h-5 text-[var(--accent-green)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <a href="tel:+421902238309" className="hover:text-[var(--accent-green)] transition-colors">
                  +421 902 238 309
                </a>
              </div>
              <div className="flex items-center justify-center gap-6 pt-4">
                <a href="https://github.com/Andy15084" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[var(--accent-green)] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/andrejpaulicka/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[var(--accent-green)] transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
