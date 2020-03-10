import React, { useState, useEffect, FunctionComponent } from 'react'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

type SearchInputProps = {
  initialQuery?: string
  routeToAction: (query: string) => void
}

const SearchInput: FunctionComponent<SearchInputProps> = props => {
  const { routeToAction, initialQuery = '' } = props
  const [query, setQuery] = useState(initialQuery)

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const queryChange = e => {
    setQuery(e.currentTarget.value)
  }

  return (
    <Grid container justify="center" alignItems="center" spacing={2}>
      <Grid item xs={3}>
        <TextField
          autoFocus
          id={'query'}
          variant={'outlined'}
          value={query}
          onChange={queryChange}
          style={{ width: '100%' }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              routeToAction(query)
            }
          }}
        />
      </Grid>
      <Grid item xs={1}>
        <Button variant="outlined" onClick={() => routeToAction(query)}>
          Search
        </Button>
      </Grid>
    </Grid>
  )
}

export default SearchInput
