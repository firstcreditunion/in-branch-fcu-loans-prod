import React, { useEffect, useState } from 'react'

import RHFSOPIncome from '../../forms/FinancialDetails/RHFSOPIncome'
import RHFSOPExpense from '../../forms/FinancialDetails/RHFSOPExpense'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { sopRelatedQuestionActions } from '../../redux/slices/sopRelatedQuestionsSlice'

//* MUI
import { Typography, Stack, Divider, Switch } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

import RHFSOPRelatedQuestions from '../../forms/FinancialDetails/RHFSOPRelatedQuestions'
import Expand from '../../components/ExpandMore'

const SOPRelatedQuestionSection = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [])

  return (
    <>
      <Stack direction='column' justifyContent='flex-start' alignItems='center' spacing={5} sx={{ pb: 2 }}>
        <Stack direction='column' justifyContent='center' alignItems='center' spacing={0} sx={{ width: '100%' }}>
          <Typography
            variant='h4'
            color='primary'
            sx={{
              textAlign: 'center',
              textTransform: 'uppercase',
              fontWeight: 'light',
              letterSpacing: 3,
            }}
          >
            Affordability Test
          </Typography>
          <Typography
            variant='body2'
            color='secondary'
            sx={{
              textAlign: 'center',
              textTransform: 'uppercase',
              fontWeight: 'light',
              pb: 3,
              letterSpacing: 1,
            }}
          >
            The Applicable affordability test will depend on:
          </Typography>
        </Stack>

        <Grid container sx={{ width: '100%' }}>
          <Grid direction='column' justifyContent='flex-start' alignItems='center' md={12}>
            <RHFSOPRelatedQuestions />
          </Grid>
        </Grid>
      </Stack>
    </>
  )
}

export default SOPRelatedQuestionSection
