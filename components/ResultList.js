import React from 'react'

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
import CircularProgress from '@material-ui/core/CircularProgress'

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

const LoadingComponent = () => <CircularProgress />

const ErrorMessage = () => <Typography />

const Paging = props => {
  const { total = 0, startIndex = 1, pageSize = 15, routeToPage } = props

  const handleChangePage = (_, n) => {
    const startIndex = n * pageSize + 1
    routeToPage({ start: startIndex, size: pageSize })
  }
  const handleChangeRowsPerPage = e => {
    const size = parseInt(e.target.value, 10)
    routeToPage({ start: 1, size: size })
  }

  return (
    <TablePagination
      component='div'
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

const ResultList = props => {
  const { query = '', pageSize = 15, startIndex = 1, routeToPage } = props

  const { loading, error, data, refetch } = useQuery(metacardQuery, {
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
    return <LoadingComponent />
  }

  if (error) {
    return (
      <ErrorMessage onRetry={refetch} error={error}>
        Error: Query Failed
      </ErrorMessage>
    )
  }

  const { attributes, status } = data.metacards

  const pagingProps = {
    total: status.hits,
    pageSize,
    startIndex,
    routeToPage,
  }

  return (
    <Grid container justify='center' alignItems='center' spacing={2}>
      <Grid item xs={12}>
        <Typography color='textSecondary'>
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
                    <Link href='/details/[id]' as={url}>
                      <Typography>
                        <MuiLink href='#'>{result.title}</MuiLink>
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
