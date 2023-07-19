import React from 'react'

import { Stack, Skeleton } from '@mui/material'

const Loading = () => {
  return (
    <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={20} sx={{ width: '100%', height: '100%', py: 2 }}>
      <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={2} sx={{ width: '100%' }}>
        <Skeleton animation='wave' width={120} sx={{ height: 25 }} />
        <Skeleton animation='wave' width={300} />
        <Skeleton animation='wave' width={300} />
      </Stack>
      <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={2} sx={{ width: '100%' }}>
        <Skeleton animation='wave' width={120} sx={{ height: 25 }} />
        <Skeleton animation='wave' width={300} />
        <Skeleton animation='wave' width={300} />
      </Stack>
    </Stack>
  )
}

export default Loading
