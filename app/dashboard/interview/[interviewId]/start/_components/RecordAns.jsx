"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { chatSession } from '@/utils/GeminiAI'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { Mic, WebcamIcon } from 'lucide-react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text'
import Webcam from 'react-webcam'
import { toast } from 'sonner'

function RecordAns({mockInterviewQues, activeQuesIndex, interviewData}) {
  const [userAnswer, setUserAnswer] = useState('')
  const {user} = useUser();
  const [loading, setLoading] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  })

  useEffect(() => {
    results.map((result) => (
      setUserAnswer(prevAns => prevAns + result?.transcript)
    ))
  }, [results])

  useEffect(() => {
    if (!isRecording && userAnswer?.length > 5) {
      UpdateUserAns()
    }
  }, [userAnswer])

  const StartStopRec = async () => {
    if (isRecording) {
      stopSpeechToText()
    } else {
      startSpeechToText()
    }
  }

  const UpdateUserAns = async () => {
    console.log(userAnswer)
    setLoading(true)
    
    try {
      const feedbackPrompt = "Question: " + mockInterviewQues[activeQuesIndex]?.question +
        ", User Answer: " + userAnswer + ", Based on the question and user answer, please provide a rating (out of 10) and feedback for improvement in 3-5 lines. Return as JSON with 'rating' and 'feedback' fields only.";

      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = (result.response.text()).replace(/```json/g, '').replace(/```/g, '').trim();
      console.log(mockJsonResp)
      
      const JsonFeedbackResp = JSON.parse(mockJsonResp);
      
      const resp = await db.insert(UserAnswer)
        .values({
          mockIdRef: interviewData?.mockId,
          question: mockInterviewQues[activeQuesIndex]?.question,
          correctAns: mockInterviewQues[activeQuesIndex]?.answer,
          userAns: userAnswer,
          feedback: JsonFeedbackResp?.feedback,
          rating: JsonFeedbackResp?.rating,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD-MM-yyyy')
        })
      
      if (resp) {
        toast.success('Answer recorded successfully', {
          style: {
            background: 'white',
            color: 'black',
            border: '1px solid #e5e7eb'
          },
          duration: 3000
        })
        setUserAnswer('')
        setResults([])
      }
    } catch (error) {
      console.error("Error saving answer:", error)
      
      if (error.message?.includes('429') || error.message?.includes('quota')) {
        toast.error('API quota exceeded. Please wait before continuing.', {
          style: {
            background: 'white',
            color: 'black',
            border: '1px solid #e5e7eb'
          },
          duration: 3000
        })
      } else {
        toast.error('Failed to save answer. Please try again.', {
          style: {
            background: 'white',
            color: 'black',
            border: '1px solid #e5e7eb'
          },
          duration: 3000
        })
      }
      
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center items-center flex-col'>
      <div className='flex flex-col justify-center items-center mt-16 bg-blue-50 border border-blue-400 rounded-xl p-5'>
        <WebcamIcon className='absolute' width={120} height={120}/>
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: '100%',
            zIndex: 10,
          }}
        />
      </div>
      <Button 
        disabled={loading} 
        variant 
        className='my-3 rounded-xl bg-red-50 text-red-600 border border-red-600'
        onClick={StartStopRec}
      >
        {isRecording ?
          <h2 className='flex gap-1 justify-center items-center'><Mic/> Stop Recording</h2>
          :
          'Record Answer'
        }
      </Button>
    </div>
  )
}

export default RecordAns