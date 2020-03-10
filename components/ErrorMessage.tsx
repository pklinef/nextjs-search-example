import React, { FunctionComponent } from 'react'
import Typography from '@material-ui/core/Typography'

const ErrorMessage: FunctionComponent = props => {
  const { children } = props

  return <Typography>{children}</Typography>
}

export default ErrorMessage
