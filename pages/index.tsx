import React from 'react'
import { NextPage } from 'next'

const Home: NextPage = () => {
  return <body />
}

Home.getInitialProps = ({ res }) => {
  if (res) {
    res.writeHead(301, {
      Location: '/search',
    })
    res.end()
  }

  return {}
}

export default Home
