import React from 'react'

//* MUI
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

//* MUI - Card
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'

//* MUI - Icons
import InfoIcon from '@mui/icons-material/Info'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

export default function VerbiageCard({ title, subhearder, content }) {
  return (
    <Card variant='outlined' sx={{ width: '100%' }}>
      <CardHeader
        avatar={
          <Avatar variant='rounded' sx={{ bgcolor: 'common.white' }}>
            <InfoIcon color='info' fontSize='large' />
          </Avatar>
        }
        title={title}
        subheader={subhearder}
      />
      <CardContent>
        <Typography>{content}</Typography>
      </CardContent>
    </Card>
  )
}
