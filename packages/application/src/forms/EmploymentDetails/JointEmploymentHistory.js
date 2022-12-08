import React, { useEffect } from 'react'

// Framer
import { motion, AnimatePresence } from 'framer-motion'
import { varFade, varBounce } from '../../components/ui/animate'

// RHF
import { useForm } from 'react-hook-form'

// API constants
import { BASE_URL_LOCAL_APP, BASE_URL_AWS_APP, processNodeEnv } from '../../redux/utils/apiConstants'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { employmentActions } from '../../redux/slices/employmentSlice'
import { getAddressesPrevEmp } from '../../redux/slices/employmentSlice'
import { getAddressMetaDataPrevEmp } from '../../redux/slices/employmentSlice'

// YUP
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// MUI
import { Box } from '@mui/material'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'

// Custom components
import Form from '../../components/Form'
import Counter from '../../components/Counter'
import InputField from '../../components/rhf-components/Input'
import SelectMenu from '../../components/rhf-components/SelectMenu'
import EditableCounter from '../../components/rhf-components/EditableCounter'
import AddressFinderAutoComplete from '../../components/AddressFinderAutoComplete'

// Codes
import { employmentTypeMenu, occupationMenu } from './Codes/EmploymentCodes'

const schema = yup.object().shape({
  employmentType: yup.string().required('Employment type is required').nullable(),
  occupation: yup.string().when('employmentType', {
    is: (emp) => {
      return emp === 'Unemployed' || emp === 'Retired' || emp === 'Beneficiary' || emp === 'Homemaker'
    },
    then: yup.string().nullable(),
    otherwise: yup.string().required('Occupation is required').nullable(),
  }),
  employerName: yup
    .string()
    .when('employmentType', {
      is: (emp) => {
        return emp === 'Unemployed' || emp === 'Retired' || emp === 'Beneficiary' || emp === 'Homemaker'
      },
      then: yup.string().nullable(),
      otherwise: yup.string().required('Employer Name is required').nullable(),
    })
    .nullable(),
  empAddStreet: yup
    .string()
    .when('employmentType', {
      is: (emp) => {
        return emp === 'Unemployed' || emp === 'Retired' || emp === 'Beneficiary' || emp === 'Homemaker'
      },
      then: yup.string().nullable(),
      otherwise: yup.string().required('Employer address is required').nullable(),
    })
    .nullable(),
  empHistYears: yup.string(),
  empHistMonths: yup.string(),
})

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
}))

const JointEmployementHistory = () => {
  const showEmploymentDetails = useSelector((state) => state.employmentReducer.jointprevEmpshowEmploymentDetails)
  const employmentType = useSelector((state) => state.employmentReducer.jointprevEmpemploymentType)
  const occupation = useSelector((state) => state.employmentReducer.jointprevEmpoccupation)
  const employerName = useSelector((state) => state.employmentReducer.jointprevEmpemployerName)
  const empAddStreet = useSelector((state) => state.employmentReducer.jointprevEmpempAddStreet)
  const empHistYears = useSelector((state) => state.employmentReducer.jointprevEmpempHistYears)
  const empHistMonths = useSelector((state) => state.employmentReducer.jointprevEmpempHistMonths)
  const onSubmitEmploymentHistory = useSelector((state) => state.employmentReducer.jointonSubmitEmploymentHistory)

  //Address Finder
  const loading = useSelector((state) => state.employmentReducer.loading)
  const empAddressFinderCompletions = useSelector((state) => state.employmentReducer.jointprevEmpempAddressFinderCompletions)
  const empAddressFinderSucess = useSelector((state) => state.employmentReducer.jointprevEmpempAddressFinderSucess)
  const empAddressFinderConfig = useSelector((state) => state.employmentReducer.jointprevEmpempAddressFinderConfig)

  const empAddressSelectedAddress = useSelector((state) => state.employmentReducer.jointprevEmpempAddressSelectedAddress)
  const empAddressSelectedPxid = useSelector((state) => state.employmentReducer.jointprevEmpempAddressSelectedPxid)
  const empAddressSelectedMetaData = useSelector((state) => state.employmentReducer.jointprevEmpempAddressSelectedMetaData)
  const loadingMeta = useSelector((state) => state.employmentReducer.loadingMeta)

  const empAddressToDisplayLine1 = useSelector((state) => state.employmentReducer.jointprevEmpempAddressToDisplayLine1)
  const empAddressToDisplayLine2 = useSelector((state) => state.employmentReducer.jointprevEmpempAddressToDisplayLine2)
  const empAddressToDisplayLine3 = useSelector((state) => state.employmentReducer.jointprevEmpempAddressToDisplayLine3)
  const empAddressToDisplayLine4 = useSelector((state) => state.employmentReducer.jointprevEmpempAddressToDisplayLine4)

  const varEmployemntDetails = showEmploymentDetails
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inUp
    : varFade({
        distance: 100,
        durationIn: 0.5,
        durationOut: 0.32,
      }).outDown

  const varEmployerAddress = showEmploymentDetails
    ? varFade({
        distance: 100,
        durationIn: 0.5,
        durationOut: 0.32,
      }).inUp
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outDown

  const varSelectedAddress =
    empAddressSelectedPxid !== null
      ? varFade({
          distance: 100,
          durationIn: 0.32,
          durationOut: 0.32,
        }).inUp
      : varFade({
          distance: 100,
          durationIn: 0.32,
          durationOut: 0.32,
        }).outLeft

  const varLocationIcon =
    empAddressSelectedPxid !== null
      ? varBounce({
          durationIn: 0.5,
          durationOut: 0.5,
          delay: 0.5,
          inY: 1,
        }).inDown
      : varBounce({
          durationIn: 0.5,
          durationOut: 0.5,
          inY: 1,
        }).out

  const varEmpHistory = varFade({
    distance: 20,
    durationIn: 0.32,
    durationOut: 0.32,
  }).inLeft

  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const dispatch = useDispatch()

  const {
    formState: { isValid },
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      employmentType: employmentType,
      occupation: occupation,
      employerName: employerName,
      empAddStreet: empAddStreet,
      empHistYears: empHistYears,
      empHistMonths: empHistMonths,
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
    dispatch(employmentActions.setRenderingPrime(false))
  }, [])

  useEffect(() => {
    if (empAddStreet !== null) {
      var addressFinderData = JSON.stringify({
        show_metadata: 'N',
        partial_addr: empAddStreet,
      })

      const config = {
        url: '/addressfinder',
        method: 'POST',
        baseURL: `${processNodeEnv() === 'development' ? BASE_URL_LOCAL_APP : BASE_URL_AWS_APP}`,
        headers: { 'Content-Type': 'application/json' },
        timeout: 5000,
        data: addressFinderData,
      }
      // Address Finder wildcard search result
      dispatch(employmentActions.setJointPrevEmpAddressFinderConfig(config))
    }
  }, [empAddStreet])

  useEffect(() => {
    if (empAddressSelectedPxid !== null) {
      var addressPxidData = JSON.stringify({
        show_metadata: 'Y',
        pxid: empAddressSelectedPxid,
      })

      const config = {
        url: '/addressfinder',
        method: 'POST',
        baseURL: `${processNodeEnv() === 'development' ? BASE_URL_LOCAL_APP : BASE_URL_AWS_APP}`,
        headers: { 'Content-Type': 'application/json' },
        timeout: 5000,
        data: addressPxidData,
      }
      // Address Finder Meta-data request
      dispatch(getAddressMetaDataPrevEmp(config))
    }
  }, [empAddressSelectedPxid])

  function getStreetFromAndToNumber(number) {
    const numberFromTo = number?.split('-')
    if (numberFromTo) {
      return { from: numberFromTo[0], to: numberFromTo[1], length: numberFromTo?.length }
    }
  }

  useEffect(() => {
    if (empAddressSelectedMetaData !== null) {
      if (empAddressSelectedMetaData !== null && empAddressSelectedMetaData !== undefined) {
        // Data to Display on Front-End
        dispatch(employmentActions.setJointPrevEmpAddressToDisplayLine1(empAddressSelectedMetaData?.postal_line_1))
        dispatch(employmentActions.setJointPrevEmpAddressToDisplayLine2(empAddressSelectedMetaData?.postal_line_2))
        dispatch(employmentActions.setJointPrevEmpAddressToDisplayLine3(empAddressSelectedMetaData?.postal_line_3))
        dispatch(employmentActions.setJointPrevEmpAddressToDisplayLine4(empAddressSelectedMetaData?.postal_line_4))

        // >>>>>>>>>>>>>>>>>>>>>>>>>>>  Data to send in submission body <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //

        // 1. Unit Type
        if (empAddressSelectedMetaData?.unit_type) dispatch(employmentActions.setJointPrevEmpAddressSelectedUnitType(empAddressSelectedMetaData?.unit_type))
        // 2. Apartment
        if (empAddressSelectedMetaData?.unit_identifier) dispatch(employmentActions.setJointPrevEmpAddressSelectedApartment(empAddressSelectedMetaData?.unit_identifier))
        // 3. Building
        if (empAddressSelectedMetaData?.building_name) dispatch(employmentActions.setJointPrevEmpAddressSelectedBuilding(empAddressSelectedMetaData?.building_name))
        // 4. Street number from
        if (getStreetFromAndToNumber(empAddressSelectedMetaData?.number)?.from) dispatch(employmentActions.setJointPrevEmpAddressSelectedStreetNumberFrom(getStreetFromAndToNumber(empAddressSelectedMetaData?.number)?.from))
        // 5. Street number to
        if (getStreetFromAndToNumber(empAddressSelectedMetaData?.number)?.to) dispatch(employmentActions.setJointPrevEmpAddressSelectedStreetNumberTo(getStreetFromAndToNumber(empAddressSelectedMetaData?.number)?.to))
        // 6. Street Alpha
        if (empAddressSelectedMetaData?.alpha) dispatch(employmentActions.setJointPrevEmpAddressSelectedAlpha(empAddressSelectedMetaData?.alpha))
        // 7. Street or postal Name
        if (empAddressSelectedMetaData?.street) dispatch(employmentActions.setJointPrevEmpAddressSelectedStreetOrPostalName(empAddressSelectedMetaData?.street))
        // 8. Street Direction
        if (empAddressSelectedMetaData?.street_suffix) dispatch(employmentActions.setJointPrevEmpAddressSelectedStreetDirection(empAddressSelectedMetaData?.street_suffix))
        // 9. Street Type
        if (empAddressSelectedMetaData?.street_type) dispatch(employmentActions.setJointPrevEmpAddressSelectedStreetType(empAddressSelectedMetaData?.street_type))
        // 10. Suburb
        if (empAddressSelectedMetaData?.suburb) dispatch(employmentActions.setJointPrevEmpAddressSelectedSuburb(empAddressSelectedMetaData?.suburb))
        // 11. City
        if (empAddressSelectedMetaData?.city) dispatch(employmentActions.setJointPrevEmpAddressSelectedCity(empAddressSelectedMetaData?.city))
        // // 12. State
        // if (empAddressSelectedMetaData?.region) dispatch(employmentActions.setJointPrevEmpAddressSelectedState(empAddressSelectedMetaData?.region))
        // 13. Post code
        if (empAddressSelectedMetaData?.postcode) dispatch(employmentActions.setJointPrevEmpAddressSelectedPostCode(empAddressSelectedMetaData?.postcode))
        // 14. Country code
        dispatch(employmentActions.setJointPrevEmpAddressSelectedCountryCode('NZD'))
        //15. Country description
        dispatch(employmentActions.setJointPrevEmpAddressSelectedCountryDesc('New Zealand'))

        // >>>>>>>>>>>>>>>>>>>>>>>>>>> END <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //

        dispatch(employmentActions.setJointPrevEmpAddStreet(empAddressSelectedMetaData?.a))

        if (empAddressSelectedMetaData?.postal_line_1 == null) dispatch(employmentActions.setJointPrevEmpAddressToDisplayLine1(null))
        if (empAddressSelectedMetaData?.postal_line_2 == null) dispatch(employmentActions.setJointPrevEmpAddressToDisplayLine2(null))
        if (empAddressSelectedMetaData?.postal_line_3 == null) dispatch(employmentActions.setJointPrevEmpAddressToDisplayLine3(null))
        if (empAddressSelectedMetaData?.postal_line_4 == null) dispatch(employmentActions.setJointPrevEmpAddressToDisplayLine4(null))
      }
    }
  }, [empAddressSelectedMetaData])

  useEffect(() => {
    setIsValidForm(isValid)
  }, [isValid])

  useEffect(() => {
    if (onSubmitEmploymentHistory != null) {
      handleSubmit(onSubmit())()
      return
    }
  }, [onSubmitEmploymentHistory])

  function setIsValidForm(isValid) {
    dispatch(employmentActions.setJointIsValidEmploymentHistory(isValid))
  }

  function onSubmit() {
    console.log('Employment Details Submitted')
  }

  const handleEmploymentType = (event) => {
    if (event.target.value === 'Unemployed' || event.target.value === 'Retired' || event.target.value === 'Beneficiary' || event.target.value === 'Homemaker') {
      dispatch(employmentActions.setJointShowPrevEmploymnetDetails(false))
      dispatch(employmentActions.setJointPrevEmploymnetType(event.target.value))
      return
    }

    if (event.target.value !== 'Unemployed' || event.target.value !== 'Retired' || event.target.value !== 'Beneficiary' || event.target.value !== 'Homemaker') {
      dispatch(employmentActions.setJointShowPrevEmploymnetDetails(true))
      dispatch(employmentActions.setJointPrevEmploymnetType(event.target.value))
      return
    }
  }

  const handleOccupation = (event) => {
    dispatch(employmentActions.setJointPrevOccupation(event.target.value))
  }

  const handleEmployerName = (event) => {
    dispatch(employmentActions.setJointPrevemployerName(event.target.value))
  }

  const handleEmployerAddress = (event) => {
    dispatch(employmentActions.setJointPrevEmpAddStreet(event.target.value))
  }

  const handleEmployerAddressSelected = (event, newValue) => {
    dispatch(employmentActions.setJointPrevEmpAddressSelectedAddress(newValue))
    dispatch(employmentActions.setJointPrevEmpAddressSelectedPxid(newValue?.pxid))
  }

  const incrementEmpHistYears = () => {
    dispatch(employmentActions.setJointPrevEmpHistYears(parseInt(empHistYears) + 1))
  }

  const decrementEmpHistYears = () => {
    dispatch(employmentActions.setJointPrevEmpHistYears(parseInt(empHistYears) - 1))
  }

  const incrementEmpHistMonths = () => {
    dispatch(employmentActions.setJointPrevEmpHistMonths(parseInt(empHistMonths) + 1))
  }

  const decrementEmpHistMonths = () => {
    dispatch(employmentActions.setJointPrevEmpHistMonths(parseInt(empHistMonths) - 1))
  }

  const handleEmpHistYears = (event) => {
    dispatch(employmentActions.setJointPrevEmpHistYears(event.target.value === '' ? 0 : parseInt(event.target.value)))
  }
  const handleEmpHistMonths = (event) => {
    dispatch(employmentActions.setJointPrevEmpHistMonths(event.target.value === '' ? 0 : parseInt(event.target.value)))
  }

  return (
    <Form>
      <Stack direction='column' spacing={2} justifyContent='flex-start'>
        <SelectMenu id='employmentType' name='employmentType' onSelectChange={handleEmploymentType} label='Previous Employment' control={control} defaultValue={''} menuItems={employmentTypeMenu} placeholder='Select Employment Type...' />
        <>
          <AnimatePresence exitBeforeEnter>
            {!showEmploymentDetails && employmentType === null && (
              <Stack key='emphisthelper1' component={motion.div} {...varEmpHistory} direction='row' justifyContent='center' sx={{ py: downSm ? 5 : 10, fontWeight: 'regular', color: 'text.secondary' }}>
                <Typography variant='body2' sx={{ textAlign: 'center' }}>
                  Please provide the details of your <strong>previous employment</strong> as you have been in your current employment for less than 3 years.
                </Typography>
              </Stack>
            )}
          </AnimatePresence>
          <AnimatePresence exitBeforeEnter>
            {!showEmploymentDetails && employmentType !== null && (
              <Stack key='emphisthelper2' component={motion.div} {...varEmpHistory} direction='row' justifyContent='center' sx={{ py: downSm ? 5 : 10, fontWeight: 'regular', color: 'text.secondary' }}>
                <Typography variant='body2' sx={{ textAlign: 'center' }}>
                  Please proceed to the <strong>next</strong> step.
                </Typography>
              </Stack>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {showEmploymentDetails && (
              <Stack key='occemp' component={motion.div} {...varEmployemntDetails} direction='column' spacing={2} justifyContent='flex-start'>
                <SelectMenu id='occupation' name='occupation' onSelectChange={handleOccupation} label='Occupation' control={control} defaultValue={''} menuItems={occupationMenu} placeholder='Select Occupation...' />
                <InputField name='employerName' label='Name of your employer' type='text' control={control} onInputChange={handleEmployerName} hasTooltip={false} />
              </Stack>
            )}
            {showEmploymentDetails && (
              <Stack key='empadd' component={motion.div} {...varEmployerAddress}>
                <Stack direction='column' spacing={2} justifyContent='flex-start'>
                  <AddressFinderAutoComplete name='empAddStreet' asynchronousFunc={getAddressesPrevEmp} addressFinderRequestConfig={empAddressFinderConfig} addressFinderSuccess={empAddressFinderSucess} addressFinderLabel='Employer Address' addressCompletions={empAddressFinderCompletions} control={control} onAddressChange={handleEmployerAddress} onAddressSelectedChange={handleEmployerAddressSelected} loading={loading} value={empAddressSelectedAddress} defualtValue='' helperText='Start typing...' />
                  {empAddressSelectedPxid !== null && empAddressSelectedPxid !== undefined && (
                    <>
                      <Stack direction='row' spacing={1} justifyContent='center' alignItems='center'>
                        <Box key='chipempadd' component={motion.div} {...varLocationIcon}>
                          <IconButton aria-label='Employer Address' color='secondary' variant='filled'>
                            <LocationOnRoundedIcon />
                          </IconButton>
                        </Box>
                        <Box sx={{ textAlign: 'center' }} key='typoempadd' component={motion.div} {...varSelectedAddress}>
                          <Typography variant='body2' sx={{ fontWeight: 'regular', color: 'text.secondary' }}>
                            {empAddressToDisplayLine1}
                            {empAddressToDisplayLine2 ? ', ' : ''}
                            {empAddressToDisplayLine2}
                            {empAddressToDisplayLine3 ? ', ' : ''}
                            {empAddressToDisplayLine3}
                          </Typography>
                        </Box>
                      </Stack>
                    </>
                  )}
                </Stack>
              </Stack>
            )}
            {showEmploymentDetails && (
              <motion.div key='empHistPrevEmployerYears' {...varEmployerAddress}>
                <Stack direction='column' spacing={3} justifyContent='flex-start'>
                  <Stack direction='column' spacing={2}>
                    <LabelStyle sx={{ textAlign: 'center' }}>How long have you been employed by {employerName}?</LabelStyle>
                    <Stack direction={downSm ? 'column' : 'row'} spacing={downMd ? (downSm ? 1 : 2) : 0} justifyContent={downMd ? 'center' : 'space-evenly'} alignItems={downSm ? 'center' : 'baseline'}>
                      <EditableCounter name='empHistYears' control={control} defualtValue={0} label='Years' count={empHistYears} maxValue={40} onIncrementCount={incrementEmpHistYears} onDecrementCount={decrementEmpHistYears} onTextFieldChange={handleEmpHistYears} />
                      {!downSm && (
                        <Typography variant='body1' sx={{ color: 'text.secondray' }}>
                          and
                        </Typography>
                      )}
                      <EditableCounter name='empHistMonths' control={control} defualtValue={0} label='Months' count={empHistMonths} maxValue={11} onIncrementCount={incrementEmpHistMonths} onDecrementCount={decrementEmpHistMonths} onTextFieldChange={handleEmpHistMonths} />
                    </Stack>
                  </Stack>
                </Stack>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      </Stack>
    </Form>
  )
}

export default JointEmployementHistory
