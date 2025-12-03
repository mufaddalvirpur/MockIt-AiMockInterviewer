"use client"
import { db } from '@/utils/db'
import { MockIt } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import InterviewItems from './InterviewItems'

function InterviewList() {

    const {user}=useUser()
    const [interviewList,setInterviewList]=useState([])

    useEffect(()=>{
        user&&GetInterviewList()
    },[user])

    const GetInterviewList=async()=>{
        const result=await db.select()
        .from(MockIt)
        .where(eq(MockIt.createdBy,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(MockIt.id))

        console.log(result)
        setInterviewList(result)
    }
  return (
    <div>
        <h2 className='text-white font-medium text-xl'>Previous Interviews</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
            {interviewList&&interviewList.map((interview,index)=>(
                <InterviewItems 
                interview={interview}
                key={index}/>
            ))}
        </div>
    </div>
  )
}

export default InterviewList