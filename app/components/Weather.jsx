import { useState, useEffect } from "react"

const Weather = ({ country }) => {
	const lat = country.capitalInfo.latlng[0]
	const lon = country.capitalInfo.latlng[1]
	const weatherURL = `/api/weather?lon=${lon}&lat=${lat}`
	const [weatherData, setWeatherData] = useState(null)

	
	useEffect(() => {
		fetch(weatherURL)
    .then(res => res.json())
    .then(data => {
      setWeatherData(data)
      console.log(data)
    })
	}, [country])
	

	if (weatherData == null || weatherData.error) return null

  console.log("weather data: ", weatherData)

	const temp = weatherData.list[0].main.temp
	const imgURL = `https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`
	const wind = weatherData.list[0].wind.speed

	return (
		<div>
			<h1>Weather in {country.capital[0]}</h1>
			<div>Temperature {temp} Celcius</div>
			<img src = {imgURL} width = "150" />
			<div>Wind {wind} m/s</div>
		</div>
	)
}

export default Weather