import React, { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'

//Framer
import { motion, AnimatePresence } from 'framer-motion'
import { varFade } from '../../components/ui/animate'

// RHF
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { lendingCriteriaQnsActions } from '../../redux/slices/lendingCriteriaQnsSlice'

// Custom Components
import LoanPurposeAutoComplete from './Interface/LoanPurposeAutoComplete'
import ToggleButtons from '../../components/rhf-components/ToggleButtonGroup'
import Countries from '../../components/rhf-components/Countries'
import SelectMenu from '../../components/rhf-components/SelectMenu'

// MUI
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import useMediaQuery from '@mui/material/useMediaQuery'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

export default function PreliminarQns() {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
      }}
    >
      <ToggleButtonGroup>
        <ToggleButton value='Y'>Yes</ToggleButton>
        <ToggleButton value='N'>No</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  )
}
