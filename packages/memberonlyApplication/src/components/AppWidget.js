import React from 'react'
// @mui
import { useTheme } from '@mui/material/styles'
import { Typography, Box, Stack, Card } from '@mui/material'

import { fDate } from '../utils/formatDateTime'
import { getClientRecordStatus_Key, getGender_Key, getMaritalStatus_Key } from '../redux/codes/getKeysOrValues'

import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'

export default function AppWidget({ title, recordStatus, age, maritalStatus, missingDateOfBirth = false, dateOfBirth, gender, clientRole, icon, color = 'primary', sx, ...other }) {
  const theme = useTheme()

  return (
    <Card
      elevation={24}
      sx={{
        p: 3,
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        color: 'common.white',
        bgcolor: `${color}.main`,
        width: '100%',
        maxWidth: '700px',
        ...sx,
      }}
    >
      <Stack direction='row' alignItems='center' {...other}>
        <Box>
          <Typography variant='h4'> {title}</Typography>
          {!(gender == '') && !(gender == null) && (
            <Typography variant='body2' sx={{ opacity: 0.9 }}>
              Gender - {getGender_Key(gender)?.value}
            </Typography>
          )}
          {!missingDateOfBirth && (
            <Typography variant='body2' sx={{ opacity: 0.9, textTransform: 'capitalize' }}>
              Age - {age} old
            </Typography>
          )}

          {/* <Typography variant='body2' sx={{ opacity: 0.9 }}>
            Date of Birth - {fDate(dateOfBirth)}
          </Typography> */}
          {!(maritalStatus === '') && !(maritalStatus == null) && (
            <Typography variant='body2' sx={{ opacity: 0.9 }}>
              Marital Status - {getMaritalStatus_Key(maritalStatus)?.value}
            </Typography>
          )}
          <Typography variant='body2' sx={{ opacity: 0.9 }}>
            Client Record Status - {getClientRecordStatus_Key(recordStatus)?.value}
          </Typography>
        </Box>
        {clientRole === 'PRIMEB' && (
          <PersonRoundedIcon
            sx={{
              width: 120,
              height: 120,
              opacity: 0.2,
              position: 'absolute',
              right: theme.spacing(-3),
            }}
          />
        )}
        {clientRole === 'COBOR' && (
          <PeopleAltIcon
            sx={{
              width: 120,
              height: 120,
              opacity: 0.2,
              position: 'absolute',
              right: theme.spacing(-3),
            }}
          />
        )}
      </Stack>
    </Card>
  )
}
