'use client';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center w-full max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 tracking-tight">
          <span className="text-[var(--accent-green)]">Andrej Paulicka</span>
        </h1>
        <h2 className="text-2xl sm:text-3xl text-gray-300 mb-8 font-medium">
          Full-Stack Developer & UI Designer
        </h2>
        <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
          Crafting digital experiences that are both beautiful and functional.
          Specializing in modern web technologies and user-centered design.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            className="btn-primary"
            onClick={() => {
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View My Work
          </button>
          <button 
            className="btn-secondary"
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 