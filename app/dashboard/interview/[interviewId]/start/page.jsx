"use client"
import { db } from '@/utils/db'
import { MockIt } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import QuestionSec from './_components/QuestionSec'
import RecordAns from './_components/RecordAns'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function StartInterview() {
    const params=useParams()
    const router = useRouter() // Used to navigate after clicking "Submit"
    
    const [interviewData,setInterviewData]=useState()
    const [mockInterviewQues,setMockInterviewQues]=useState()
    const [activeQuesIndex,setActiveQuesIndex]=useState(0)
    const [openDialog, setOpenDialog] = useState(false) // State to control the popup
    
    useEffect(()=>{
        GetInterviewDetails()
    },[])
    
    const GetInterviewDetails=async()=>{
            const result=await db.select().from(MockIt)
            .where(eq(MockIt.mockId,params.interviewId))

            const jsonMockResp=JSON.parse(result[0].jsonMockResp)
            console.log(jsonMockResp)
            setMockInterviewQues(jsonMockResp)
            setInterviewData(result[0])
    }

    // Function to handle final submission
    const handleEndInterview = () => {
        router.push('/dashboard/interview/'+interviewData?.mockId+"/feedback")
    }
    
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            {/* Questions */}
            <QuestionSec mockInterviewQues={mockInterviewQues}
            activeQuesIndex={activeQuesIndex}
            />
            {/* Video/Audio Recording */}
            <RecordAns mockInterviewQues={mockInterviewQues}
            activeQuesIndex={activeQuesIndex}
            interviewData={interviewData}
            />
        </div>
        <div className='flex justify-end gap-4 my-4'>
          {activeQuesIndex>0&&  
          <Button size="sm" className='w-40 px-2 flex gap-1.5 justify-center items-center bg-white text-black border border-black rounded-xl hover:bg-gray-200 transition-colors' onClick={()=>setActiveQuesIndex(activeQuesIndex-1)}>
            <ArrowLeft className="w-3.5 h-3.5" /> Previous Question
          </Button>}
          
          {activeQuesIndex!=mockInterviewQues?.length-1&& 
           <Button size="sm" className='w-40 px-2 flex gap-1.5 justify-center items-center rounded-xl hover:text-gray-200' onClick={()=>setActiveQuesIndex(activeQuesIndex+1)}>
             Next Question <ArrowRight className="w-3.5 h-3.5" />
           </Button>}
          
          {activeQuesIndex==mockInterviewQues?.length-1&&  
            // Removed Link wrapper and added onClick to open Dialog instead
            <Button size="sm" className='w-40 px-2 bg-black text-white rounded-xl hover:text-gray-200' onClick={() => setOpenDialog(true)}>
              End Interview
            </Button>
          }
        </div>

        {/* Confirmation Dialog Popup */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className='bg-white max-w-md'>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Are you sure you want to submit?</DialogTitle>
              <DialogDescription className="mt-2 text-gray-600">
                You won't be able to return to this interview once submitted. Make sure you are satisfied with your recorded answers.
              </DialogDescription>
            </DialogHeader>
            <div className='flex gap-1 justify-end mt-4'>
              <Button 
                variant="outline" 
                className=' px-4 cursor-pointer bg-white text-black border border-white' 
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                className='rounded-xl px-5 cursor-pointer bg-black text-white hover:bg-gray-950 transition-colors' 
                onClick={handleEndInterview}
              >
                Submit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
    </div>
  )
}   

export default StartInterview