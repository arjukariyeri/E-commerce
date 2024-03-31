import React from 'react'
import Hero from '../Hero/Hero'
import Popular from '../Popular/Popular'
import Offers from '../Offers/Offers'
import NewsLetter from '../NewsLetter/NewsLetter'
import NewCollections from '../New Collections/NewCollections.jsx'

const Home = () => {
  return (
    <div>
        <Hero/><br /><br /><br /><br /><br /><br />
        <Popular/><br /><br /><br /><br /><br />
        <Offers/>
        <NewCollections/><br /><br />
        <NewsLetter/> 


    </div>
  )
}

export default Home