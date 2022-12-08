import React from 'react'
import { isString } from 'lodash'
import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone'

import { alpha, styled } from '@mui/material/styles'
import { Box, Typography, Paper } from '@mui/material'

import { fData } from '../../utils/formatNumber'

import { UploadIllustration } from '../../assets'

const RootStyle = styled('div')(({ theme }) => ({
  width: 144,
  height: 144,
  margin: 'auto',
  borderRadius: '50%',
  padding: theme.spacing(1),
  border: `1px dashed ${theme.palette.grey[500_32]}`,
}))

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  display: 'flex',
  overflow: 'hidden',
  textAlign: 'center',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(5, 0),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  '&:hover': {
    opacity: 0.72,
    cursor: 'pointer',
  },
  [theme.breakpoints.up('md')]: { textAlign: 'left', flexDirection: 'row' },
}))

UploadPhoto.propTypes = {
  error: PropTypes.bool,
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  caption: PropTypes.node,
  sx: PropTypes.object,
}

export default function UploadPhoto({ error, file, sx, ...other }) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    ...other,
  })

  const ShowRejectionItems = () => (
    <Paper
      variant='outlined'
      sx={{
        py: 1,
        px: 2,
        my: 2,
        borderColor: 'error.light',
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { path, size } = file
        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant='subtitle2' noWrap>
              {path} - {fData(size)}
            </Typography>
            {errors.map((e) => (
              <Typography key={e.code} variant='caption' component='p'>
                - {e.message}
              </Typography>
            ))}
          </Box>
        )
      })}
    </Paper>
  )

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter',
          }),
        }}
      >
        <input {...getInputProps()} />

        <UploadIllustration sx={{ pl: 3, width: 200 }} />

        <Box sx={{ p: 3, ml: { md: 2 } }}>
          <Typography gutterBottom variant='h5'>
            Upload Drivers Licence
          </Typography>

          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            Drag and Drop your drivers licence here or click&nbsp;
            <Typography variant='body2' component='span' sx={{ color: 'primary.main', textDecoration: 'underline' }}>
              browse
            </Typography>
            &nbsp;through your device
          </Typography>
        </Box>

        {file && (
          <Box
            component='img'
            src={isString(file) ? file : file.preview}
            sx={{
              top: 8,
              borderRadius: 1,
              objectFit: 'cover',
              position: 'absolute',
              width: 'calc(100% - 16px)',
              height: 'calc(100% - 16px)',
            }}
          />
        )}
      </DropZoneStyle>
      {fileRejections.length > 0 && <ShowRejectionItems />}
    </Box>
  )
}
