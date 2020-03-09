import React from 'react'

import { useRouter } from 'next/router'

import { withApollo } from '../lib/apollo'

import Grid from '@material-ui/core/Grid'

import App from '../components/App'
import SearchInput from '../components/SearchInput'
import ResultList from '../components/ResultList'

const Results = () => {
  const router = useRouter()
  const { query = '', startIndex = 1, pageSize = 15 } = router.query

  const routeToAction = query =>
    router.push(`/results?query=${query}&pageSize=${pageSize}`)
  const routeToPage = ({ start, size }) =>
    router.push(`/results?query=${query}&startIndex=${start}&pageSize=${size}`)

  return (
    <App title='Results'>
      <Grid container justify='center' alignItems='center' spacing={2}>
        <Grid item xs={12}>
          <SearchInput initialQuery={query} routeToAction={routeToAction} />
        </Grid>

        <Grid item xs={9}>
          <ResultList
            query={query}
            startIndex={parseInt(startIndex, 10)}
            pageSize={parseInt(pageSize, 10)}
            routeToPage={routeToPage}
          />
        </Grid>
      </Grid>
    </App>
  )
}

export default withApollo()(Results)
