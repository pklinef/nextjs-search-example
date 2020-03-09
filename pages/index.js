import React from 'react'

const Home = () => {
  return <main />
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
