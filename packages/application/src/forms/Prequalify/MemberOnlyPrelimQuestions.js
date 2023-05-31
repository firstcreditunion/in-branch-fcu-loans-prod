import React, { useEffect } from 'react'

// Framer
import { motion, AnimatePresence } from 'framer-motion'
import { varFade } from '../../components/ui/animate'

// RHF
import { useForm } from 'react-hook-form'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { mbroPrelimQuestionsActions } from '../../redux/slices/memberOnlyLoans/preliminaryQuestions'

// YUP
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

//* MUI - Styles
import { styled } from '@mui/material/styles'

//* MUI
// import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Radio from '@mui/material/Radio'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'

//* Custom MUI Components

import Form from '../../components/Form'
import Counter from '../../components/Counter'
import InputField from '../../components/rhf-components/Input'
import DatePicker from '../../components/rhf-components/DatePicker'
import SelectMenu from '../../components/rhf-components/SelectMenu'
import RadioGroups from '../../components/rhf-components/RadioGroups'

//* Utils
import { nfd_NormaliseString } from '../../utils/stringFormat'

const MemberOnlyPrelimQuestions = () => {
  return (
    <Form>
      <Stack>
        <Typography variant='h1'>Member Only Prelim-Questions</Typography>
      </Stack>
    </Form>
  )
}

export default MemberOnlyPrelimQuestions
