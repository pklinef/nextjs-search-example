import React, { FunctionComponent } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { getIn } from 'immutable'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import ErrorMessage from './ErrorMessage'
import LoadingIndicator from './LoadingIndicator'

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

type Props = {
  id: string
}

const Details: FunctionComponent<Props> = props => {
  const { id } = props

  const { loading, error, data } = useQuery(searchByID, {
    variables: { ids: [id] },
  })

  if (loading) {
    return <LoadingIndicator />
  }

  if (error) {
    return <ErrorMessage>Error getting details</ErrorMessage>
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
    <Container maxWidth="md">
      <Paper>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
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
