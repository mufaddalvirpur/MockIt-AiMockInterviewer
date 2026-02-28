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

            {/* Right Column */}
            <div className='flex justify-center items-center flex-col'>
                
                {/* MATCHED RECORDANS EXACTLY: No w-full here so the border perfectly wraps the video. Changed to mt-6 to shift it up! */}
                <div className='flex flex-col justify-center items-center mt-6 bg-blue-50 border border-blue-400 rounded-xl p-5'>
                    
                    <WebcamIcon className='absolute' width={120} height={120}/>
                    
                    {WebCamEnabled ? (
                        <Webcam
                            onUserMedia={() => setWebCamEnabled(true)}
                            onUserMediaError={() => setWebCamEnabled(false)}
                            mirrored={true}
                            style={{
                                height: 300,
                                width: '100%',
                                zIndex: 10,
                            }}
                        />
                    ) : (
                    
                        <div style={{ height: 300, width: 400 }}></div>
                    )}
                </div>

                {/* Kept buttons aligned right, matching the max width of the camera box */}
                <div className='flex justify-end gap-4 mt-4 w-full max-w-[440px]'>
                    {!WebCamEnabled && (
                        <Button size="sm" variant className='cursor-pointer rounded-xl border border-black bg-white hover:bg-gray-100 transition-colors' onClick={() => setWebCamEnabled(true)}>
                            Enable Cam & Mic
                        </Button>
                    )}

                    <Link href={`/dashboard/interview/${params.interviewId}/start`}>
                        <Button className='cursor-pointer rounded-xl bg-black text-white hover:text-gray-200 transition-colors'>Start Interview</Button>
                    </Link>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Interview