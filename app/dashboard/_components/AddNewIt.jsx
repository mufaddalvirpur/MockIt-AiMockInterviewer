"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAI'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { MockIt } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

function AddNewIt() {
  const [openDailog, setOpenDailog] = useState(false)
  const [jobPosition, setjobPosition] = useState()
  const [jobDescription, setjobDescription] = useState()
  const [loading, setLoading] = useState(false)
  const [jsonResponse, setJsonResponse] = useState([])
  const router = useRouter()
  const { user } = useUser()

  const onSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    
    try {
      console.log(jobPosition, jobDescription)
      const InputPrompt = "Job Role/Position: " + jobPosition + ", Job Description/Skills: " + jobDescription + ", Based on the job role and description, generate " + process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT + " interview questions along with answers in JSON Format. The JSON should have an array of objects with 'question' and 'answer' fields."
      
      const result = await chatSession.sendMessage(InputPrompt);
      const rawResponse = await result.response.text()
      
      // Clean the response to extract JSON
      let MockJsonResp = rawResponse.replace(/```json/g, '').replace(/```/g, '').trim()
      
      console.log("API Response:", MockJsonResp)
      
      // Try to parse to verify it's valid JSON
      const parsedJson = JSON.parse(MockJsonResp)
      console.log("Parsed JSON:", parsedJson)
      
      setJsonResponse(MockJsonResp)

      if (MockJsonResp) {
        const resp = await db.insert(MockIt)
          .values({
            mockId: uuidv4(),
            jsonMockResp: MockJsonResp,
            jobPosition: jobPosition,
            jobDesc: jobDescription,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD-MM-yyyy')
          }).returning({ mockId: MockIt.mockId })
        
        console.log("Inserted ID:", resp)
        
        if (resp) {
          toast.success('Interview created successfully!', {
            style: {
              background: 'white',
              color: 'black',
              border: '1px solid #e5e7eb'
            },
            duration: 3000
          })
          setOpenDailog(false)
          router.push('/dashboard/interview/' + resp[0]?.mockId)
        }
      } else {
        toast.error('Failed to generate questions', {
          style: {
            background: 'white',
            color: 'black',
            border: '1px solid #e5e7eb'
          },
          duration: 3000
        })
      }
    } catch (error) {
      console.error("Full Error:", error)
      
      if (error.message?.includes('429') || error.message?.includes('quota')) {
        toast.error('API quota exceeded. Please try again later.', {
          style: {
            background: 'white',
            color: 'black',
            border: '1px solid #e5e7eb'
          },
          duration: 3000
        })
      } else if (error.message?.includes('404')) {
        toast.error('Model not found. Please check your API configuration.', {
          style: {
            background: 'white',
            color: 'black',
            border: '1px solid #e5e7eb'
          },
          duration: 3000
        })
      } else {
        toast.error('Error: ' + (error.message || 'Something went wrong'), {
          style: {
            background: 'white',
            color: 'black',
            border: '1px solid #e5e7eb'
          },
          duration: 3000
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div 
        className='p-14 rounded-3xl cursor-pointer transition-all duration-300
                   bg-white/30 border border-white/40 backdrop-blur-lg shadow-lg
                   hover:bg-white/40 hover:border-white/60 hover:shadow-2xl hover:-translate-y-1 group'
        onClick={() => setOpenDailog(true)}
      >
        <h2 className='text-xl text-center font-bold text-white group-hover:scale-105 transition-all'>
            + Add New
        </h2>
      </div>

      <Dialog open={openDailog}>
        <DialogContent className='bg-white max-w-2xl'>
          <DialogHeader>
            <DialogTitle className="text-2xl">Tell me about Yourself & Job</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>Add details mentioned below</h2>
                  <div className='mt-7 my-3'>
                    <label>Job Role/Job Position</label>
                    <Input placeholder='Ex: Full Stack Developer' required
                      onChange={(event) => setjobPosition(event.target.value)}></Input>
                  </div>
                  <div className='my-3'>
                    <label>Job Description/Skills</label>
                    <Textarea placeholder='Ex: MERN Stack, Python, DSA' required
                      onChange={(event) => setjobDescription(event.target.value)}></Textarea>
                  </div>
                </div>
                <div className='flex gap-1 justify-end'>
                  <Button className='cursor-pointer' type="button" variant="ghost" onClick={() => setOpenDailog(false)}>Cancel</Button>
                  <Button className='cursor-pointer rounded-xl px-6' type="submit" disabled={loading}>
                    {loading ?
                      <>
                        <LoaderCircle className='animate-spin' />Generating
                      </> : 'Start'
                    }
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddNewIt