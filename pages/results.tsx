import React from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { getIn } from 'immutable'

import Grid from '@material-ui/core/Grid'

import { withApollo } from '../lib/apollo'
import App from '../components/App'
import SearchInput from '../components/SearchInput'
import ResultList from '../components/ResultList'

const defaultParameters = {
  query: '',
  startIndex: 1,
  pageSize: 15,
}

const Results: NextPage = () => {
  const router = useRouter()

  const query: string = getIn(
    router,
    ['query', 'query'],
    defaultParameters.query
  )
  const startIndex: number = parseInt(
    getIn(router, ['query', 'startIndex'], defaultParameters.startIndex),
    10
  )
  const pageSize: number = parseInt(
    getIn(router, ['query', 'pageSize'], defaultParameters.pageSize),
    10
  )

  const routeToAction = (query: string): void => {
    router.push(`/results?query=${query}&pageSize=${pageSize}`)
  }
  const routeToPage = (start: number, size: number): void => {
    router.push(`/results?query=${query}&startIndex=${start}&pageSize=${size}`)
  }

  return (
    <App title="Results">
      <Grid container justify="center" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          <SearchInput initialQuery={query} routeToAction={routeToAction} />
        </Grid>

        <Grid item xs={9}>
          <ResultList
            query={query}
            startIndex={startIndex}
            pageSize={pageSize}
            routeToPage={routeToPage}
          />
        </Grid>
      </Grid>
    </App>
  )
}

export default withApollo()(Results)
