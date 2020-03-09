import React from 'react'

import { useRouter } from 'next/router'

import { withApollo } from '../../lib/apollo'
import App from '../../components/App'
import DetailsCard from '../../components/DetailsCard'

const Details = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <App title='Details'>
      <DetailsCard id={id} />
    </App>
  )
}

export default withApollo()(Details)
