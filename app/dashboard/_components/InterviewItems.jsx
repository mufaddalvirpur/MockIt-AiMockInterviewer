import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewItems({interview}) {

    const router=useRouter()

    const onStart=()=>{
        router.push('/dashboard/interview/'+interview?.mockId)
    }
    const onFeedback=()=>{
        router.push('/dashboard/interview/'+interview.mockId+'/feedback')
    }
    
  return (

    <div className='bg-white/5 border border-white/10 rounded-xl p-2'>
        
        {/* Kept original text sizes, just updated colors for dark theme */}
        <h2 className='font-bold text-blue-400'>{interview?.jobPosition}</h2>
        <h2 className='text-sm text-gray-300'>Skills: {interview?.jobDesc}</h2>
        <h2 className='text-xs text-gray-500'>Created at: {interview?.createdAt}</h2>
        
        {/* Reverted back to your original mt-2 spacing */}
        <div className='flex justify-between mt-2 gap-2'>
            
            <Button 
                size="sm" 
                variant="outline" 
                className="bg-transparent text-white border border-white/20 rounded-xl hover:bg-white/10 hover:text-white transition-colors"
                onClick={onFeedback}
            >
                Feedback
            </Button>
            
            <Button 
                size="sm" 
                className="bg-blue-400 text-white hover:bg-blue-300 rounded-xl px-6 transition-colors"
                onClick={onStart} 
            >
                Start
            </Button>
            
        </div>
    </div>
  )
}

export default InterviewItems