"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockIt } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import Link from 'next/link'

function Interview() {
    const params=useParams()
    const [interviewData,setInterviewData]=useState()
    const [WebCamEnabled,setWebCamEnabled]=useState(false)
    useEffect(()=>{
        console.log(params.interviewId)
        GetInterviewDetails()
    },[])

    const GetInterviewDetails=async()=>{
        const result=await db.select().from(MockIt)
        .where(eq(MockIt.mockId,params.interviewId))

        setInterviewData(result[0])
    }
  return (
    <div className='my-10'>
        <h2 className='text-white font-bold text-2xl'>Let's Get Started</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div className='flex flex-col my-5 gap-1'>
                <div className='flex flex-col p-3 rounded-xl gap-1 bg-gray-50 border border-black'>
                <h2 className='text-lg'><strong>Job Role/Position: </strong>{interviewData?interviewData.jobPosition:"Loading"}</h2>
                <h2 className='text-lg'><strong>Job Description/Skills: </strong>{interviewData?interviewData.jobDesc:"Loading"}</h2>
                </div>
                <div className='p-5 border rounded-xl border-black bg-gray-300 mt-4'>
                <h2 className='flex gap-2 items-center'><Lightbulb/><strong>Information</strong></h2>
                <h2 className='mt-3'>{process.env.NEXT_PUBLIC_INFO}</h2>
                </div>
            </div>
            {/* <div>
            {WebCamEnabled? <Webcam
            onUserMedia={()=>setWebCamEnabled(true)}
            onUserMediaError={()=>setWebCamEnabled(false)}
            mirrored={true}
            style={{
                height:300,
                width:300
            }}
            />
            :
            <>
            <WebcamIcon className='h-72 w-full p-20 m-7  border-black bg-gray-200 rounded-lg'/>
            <Button onClick={()=>setWebCamEnabled(true)}>Enable Cam & Mic</Button>
            </>
            }
            </div>
        </div>
        <div className='flex my-5 justify-end items-end'>
        <Button>Start Interview</Button>
        </div> */}
        <div className='flex flex-col items-end gap-4'>
        {WebCamEnabled ? (
        <Webcam
        onUserMedia={() => setWebCamEnabled(true)}
        onUserMediaError={() => setWebCamEnabled(false)}
        mirrored={true}
        style={{
        height: 300,
        width: 300
        }}
        />
        ) : (
        <>
        <WebcamIcon className='h-72 w-full p-20 border border-blue-400 bg-blue-50 rounded-xl' />
        <Button variant className='cursor-pointer rounded-xl border border-black bg-white' onClick={() => setWebCamEnabled(true)}>Enable Cam & Mic</Button>
        </>
        )}

        {/* Wrapping Start Interview button in the same container to align it below */}
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
            <Button className='cursor-pointer rounded-xl'>Start Interview</Button>
        </Link>
        </div>

        </div>
    </div>
  )
}

export default Interview