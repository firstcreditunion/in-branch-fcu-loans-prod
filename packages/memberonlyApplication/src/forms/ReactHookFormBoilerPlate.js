import React from 'react'

//* MUI
import { Stack, Typography } from '@mui/material'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { clientSearchActions } from '../../redux/slices/clientSearchSlice'
import { getClientGeneralDetails } from '../../redux/slices/clientSearchSlice'

//* RHF And Yup
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

//* API Utils
import { BASE_URL_LOCAL_APP, BASE_URL_AWS_APP, processNodeEnv } from '../../redux/utils/apiConstants'

//* RHF Components
import FormProvider, { RHFEditor, RHFSelect, RHFUpload, RHFSwitch, RHFSlider, RHFCheckbox, RHFTextField, RHFRadioGroup, RHFMultiSelect, RHFAutocomplete, RHFMultiCheckbox } from '../components/RHF-mui-compoments'

export default function FormComponent() {
  const dispatch = useDispatch()

  // Redux Selectors
  const clientNumber = useSelector((state) => state.clientSearchReducer.clientNumber)

  // Defualt Values for React Hook Form
  const defaultValues = {
    clientNumber: clientNumber,
  }

  // Schema
  const FormSchema = Yup.object().shape({
    clientNumber: Yup.string().required('Client Number is requires'),
  })

  //UseForm Methods from RHF
  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  })

  // Destructure Methods
  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = (event) => {
    event.preventDefault()
  }

  // Redux dispatch functions
  function setClientNumber(event) {
    dispatch(clientSearchActions.setClientNumber(event.target.value))
  }

  // API Functions
  function getSomething() {
    var Data = JSON.stringify({})

    const config = {
      url: '/client-details',
      method: 'POST',
      baseURL: `${processNodeEnv() === 'development' ? BASE_URL_LOCAL_APP : BASE_URL_AWS_APP}`,
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000,
      data: Data,
    }
  }

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}></FormProvider>
    </>
  )
}
