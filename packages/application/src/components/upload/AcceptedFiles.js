import React from 'react'
import PropTypes from 'prop-types'

//* Framer
import { motion, AnimatePresence } from 'framer-motion'
import { varFade } from '../../components/ui/animate'

//* utils
import { fData } from '../../utils/formatNumber'
import getFileDetails from '../../utils/getFileDetails'
import { IconButton, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material'

//* MUI
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

//* MUI - Icons
import DeleteIcon from '@mui/icons-material/Delete'
import AttachFileIcon from '@mui/icons-material/AttachFile'

AcceptedFiles.propTypes = {
  files: PropTypes.array,
  onRemove: PropTypes.func,
  showFiles: PropTypes.bool,
}

export default function AcceptedFiles({ showFiles = false, files, removeFile }) {
  return (
    <List sx={{ width: '100%' }}>
      <AnimatePresence>
        {files?.map((file, index) => {
          const { name, path, size, preview, key } = getFileDetails(file, index)

          if (showFiles) {
            return (
              <Paper
                key={key}
                variant='outlined'
                sx={{
                  borderColor: 'grey',
                  px: 2,
                }}
              >
                <ListItem
                  key={key}
                  components={motion.div}
                  {...varFade().inUp}
                  sx={{
                    p: 0,
                    m: 0.5,
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                  secondaryAction={
                    <IconButton edge='end' size='small' onClick={() => removeFile(file)}>
                      <DeleteIcon color='error' />
                    </IconButton>
                  }
                >
                  <Stack key={key} direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                    <ListItemIcon>
                      <AttachFileIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={typeof file === 'string' ? file : name}
                      secondary={typeof file === 'string' ? '' : fData(size || 0)}
                      primaryTypographyProps={{
                        variant: 'subtitle2',
                      }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </Stack>
                </ListItem>
              </Paper>
            )
          }
        })}
      </AnimatePresence>
    </List>
  )
}
