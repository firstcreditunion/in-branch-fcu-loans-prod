import React, { forwardRef } from 'react'

import Stack from '@mui/material/Stack'
import Slide from '@mui/material/Slide'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { Typography } from '@mui/material'

const Transition = forwardRef((props, ref) => <Slide direction='up' ref={ref} {...props} />)

export default function TransitionsDialog({ dialogOnClose, dialogOpen, mainTitle, body, button1Text, button2Text, button1_OnClick, button2_OnClick }) {
  return (
    <div>
      <Dialog keepMounted open={dialogOpen} TransitionComponent={Transition} onClose={dialogOnClose} sx={{ zIndex: 1500 }}>
        <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={2}>
          <DialogTitle>{mainTitle}</DialogTitle>

          <DialogContent>
            <Typography variant='button1' sx={{ textTransform: 'light', color: 'text.secondary' }}>
              {body}
            </Typography>
          </DialogContent>
        </Stack>
        <DialogActions>
          <Button variant='outlined' onClick={button1_OnClick} autoFocus>
            {button1Text}
          </Button>
          <Button variant='contained' onClick={button2_OnClick}>
            {button2Text}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
