import React from 'react'
import { NextRouter, useRouter } from 'next/router'
import { NextPage } from 'next'
import { getIn } from 'immutable'

import { withApollo } from '../../lib/apollo'
import App from '../../components/App'
import DetailsCard from '../../components/DetailsCard'

const Details: NextPage = () => {
  const router: NextRouter = useRouter()
  const id = getIn(router, ['query', 'id'], '') as string

  return (
    <App title="Details">
      <DetailsCard id={id} />
    </App>
  )
}

export default withApollo()(Details)
