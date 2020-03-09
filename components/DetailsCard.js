import React from 'react'

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { getIn } from 'immutable'

const searchByID = gql`
  query SearchByIdDetails($ids: [ID]!) {
    metacardsById(ids: $ids) {
      attributes {
        id
        description
        title
        modified
        thumbnail
      }
    }
  }
`

const LoadingComponent = () => <CircularProgress />

const ErrorMessage = () => <Typography />

const Details = props => {
  const { id } = props

  const { loading, error, data, refetch } = useQuery(searchByID, {
    variables: { ids: [id] },
  })

  if (loading) {
    return <LoadingComponent />
  }

  if (error) {
    return (
      <ErrorMessage onRetry={refetch} error={error}>
        Error getting details
      </ErrorMessage>
    )
  }

  const attributes = getIn(
    data,
    ['metacardsById', 0, 'attributes', 0],
    'missing'
  )

  if (attributes === 'missing') {
    return <ErrorMessage>Details missing from response</ErrorMessage>
  }

  return (
    <Container maxWidth='md'>
      <Paper>
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
          spacing={2}
        >
          <Grid item xs={12}>
            <Typography variant={'h4'} noWrap>
              {attributes.title}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <img src={attributes.thumbnail} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default Details
