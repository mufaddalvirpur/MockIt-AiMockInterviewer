import React from 'react'

function AboutPage() {
  return (
    <div className='py-12 px-6 text-white max-w-4xl mx-auto'>
      
      {/* Page Title */}
      <div className='mb-12 text-center md:text-left'>
        <h1 className='text-4xl md:text-5xl font-bold mb-4 text-blue-400'>About MockIt</h1>
        <p className='text-lg text-gray-400'>
          Empowering job seekers to turn their interview anxiety into absolute confidence.
        </p>
      </div>

      <div className='space-y-8'>
        
        {/* Section 1: What is MockIt? */}
        <div className='bg-white/5 p-8 md:p-10 rounded-2xl border border-white/10 shadow-lg'>
          <h2 className='text-2xl font-bold mb-4 text-white'>What is MockIt?</h2>
          <p className='text-gray-300 leading-relaxed text-lg'>
            MockIt is an intelligent, AI-powered interview coach designed to help you prepare for the real thing. 
            Instead of staring at a mirror or reading static flashcards, MockIt provides a highly realistic video interview environment. 
            It asks you customized questions based on your specific industry, listens to your spoken answers, and gives you instant, 
            objective feedback on how to improve. It is like having a professional career coach available 24/7, right from your browser.
          </p>
        </div>

        {/* Section 2: Why We Built It */}
        <div className='bg-white/5 p-8 md:p-10 rounded-2xl border border-white/10 shadow-lg'>
          <h2 className='text-2xl font-bold mb-4 text-white'>Why We Built It</h2>
          <div className='text-gray-300 leading-relaxed text-lg space-y-4'>
            <p>
              The job hunt is exhausting. You spend hours perfectly tailoring your resume and applying to dozens of roles, only to finally land an interview and freeze up because of nerves. We realized that the hardest part of interview preparation is the <strong>lack of realistic practice and honest feedback</strong>.
            </p>
            <p>
              You can memorize all the technical concepts in the world, but speaking them out loud to a stranger is a completely different skill. Friends and family try to help, but they usually can't give you the tough, role-specific technical feedback you actually need. 
            </p>
            <p>
              We built MockIt to solve this "black box" problem. We wanted to create a safe, judgment-free zone where candidates could practice as many times as they want, make mistakes, learn the "perfect" answers, and walk into their actual interviews knowing exactly what to expect.
            </p>
          </div>
        </div>

        {/* Section 3: Our Mission */}
        <div className='bg-gradient-to-br from-blue-900/20 to-transparent p-8 md:p-10 rounded-2xl border border-blue-500/30 shadow-lg'>
          <h2 className='text-2xl font-bold mb-4 text-blue-300'>Our Mission</h2>
          <p className='text-gray-300 leading-relaxed text-lg'>
            Our mission is simple: to level the playing field. We believe that everyone deserves the tools to showcase their true potential. 
            By combining advanced AI with a realistic testing environment, we want to help you master the art of the interview and land the job you deserve.
          </p>
        </div>

      </div>

    </div>
  )
}

export default AboutPage