import { NextResponse } from "next/server"

export async function POST(request) {
    const GPT_KEY = process.env.GPT_API_KEY
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GPT_KEY}`
      }
      const req = await request.json()
      console.log(req)
      let days = 4, city = 'Rio'
      if (req) {
        days = req.days
        city = req.city
      }
    
      const parts = city.split(' ')
    
      if (parts.length > 5) {
        throw new Error('please reduce size of request')
      }
      
      if (days > 10) {
        days = 10
      }
    
      let basePrompt = `what is an ideal itinerary for ${days} days in ${city}?`
      try {
        const response = await fetch('https://api.openai.com/v1/completions', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            model: 'gpt-3.5-turbo-instruct',
            prompt: basePrompt,
            temperature: 0,
            max_tokens: 1000
          })
        })
        const itinerary = await response.json()
        console.log(itinerary)
        const pointsOfInterestPrompt = 'Extract the points of interest out of this text, with no additional words, separated by commas: ' + itinerary.choices[0].text
    
        return NextResponse.json({
            message: 'success',
            itinerary: itinerary.choices[0].text,
            pointsOfInterestPrompt
        })
    
      } catch (err) {
        console.log('error: ', err)
      }
    
}