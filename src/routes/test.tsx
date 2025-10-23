import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getPromptResponse } from '@/services/ai_chat'
import { createFileRoute } from '@tanstack/react-router'
import React, { useState } from 'react'

export const Route = createFileRoute('/test')({
  component: RouteComponent,
})

function RouteComponent() {
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  
  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const res = getPromptResponse(prompt)
    setResponse(res)
  }

  return <div>
    <form onSubmit={onSubmitForm}>
      <Input value={prompt} onChange={e=> setPrompt(e.target.value)}/>
      <Button type='submit'>Submit</Button>
    </form>
    {response.length>1? "Response:"+ response: ""}
  </div>
}
