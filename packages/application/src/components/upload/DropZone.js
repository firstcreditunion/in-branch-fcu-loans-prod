import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'

//* MUI - List
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'

//* MUI - Styles
import { styled } from '@mui/material/styles'

//* DropZone Components
import AcceptedFiles from './AcceptedFiles'
import RejectedFiles from './RejectedFiles'
import UploadFileUndraw from '../../assets/UploadFileUndraw'

const FileDrop = styled('div')(({ theme }) => ({
  outline: 'none',
  overflow: 'hidden',
  position: 'relative',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.neutral,
  border: `1px solid ${theme.palette.secondary.light}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' },
}))

export default function DropZone({ error, customValidator, showFiles = false, onChange, removeFile, helperText, sx, ...rest }) {
  const [files, setFiles] = useState([])

  const upMd = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const downLg = useMediaQuery((theme) => theme.breakpoints.down('lg'))
  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  const { acceptedFiles, fileRejections, getRootProps, getInputProps, rootRef, inputRef, isDragAccept, isDragReject, isDragActive, isFileDialogActive, isFocused, open } = useDropzone({
    ...rest,
    multiple: true,
    validator: customValidator,
    onDrop: onChange,
  })

  useEffect(() => {
    // console.log('Files from useEffect: ', files)
  }, [files])

  return (
    <Container>
      <Box
        sx={{
          display: 'grid',
          alignItems: 'flex-start',
          borderColor: (theme) => theme.palette.primary.main,
          borderRadius: 2,
          textAlign: 'flex-start',
        }}
      >
        <Stack direction='column' justifyContent='center' alignItems='center' spacing={2} sx={{ display: 'flex', width: '100%', height: '100%' }}>
          <Typography variant={downSm ? 'body1' : 'h6'} sx={{ color: 'text.secondary', fontWeight: 'light', textAlign: 'center' }}>
            Upload your bank account statements for the past 90 days.
          </Typography>
          <Typography variant='caption' sx={{ color: 'text.secondary', fontWeight: 'light', textAlign: 'center' }}>
            You must make sure that the PDF files
          </Typography>
          <FileDrop {...getRootProps()} sx={{ width: '100%' }}>
            <input {...getInputProps()} />
            <UploadFileUndraw />
          </FileDrop>
          {fileRejections?.length > 0 && <RejectedFiles fileRejections={fileRejections} />}
          <AcceptedFiles files={acceptedFiles} showFiles={showFiles} removeFile={removeFile} />
        </Stack>
      </Box>
    </Container>
  )
}
