import { getOrSet } from "@/utils/redis"
import { NextResponse } from "next/server"

export const GET = async (req, res) => {
  const searchParams = req.nextUrl.searchParams
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")
  if (!lon || !lat) return NextResponse.json({ error: "missing lon/lat query parameters" })

  const weather = await getOrSet(`weather?lon=${lon}&lat=${lat}`, async () => {
    return fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&id=524901&appid=${process.env.OPENWEATHER_API_KEY}`)
      .then(res => res.json())
  })

  return NextResponse.json(weather)
}