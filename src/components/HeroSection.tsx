'use client';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative z-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
          Crafting Digital Excellence
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300 mb-8">
          We build modern, responsive websites and web applications that help businesses thrive in the digital world.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
          >
            View Our Work
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-secondary"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
} 