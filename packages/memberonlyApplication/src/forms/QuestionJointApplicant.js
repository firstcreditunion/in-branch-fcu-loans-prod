import React, { useEffect } from 'react'

//* MUI
import { Stack, Typography } from '@mui/material'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { clientSearchActions } from '../redux/slices/clientSearchSlice'

//* RHF And Yup
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

//* RHF Components
import FormProvider, { RHFRadioGroup } from '../components/RHF-mui-compoments'

export default function QuestionJointApplicant() {
  const dispatch = useDispatch()

  // Redux Selectors
  const isJointLoan = useSelector((state) => state.clientSearchReducer.isJointLoan)
  const onSubmitQuestionJointApplicant = useSelector((state) => state.clientSearchReducer.onSubmitQuestionJointApplicant)

  // Defualt Values for React Hook Form
  const defaultValues = {
    isJointLoan: isJointLoan,
  }

  // Schema
  const jointLoanSchema = Yup.object().shape({
    isJointLoan: Yup.string().required('Please select an option').nullable(),
  })

  //UseForm Methods from RHF
  const methods = useForm({
    resolver: yupResolver(jointLoanSchema),
    defaultValues,
  })

  // Destructure Methods
  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods

  const onSubmit = (event) => {
    console.log('Joint Loan Selected')
  }

  // Redux dispatch functions
  function setIsJointLoan(event) {
    dispatch(clientSearchActions.setIsJointLoan(event.target.value))
  }

  useEffect(() => {
    if (onSubmitQuestionJointApplicant == null) return

    handleSubmit(onSubmit())()
  }, [onSubmitQuestionJointApplicant])

  useEffect(() => {
    dispatch(clientSearchActions.setIsValidQuestionJointApplicant(isValid))
  }, [isValid])

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFRadioGroup
          row
          name='isJointLoan'
          label='Is the member applying for a joint loan?'
          onRadioChange={setIsJointLoan}
          value={isJointLoan}
          spacing={10}
          options={[
            { value: 'Y', label: 'Yes' },
            { value: 'N', label: 'No' },
          ]}
        />
      </FormProvider>
    </>
  )
}
