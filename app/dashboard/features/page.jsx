import React from 'react'

function FeaturesPage() {
  return (
    <div className='py-12 px-6 text-white max-w-4xl mx-auto'>
      
      {/* Features Section */}
      <div className='mb-16'>
        <h1 className='text-4xl font-bold mb-8 text-blue-400'>Platform Features</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          
          <div className='bg-white/5 p-6 rounded-xl border border-white/10'>
            <h3 className='text-xl font-bold mb-2 text-white'>Personalized Questions</h3>
            <p className='text-gray-400 leading-relaxed'>
              No generic flashcards here. The system creates unique interview questions based entirely on the specific job title and skills you tell it to focus on.
            </p>
          </div>

          <div className='bg-white/5 p-6 rounded-xl border border-white/10'>
            <h3 className='text-xl font-bold mb-2 text-white'>Smart Voice Recognition</h3>
            <p className='text-gray-400 leading-relaxed'>
              Just speak naturally! You don't have to type your answers. Our platform listens to your voice and writes it down for you instantly, just like a real conversation.
            </p>
          </div>

          <div className='bg-white/5 p-6 rounded-xl border border-white/10'>
            <h3 className='text-xl font-bold mb-2 text-white'>Realistic Practice Environment</h3>
            <p className='text-gray-400 leading-relaxed'>
              Practice with your camera and microphone on to simulate the exact feeling of a real video interview. It is the best way to shake off the nerves and build confidence.
            </p>
          </div>

          <div className='bg-white/5 p-6 rounded-xl border border-white/10'>
            <h3 className='text-xl font-bold mb-2 text-white'>Instant Expert Feedback</h3>
            <p className='text-gray-400 leading-relaxed'>
              As soon as you finish, you get a score out of 10 for every answer, along with the "perfect expected answer" to compare against, and personalized tips to improve.
            </p>
          </div>

          <div className='bg-white/5 p-6 rounded-xl border border-white/10 md:col-span-2'>
            <h3 className='text-xl font-bold mb-2 text-white'>Save & Track Progress</h3>
            <p className='text-gray-400 leading-relaxed'>
              Every interview you take is saved directly to your dashboard. You can always come back to read your past feedback and watch your interview skills grow over time.
            </p>
          </div>

        </div>
      </div>


      {/* How to Use Section */}
      <div>
        <h2 className='text-3xl font-bold mb-6 border-b border-gray-700 pb-4 text-blue-400'>How to Use MockIt</h2>
        <div className='space-y-6'>
            
          <div className='flex gap-4 items-start'>
            <div className='bg-blue-500/20 border border-blue-500/50 text-blue-400 font-bold rounded-full w-10 h-10 flex items-center justify-center shrink-0 mt-1'>
              1
            </div>
            <div>
              <h3 className='text-xl font-bold mb-1 text-white'>Create Your Interview</h3>
              <p className='text-gray-400 leading-relaxed'>
                Go to your Dashboard and click <strong>"+ Add New"</strong>. Type in the exact job role you are applying for (like "Marketing Manager") and a few required skills. Click start, and our system will generate your custom questions.
              </p>
            </div>
          </div>

          <div className='flex gap-4 items-start'>
            <div className='bg-blue-500/20 border border-blue-500/50 text-blue-400 font-bold rounded-full w-10 h-10 flex items-center justify-center shrink-0 mt-1'>
              2
            </div>
            <div>
              <h3 className='text-xl font-bold mb-1 text-white'>Set Up Your Space</h3>
              <p className='text-gray-400 leading-relaxed'>
                Before the interview starts, click <strong>"Enable Cam & Mic"</strong>. Your browser will ask for permission to use your camera and microphone so the system can hear your answers. Once you see yourself on screen, click "Start Interview".
              </p>
            </div>
          </div>

          <div className='flex gap-4 items-start'>
            <div className='bg-blue-500/20 border border-blue-500/50 text-blue-400 font-bold rounded-full w-10 h-10 flex items-center justify-center shrink-0 mt-1'>
              3
            </div>
            <div>
              <h3 className='text-xl font-bold mb-1 text-white'>Answer Out Loud</h3>
              <p className='text-gray-400 leading-relaxed'>
                Read the question on the screen. Take a deep breath, click the <strong>"Record Answer"</strong> button, and speak your response clearly. When you are finished talking, click "Stop Recording" to save your answer, and move to the next question.
              </p>
            </div>
          </div>

          <div className='flex gap-4 items-start'>
            <div className='bg-blue-500/20 border border-blue-500/50 text-blue-400 font-bold rounded-full w-10 h-10 flex items-center justify-center shrink-0 mt-1'>
              4
            </div>
            <div>
              <h3 className='text-xl font-bold mb-1 text-white'>Submit & Review</h3>
              <p className='text-gray-400 leading-relaxed'>
                Once you have answered all the questions, click <strong>"End Interview"</strong> and confirm your submission. You will instantly be taken to your feedback page to see your scores and find out how you did!
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default FeaturesPage