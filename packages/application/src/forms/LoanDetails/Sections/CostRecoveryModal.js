import React from 'react'

//* Framer Motion
import { m, AnimatePresence } from 'framer-motion'
import { varFade } from '../../../components/ui/animate/variants/fade'

//* MUI
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

//* MUI - Dialog
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'

//* Utils
import { fCurrency } from '../../../utils/formatNumber'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function CostRecoveryFeesModal({ open = false, variants, onClose, buttonText, children, sx, ...other }) {
  return (
    <AnimatePresence>
      {open && (
        <Dialog
          fullWidth
          maxWidth='xs'
          open={open}
          onClose={onClose}
          PaperComponent={(props) => (
            <Box
              component={m.div}
              {...varFade({
                distance: 120,
                durationIn: 0.32,
                durationOut: 0.24,
                easeIn: 'easeInOut',
              }).inUp}
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box onClick={onClose} sx={{ width: '100%', height: '100%', position: 'fixed' }} />
              <Paper sx={sx} {...props}>
                {props.children}
              </Paper>
            </Box>
          )}
          {...other}
        >
          {children}
        </Dialog>
      )}
    </AnimatePresence>
  )
}
