import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import Grid from '@material-ui/core/Grid'
import MuiLink from '@material-ui/core/Link'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'

import ErrorMessage from './ErrorMessage'
import LoadingIndicator from './LoadingIndicator'

const metacardQuery = gql`
  query TextQuery($filter: Json!, $settings: QuerySettingsInput) {
    metacards(filterTree: $filter, settings: $settings) {
      attributes {
        id
        title
      }
      status {
        hits
        elapsed
      }
    }
  }
`

type PagingProps = {
  total: number
  startIndex: number
  pageSize: number
  routeToPage: (start: number, size: number) => void
}

const Paging: FunctionComponent<PagingProps> = props => {
  const { total = 0, startIndex = 1, pageSize = 15, routeToPage } = props

  const handleChangePage = (_, n) => {
    const startIndex = n * pageSize + 1
    routeToPage(startIndex, pageSize)
  }
  const handleChangeRowsPerPage = e => {
    const size = parseInt(e.target.value, 10)
    routeToPage(1, size)
  }

  return (
    <TablePagination
      component="div"
      rowsPerPageOptions={[15, 50, 100]}
      colSpan={12}
      count={total}
      rowsPerPage={pageSize}
      page={startIndex > pageSize ? (startIndex - 1) / pageSize : 0}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  )
}

type ResultListProps = {
  query: string
  pageSize: number
  startIndex: number
  routeToPage: (start: number, size: number) => void
}

const ResultList: FunctionComponent<ResultListProps> = props => {
  const { query = '', pageSize = 15, startIndex = 1, routeToPage } = props

  const { loading, error, data } = useQuery(metacardQuery, {
    variables: {
      filter: {
        type: 'AND',
        filters: [{ type: 'ILIKE', property: 'anyText', value: query }],
      },
      settings: {
        pageSize,
        startIndex,
      },
    },
  })

  if (loading) {
    return <LoadingIndicator />
  }

  if (error) {
    return <ErrorMessage>Error: Query Failed</ErrorMessage>
  }

  const { attributes, status } = data.metacards

  const pagingProps = {
    total: status.hits,
    pageSize,
    startIndex,
    routeToPage,
  }

  return (
    <Grid container justify="center" alignItems="center" spacing={2}>
      <Grid item xs={12}>
        <Typography color="textSecondary">
          About {status.hits} results ({status.elapsed}
          ms)
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Table>
          <TableBody>
            {attributes.map(result => {
              const url = `/details/${result.id}`
              return (
                <TableRow key={result.id}>
                  <TableCell>
                    <Link href="/details/[id]" as={url}>
                      <Typography>
                        <MuiLink href="#">{result.title}</MuiLink>
                      </Typography>
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Grid>

      <Grid item xs={12}>
        <Paging {...pagingProps} />
      </Grid>
    </Grid>
  )
}

export default ResultList
