import { getOrSet } from "@/utils/redis"
import { NextResponse } from "next/server"
import axios from "axios"

export const GET = async (req, res) => {
  
  const countries = await getOrSet("countries", async () => {

    return fetch("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(res => res.json())

  })

  return NextResponse.json(countries) 
}