import { createContext, useEffect, useState } from "react"
import React from "react"

const DataFetch = createContext()

export const FetchData = ({children}) => {
   const [fetchData, setFetchData] = useState()
   const [active, setActive] = useState(false)
   const [search, setSearch] = useState('')
   const [location, setLocation] = useState('New york')
   const [error, setError] = useState('')

   const getWeather = async () => {
      try {
         setActive(false)
         let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0fd44594938846f489191613241504&q=${location}&days=7&aqi=yes&alerts=yes`)
         if (!response.ok) {
            if (response.status == 400)
            {
               setError('Enter a valid location to search')
            }
            setTimeout(() => {
               setActive(true)
               setError('')
            }, 2000)
            setSearch('')
            return
         }
         const result = await response.json()
         setFetchData(result)
         setActive(true)
         return result
      }
      catch (error) {
         setError('Check network connectivity and reload page')
         setTimeout(() => {
            setActive(true)
            setError('')
         }, 5000)
         setSearch('')
         return
      }
   }

   useEffect(()=> {
      getWeather()
   }, [])

   useEffect(()=> {
      getWeather()
   }, [location])

   return (
      <DataFetch.Provider value={{active, setActive, fetchData, search, setSearch, error, setError, setFetchData, location, setLocation}}>
         {children}
      </DataFetch.Provider>
   )
}

export const useDataContext = () => React.useContext(DataFetch);