import React from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'

import Grid from '@material-ui/core/Grid'

import App from '../components/App'
import SearchInput from '../components/SearchInput'

const Search: NextPage = () => {
  const router = useRouter()

  const routeToAction = (query: string): void => {
    router.push(`/results?query=${query}`)
  }

  return (
    <App title="Search">
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ height: '90vh' }}
      >
        <Grid item xs={12}>
          <SearchInput routeToAction={routeToAction} />
        </Grid>
      </Grid>
    </App>
  )
}

export default Search
