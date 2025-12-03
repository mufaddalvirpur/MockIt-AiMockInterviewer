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
import { LoaderCircle, X } from 'lucide-react'
import { db } from '@/utils/db'
import { MockIt } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useRouter } from 'next/navigation'


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
    console.log(jobPosition, jobDescription)
    const InputPrompt = " Job Role/Position: " + jobPosition + ", Job Description/Skills: " + jobDescription + ", Depend on Job Role/Position, Job Description/Skills, generate " + process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT + " interview questions along with answers in JSON Format, give questions and answers based on field in JSON"
    const result = await chatSession.sendMessage(InputPrompt);

    const rawResponse = await result.response.text()
    const MockJsonResp = (result.response.text()).replace('```json', '').replace('```', '')
    console.log(JSON.parse(MockJsonResp))
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
        setOpenDailog(false)
        router.push('/dashboard/interview/' + resp[0]?.mockId)
      }
    }
    else {
      console.log("ERROR")
    }
    setLoading(false)
  }
  return (
    <div>
      {/* UPDATED SECTION: Milky Glass Card */}
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