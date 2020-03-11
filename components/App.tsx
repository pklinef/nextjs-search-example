import React, { FunctionComponent } from 'react'
import Head from 'next/head'

import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

type Props = {
  title: string
}

const App: FunctionComponent<Props> = props => {
  const { title, children } = props

  const goBack = (): void => {
    if (typeof window !== 'undefined') {
      window.history.back()
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
      </Head>

      <CssBaseline />
      <AppBar position="static" style={{ background: 'rgba(15,55,87,1.0)' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => goBack()}>
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h6">{title}</Typography>
        </Toolbar>
      </AppBar>
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ marginTop: '20px' }}
      >
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default App
