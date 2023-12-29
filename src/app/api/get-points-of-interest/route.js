import { NextResponse } from "next/server"

const GPT_KEY = process.env.GPT_API_KEY

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${GPT_KEY}`
}

export async function POST(
  request
) {
  const req = await request.json()
  console.log(req)
  const { pointsOfInterestPrompt } = (req)
  const response2 = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: 'gpt-3.5-turbo-instruct',
      prompt: pointsOfInterestPrompt,
      temperature: 0,
      max_tokens: 300
    })
  })

  let pointsOfInterest = await response2.json()

  pointsOfInterest = pointsOfInterest.choices[0].text.split('\n')
  pointsOfInterest = pointsOfInterest[pointsOfInterest.length - 1]
  pointsOfInterest = pointsOfInterest.split(',')
  const pointsOfInterestArray = pointsOfInterest.map(i => i.trim())

  return NextResponse.json({
    pointsOfInterest: JSON.stringify(pointsOfInterestArray)
  })

}