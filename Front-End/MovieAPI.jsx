import React, { useEffect, useState } from 'react'
import {axios} from 'react-router-dom'

function MovieAPI() {

    const [first, setfirst] = useState()
    useEffect(() => {
      
    axios.get('https://ott-details.p.rapidapi.com/advancedsearch').then((display)=>{

        console.log(display)

    })
      return () => {
      }
    }, [])
    
  return (
    <div></div>
  )
}

export default MovieAPI