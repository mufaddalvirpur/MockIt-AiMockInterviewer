"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

function feedback() {

  const params=useParams()
  const [feedbackList,setFeedbackList]=useState([])
  const [overallRating, setOverallRating] = useState("N/A")
  const router=useRouter()
  
  useEffect(()=>{
    GetFeedback()
  },[])
  
  const GetFeedback=async()=>{
    const result=await db.select()
    .from(UserAnswer)
    .where(eq(UserAnswer.mockIdRef,params.interviewId))
    .orderBy(UserAnswer.id)

    console.log(result)
    setFeedbackList(result)

    calculateOverallRating(result)
  }
  
  const calculateOverallRating = (feedbackList) => {
    if (!feedbackList || feedbackList.length === 0) {
      setOverallRating("N/A")
      return
    }
    const validRatings = feedbackList
      .map(item => parseFloat(item.rating))
      .filter(num => !isNaN(num))
    if (validRatings.length === 0) {
      setOverallRating("N/A")
      return
    }
    const averageRating = (validRatings.reduce((sum, r) => sum + r, 0) / validRatings.length).toFixed(1);
    setOverallRating(averageRating)
  }
  
  return (
    <div className='p-10'>
      <h2 className='text-blue-400 text-3xl font-bold flex justify-center items-center'>Congratulations!</h2>
      <h2 className='text-gray-300 text-2xl my-1 font-semibold flex justify-center items-center'>Here is your Interview feedback</h2>
      
      {/* Changed to dark glass theme and rounded the corners */}
      <h2 className='text-lg my-2 p-1 bg-white/5 border border-white/10 rounded-xl text-white flex justify-center items-center'>
        Your overall Rating is:&nbsp;<strong className="text-blue-400">{overallRating}</strong>
      </h2>

      <h2 className='text-gray-300 text-md my-2 mt-12'>Interview Questions & Your Answers along with Feedback & Correct Answers:</h2>
    
    {feedbackList&&feedbackList.map((item,index)=>(
      <Collapsible key={index} className='mt-3 w-full'>
      
      {/* Changed trigger from gray-50 to dark glass theme */}
      <CollapsibleTrigger className='p-2 w-full bg-white/5 border border-white/10 rounded-xl my-2 text-left flex justify-between items-center gap-5 text-md text-white hover:bg-white/10 transition-colors'>
        {item.question} <ChevronsUpDown className='h-5 w-5 shrink-0'/>
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        <div className='flex flex-col gap-2'>
          
          {/* Maintained p-1 size but applied subtle dark mode color-coding for readability */}
          <h2 className='p-1 border border-white/10 rounded-xl text-sm bg-white/5 text-white'>
            <strong className='text-blue-400'>Rating: </strong>{item.rating}
          </h2>
          
          <h2 className='p-1 border border-red-500/20 rounded-xl text-sm bg-red-500/10 text-red-200'>
            <strong className='text-red-400'>Your Answer: </strong>{item.userAns}
          </h2>
          
          <h2 className='p-1 border border-green-500/20 rounded-xl text-sm bg-green-500/10 text-green-200'>
            <strong className='text-green-400'>Correct Answer: </strong>{item.correctAns}
          </h2>
          
          <h2 className='p-1 border border-blue-500/20 rounded-xl text-sm bg-blue-500/10 text-blue-200'>
            <strong className='text-blue-400'>Feedback: </strong>{item.feedback}
          </h2>

        </div>
      </CollapsibleContent>
      </Collapsible>
    ))}

      {/* Styled the button to match your other pages */}
      <Button className='bg-white text-black hover:bg-gray-200 rounded-xl mt-7 px-6 transition-colors' onClick={()=>router.replace('/dashboard')}>Go Home</Button>

    </div>
  )
}

export default feedback