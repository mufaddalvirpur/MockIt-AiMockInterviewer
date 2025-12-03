export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Layer with Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Aesthetic Overlay */}
      <div className="absolute inset-0 z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        
        {/* Title: Changed to text-gray-900 (Darkest Gray) */}
        <h1 className="text-4xl md:text-5xl font-bold whitespace-nowrap text-white mb-6 tracking-tight drop-shadow-sm">
          Welcome to MockIt!
        </h1>

        {/* Paragraph: Changed to text-gray-900 (Darkest Gray) */}
        <p className="text-white text-lg md:text-xl mb-10 font-medium max-w-lg mx-auto leading-relaxed">
          Your personal AI interview coach. Practice, refine, and master your skills in a distraction-free environment.
        </p>
        
        {/* Button */}
        <a 
          href="/dashboard" 
          className="
            group
            inline-flex items-center justify-center
            bg-gray-900 text-white 
            px-8 py-4 
            rounded-full 
            text-lg font-medium 
            transition-all duration-300 
            shadow-lg hover:shadow-xl hover:-translate-y-1
            hover:bg-black
          "
        >
          Get Started 
          <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>

      </div>
    </div>
  );
}