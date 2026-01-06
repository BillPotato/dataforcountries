import {useState, useEffect} from "react"
import axios from "axios"

import Filter from "./components/Filter.jsx"
import List from "./components/List.jsx"
import Country from "./components/Country"


const App = () => {
  // state declarations
  const [allCountries, setAllCountries] = useState([])
  const [filterValue, setFilterValue] = useState("Vietnam")



  // non-state declarations
  const BACKEND_URL = "/api"



  // code
  const displayedCountries = allCountries.filter(country => {
    const filterValueLower = filterValue.toLowerCase()
    const commonNameLower = country.name.common.toLowerCase()
    const officialNameLower = country.name.official.toLowerCase()

    return commonNameLower.includes(filterValueLower) || officialNameLower.includes(filterValueLower)
  })



  // useEffect
  // fetch country data
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/countries`)
      .then(response => setAllCountries(response.data))
  }, [])



  // handlers
  const onFilterChange = (event) => {
    const newFilterValue = event.target.value
    setFilterValue(newFilterValue)
    console.log("changed filter to ", newFilterValue)
  }

  const onShow = (country) => {
    const newFilterValue = country.name.common
    setFilterValue(newFilterValue)
    console.log("changed filter to ", newFilterValue)
  }

  return (
    <div>
      <Filter value = {filterValue} onChange = {onFilterChange} />
      <List displayedCountries = {displayedCountries} onClick = {onShow} />
      <Country displayedCountries = {displayedCountries} />
    </div>
  )
}

export default App
