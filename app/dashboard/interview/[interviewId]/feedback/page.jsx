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
      <h2 className='text-white text-3xl font-bold flex justify-center items-center'>Congratulations!</h2>
      <h2 className='text-white text-2xl my-1 font-semibold flex justify-center items-center'>Here is your Interview feedback</h2>
      <h2 className='text-lg my-2 p-1 bg-gray-300 border border-black flex justify-center items-center'>Your overall Rating is:&nbsp;<strong>{overallRating}</strong></h2>

      <h2 className='text-white text-md my-2 mt-12'>Interview Questions & Your Answers along with Feedback & Correct Answers:</h2>
    {feedbackList&&feedbackList.map((item,index)=>(
      <Collapsible key={index} className='mt-3'>
      <CollapsibleTrigger className='p-2 bg-gray-50 rounded-xl my-2 text-left flex justify-between gap-5 text-md border'>
      {item.question} <ChevronsUpDown className='h-5 w-5'/>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className='flex flex-col gap-2'>
          <h2 className='p-1 border rounded-xl text-sm bg-gray-50'><strong>Rating: </strong>{item.rating}</h2>
          <h2 className='p-1 border rounded-xl text-sm bg-gray-100'><strong>Your Answer: </strong>{item.userAns}</h2>
          <h2 className='p-1 border rounded-xl text-sm bg-gray-100'><strong>Correct Answer: </strong>{item.correctAns}</h2>
          <h2 className='p-1 border rounded-xl text-sm bg-gray-100'><strong>Feedback: </strong>{item.feedback}</h2>

        </div>
      </CollapsibleContent>
      </Collapsible>
    ))}

      <Button className='rounded-xl mt-7' onClick={()=>router.replace('/dashboard')}>Go Home</Button>

    </div>
  )
}

export default feedback