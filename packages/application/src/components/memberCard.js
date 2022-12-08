import PropTypes from 'prop-types'

import { styled } from '@mui/material/styles'
import { Box, Card, Avatar, Divider, Typography, Stack } from '@mui/material'

export default function UserCard({ user }) {
  const { name, clientNumber, welcomeText } = user

  return (
    <Card sx={{ textAlign: 'center' }}>
      <Typography variant='subtitle1' sx={{ mt: 6 }}>
        {name}
      </Typography>

      <Typography variant='body2' sx={{ color: 'text.secondary' }}>
        {clientNumber}
      </Typography>

      <Stack alignItems='center'>
        <SocialsButton initialColor sx={{ my: 2.5 }} />
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />
    </Card>
  )
}
