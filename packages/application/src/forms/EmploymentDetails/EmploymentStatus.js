import React, { useEffect, useState, useMemo } from 'react'

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
import { getAddresses } from '../../redux/slices/employmentSlice'
import { getAddressMetaData } from '../../redux/slices/employmentSlice'

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
import DatePicker from '../../components/rhf-components/DatePicker'
import SelectMenu from '../../components/rhf-components/SelectMenu'
import EditableCounter from '../../components/rhf-components/EditableCounter'
import AddressFinderAutoComplete from '../../components/AddressFinderAutoComplete'

// Utils
import { dateDiffereneInMonths } from '../../utils/formatDateTime'

// Throtte
import throttle from 'lodash.throttle'

// Codes
import { employmentTypeMenu, occupationMenu } from './Codes/EmploymentCodes'

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
}))

function EmploymentStatus() {
  const [text, setText] = useState('')
  const secureSessionID = useSelector((state) => state.globalReducer.secureSessionID)

  const showEmploymentDetails = useSelector((state) => state.employmentReducer.showEmploymentDetails)
  const employmentType = useSelector((state) => state.employmentReducer.employmentType)
  const occupation = useSelector((state) => state.employmentReducer.occupation)
  const employerName = useSelector((state) => state.employmentReducer.employerName)
  const empAddStreet = useSelector((state) => state.employmentReducer.empAddStreet)

  const employEffectiveDate = useSelector((state) => state.employmentReducer.employEffectiveDate)
  const employMonths = useSelector((state) => state.employmentReducer.employMonths)

  const onSubmitEmploymentDetails = useSelector((state) => state.employmentReducer.onSubmitEmploymentDetails)

  //Address Finder
  const loading = useSelector((state) => state.employmentReducer.loading)
  const empAddressFinderCompletions = useSelector((state) => state.employmentReducer.empAddressFinderCompletions)
  const empAddressFinderSucess = useSelector((state) => state.employmentReducer.empAddressFinderSucess)
  const empAddressFinderConfig = useSelector((state) => state.employmentReducer.empAddressFinderConfig)

  const empAddressSelectedAddress = useSelector((state) => state.employmentReducer.empAddressSelectedAddress)
  const empAddressSelectedPxid = useSelector((state) => state.employmentReducer.empAddressSelectedPxid)
  const empAddressSelectedMetaData = useSelector((state) => state.employmentReducer.empAddressSelectedMetaData)
  const loadingMeta = useSelector((state) => state.employmentReducer.loadingMeta)

  const empAddressToDisplayLine1 = useSelector((state) => state.employmentReducer.empAddressToDisplayLine1)
  const empAddressToDisplayLine2 = useSelector((state) => state.employmentReducer.empAddressToDisplayLine2)
  const empAddressToDisplayLine3 = useSelector((state) => state.employmentReducer.empAddressToDisplayLine3)
  const empAddressToDisplayLine4 = useSelector((state) => state.employmentReducer.empAddressToDisplayLine4)

  const upperLimitForEffectiveDate = new Date()

  const schemaemp = yup.object().shape({
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
    employEffectiveDate: yup
      .string()
      .required('Employment Effective Date is required.')
      .test('cannot be lower than 1900', 'Invalid Date of Birth. Date Format: MMMM YYYY', function (effectiveDate) {
        if (effectiveDate === 'Invalid Date') {
          return false
        }

        return true
      })
      .nullable(),
  })

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
          inY: 1,
          delay: 0.5,
        }).inDown
      : varBounce({
          durationIn: 0.5,
          durationOut: 0.5,
          inY: 1,
        }).out

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
      employEffectiveDate: employEffectiveDate,
    },
    mode: 'onChange',
    resolver: yupResolver(schemaemp),
  })

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
    dispatch(employmentActions.setRenderingPrime(true))
  }, [])

  useEffect(() => {
    // console.log('empAddStreet: ', empAddStreet)
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

      // console.log('config: ', config)
      // Address Finder wildcard search result
      dispatch(employmentActions.setEmpAddressFinderConfig(config))
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
      dispatch(getAddressMetaData(config))
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
        dispatch(employmentActions.setEmpAddressToDisplayLine1(empAddressSelectedMetaData?.postal_line_1))
        dispatch(employmentActions.setEmpAddressToDisplayLine2(empAddressSelectedMetaData?.postal_line_2))
        dispatch(employmentActions.setEmpAddressToDisplayLine3(empAddressSelectedMetaData?.postal_line_3))
        dispatch(employmentActions.setEmpAddressToDisplayLine4(empAddressSelectedMetaData?.postal_line_4))

        // >>>>>>>>>>>>>>>>>>>>>>>>>>>  Data to send in submission body <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //

        // 1. Unit Type
        if (empAddressSelectedMetaData?.unit_type) dispatch(employmentActions.setEmpAddressSelectedUnitType(empAddressSelectedMetaData?.unit_type))
        // 2. Apartment
        if (empAddressSelectedMetaData?.unit_identifier) dispatch(employmentActions.setEmpAddressSelectedApartment(empAddressSelectedMetaData?.unit_identifier))
        // 3. Building
        if (empAddressSelectedMetaData?.building_name) dispatch(employmentActions.setEmpAddressSelectedBuilding(empAddressSelectedMetaData?.building_name))
        // 4. Street number from
        if (getStreetFromAndToNumber(empAddressSelectedMetaData?.number)?.from) dispatch(employmentActions.setEmpAddressSelectedStreetNumberFrom(getStreetFromAndToNumber(empAddressSelectedMetaData?.number)?.from))
        // 5. Street number to
        if (getStreetFromAndToNumber(empAddressSelectedMetaData?.number)?.to) dispatch(employmentActions.setEmpAddressSelectedStreetNumberTo(getStreetFromAndToNumber(empAddressSelectedMetaData?.number)?.to))
        // 6. Street Alpha
        if (empAddressSelectedMetaData?.alpha) dispatch(employmentActions.setEmpAddressSelectedAlpha(empAddressSelectedMetaData?.alpha))
        // 7. Street or postal Name
        if (empAddressSelectedMetaData?.street) dispatch(employmentActions.setEmpAddressSelectedStreetOrPostalName(empAddressSelectedMetaData?.street))
        // 8. Street Direction
        if (empAddressSelectedMetaData?.street_suffix) dispatch(employmentActions.setEmpAddressSelectedStreetDirection(empAddressSelectedMetaData?.street_suffix))
        // 9. Street Type
        if (empAddressSelectedMetaData?.street_type) dispatch(employmentActions.setEmpAddressSelectedStreetType(empAddressSelectedMetaData?.street_type))
        // 10. Suburb
        if (empAddressSelectedMetaData?.suburb) dispatch(employmentActions.setEmpAddressSelectedSuburb(empAddressSelectedMetaData?.suburb))
        // 11. City
        if (empAddressSelectedMetaData?.city) dispatch(employmentActions.setEmpAddressSelectedCity(empAddressSelectedMetaData?.city))
        // // 12. State
        // if (empAddressSelectedMetaData?.region) dispatch(employmentActions.setEmpAddressSelectedState(empAddressSelectedMetaData?.region))
        // 13. Post code
        if (empAddressSelectedMetaData?.postcode) dispatch(employmentActions.setEmpAddressSelectedPostCode(empAddressSelectedMetaData?.postcode))
        // 14. Country code
        dispatch(employmentActions.setEmpAddressSelectedCountryCode('NZD'))
        //15. Country description
        dispatch(employmentActions.setEmpAddressSelectedCountryDesc('New Zealand'))

        // >>>>>>>>>>>>>>>>>>>>>>>>>>> END <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //

        dispatch(employmentActions.setEmpAddStreet(empAddressSelectedMetaData?.a))

        if (empAddressSelectedMetaData?.postal_line_1 == null) dispatch(employmentActions.setEmpAddressToDisplayLine1(null))
        if (empAddressSelectedMetaData?.postal_line_2 == null) dispatch(employmentActions.setEmpAddressToDisplayLine2(null))
        if (empAddressSelectedMetaData?.postal_line_3 == null) dispatch(employmentActions.setEmpAddressToDisplayLine3(null))
        if (empAddressSelectedMetaData?.postal_line_4 == null) dispatch(employmentActions.setEmpAddressToDisplayLine4(null))
      }
    }
  }, [empAddressSelectedMetaData])

  const UnregisterEmploymentDetails = () => {
    dispatch(employmentActions.setOccupation(null))
    dispatch(employmentActions.setemployerName(null))
    dispatch(employmentActions.setEmpAddStreet(null))
  }

  useEffect(() => {
    if (!showEmploymentDetails) {
      UnregisterEmploymentDetails()
      return
    }
  }, [showEmploymentDetails])

  // UseEffect to toggle previous employment
  useEffect(() => {
    if (employMonths >= 24) {
      dispatch(employmentActions.setshowPrevEmp(false))
      return
    }

    dispatch(employmentActions.setshowPrevEmp(true))
  }, [employMonths, employEffectiveDate])

  useEffect(() => {
    setIsValidForm(isValid)
    dispatch(employmentActions.setSovHasCurrentEmpDetails(true))
  }, [isValid])

  useEffect(() => {
    if (onSubmitEmploymentDetails != null) {
      handleSubmit(onSubmit())()
    }
  }, [onSubmitEmploymentDetails])

  function setIsValidForm(isValid) {
    dispatch(employmentActions.setIsValidEmploymentDetails(isValid))

    if (secureSessionID) {
      dispatch(employmentActions.setisValidCurrentEmployment(true))
      dispatch(employmentActions.setisValidemploymentType(true))
      dispatch(employmentActions.setisValidoccupation(true))
      dispatch(employmentActions.setisValidemployerName(true))
      dispatch(employmentActions.setisValidempHistYears(true))
      dispatch(employmentActions.setisValidempHistMonths(true))
    }
  }

  function onSubmit() {
    console.log('Employment Details Submitted')
  }

  const handleEmploymentType = (event) => {
    if (event.target.value === 'Unemployed' || event.target.value === 'Retired' || event.target.value === 'Beneficiary' || event.target.value === 'Homemaker') {
      dispatch(employmentActions.setShowEmploymnetDetails(false))
      dispatch(employmentActions.setEmploymnetType(event.target.value))
      return
    }

    if (event.target.value !== 'Unemployed' || event.target.value !== 'Retired' || event.target.value !== 'Beneficiary' || event.target.value !== 'Homemaker') {
      dispatch(employmentActions.setShowEmploymnetDetails(true))
      dispatch(employmentActions.setEmploymnetType(event.target.value))
      return
    }
  }

  const handleOccupation = (event) => {
    dispatch(employmentActions.setOccupation(event.target.value))
  }

  const handleEmployerName = (event) => {
    dispatch(employmentActions.setemployerName(event.target.value))
  }

  //* Handler for updating address request config
  const handleEmployerAddress = (event) => {
    dispatch(employmentActions.setEmpAddStreet(event.target.value))
  }

  //* --------  Throttling for Address Finder ----------

  // const throttledChangeHandler = useMemo(() => {
  //   return throttle(handleEmployerAddress, 1000)
  // }, [handleEmployerAddress])

  const handleEmployerAddressSelected = (event, newValue) => {
    dispatch(employmentActions.setEmpAddressSelectedAddress(newValue))
    dispatch(employmentActions.setEmpAddressSelectedPxid(newValue?.pxid))
  }

  const handleEmploymentEffDate = (date) => {
    dispatch(employmentActions.setEmployEffective(date))
    const monthsFromToday = dateDiffereneInMonths(new Date(date), new Date())
    dispatch(employmentActions.setEmployMonths(monthsFromToday))
  }

  // const incrementEmpHistYears = () => {
  //   dispatch(employmentActions.setEmpHistYears(parseInt(empHistYears) + 1))
  //   dispatch(employmentActions.toggleEmpHistPrevEmploymnet())
  // }

  // const decrementEmpHistYears = () => {
  //   dispatch(employmentActions.setEmpHistYears(parseInt(empHistYears) - 1))
  //   dispatch(employmentActions.toggleEmpHistPrevEmploymnet())
  // }

  // const incrementEmpHistMonths = () => {
  //   dispatch(employmentActions.setEmpHistMonths(parseInt(empHistMonths) + 1))
  //   dispatch(employmentActions.toggleEmpHistPrevEmploymnet())
  // }

  // const decrementEmpHistMonths = () => {
  //   dispatch(employmentActions.setEmpHistMonths(parseInt(empHistMonths) - 1))
  //   dispatch(employmentActions.toggleEmpHistPrevEmploymnet())
  // }

  // const handleEmpHistYears = (event) => {
  //   dispatch(employmentActions.setEmpHistYears(event.target.value === '' ? 0 : parseInt(event.target.value)))
  //   dispatch(employmentActions.toggleEmpHistPrevEmploymnet())
  // }
  // const handleEmpHistMonths = (event) => {
  //   dispatch(employmentActions.setEmpHistMonths(event.target.value === '' ? 0 : parseInt(event.target.value)))
  //   dispatch(employmentActions.toggleEmpHistPrevEmploymnet())
  // }

  const varEmpHistory = varFade({
    distance: 40,
    durationIn: 0.32,
    durationOut: 0.32,
  }).inUp

  return (
    <Form>
      <Stack direction='column' spacing={2} justifyContent='flex-start'>
        {/* <InputField name='throttleTest' label='Throttle Test' type='text' control={control} onInputChange={throttledChangeHandler} hasTooltip={false} placeholder='Testing throttle...' />
        <Typography variant='body1' color='primary'>
          Throttling Text - {text}
        </Typography> */}
        <SelectMenu id='employmentType' name='employmentType' onSelectChange={handleEmploymentType} label='Employment Type' control={control} defaultValue={''} menuItems={employmentTypeMenu} placeholder='Select Employment Type...' />
        <>
          <AnimatePresence exitBeforeEnter>
            {!showEmploymentDetails && employmentType !== '' && (
              <Stack key='emphisthelper2' component={motion.div} {...varEmpHistory} direction='row' justifyContent='center' sx={{ py: downSm ? 5 : 10, fontWeight: 'regular', color: 'text.secondary' }}>
                <Typography variant={downSm ? 'body2' : 'body1'} sx={{ textAlign: 'center' }}>
                  Please proceed to the <strong>next</strong> step.
                </Typography>
              </Stack>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {showEmploymentDetails && (
              <Stack key='occemp' component={motion.div} {...varEmployemntDetails} direction='column' spacing={4} justifyContent='flex-start'>
                <SelectMenu id='occupation' name='occupation' onSelectChange={handleOccupation} label='Occupation' control={control} defaultValue={''} menuItems={occupationMenu} placeholder='Select Occupation...' />
                <InputField name='employerName' label='Name of your employer' type='text' control={control} onInputChange={handleEmployerName} hasTooltip={false} placeholder='Name of your Employer' />
              </Stack>
            )}
            {showEmploymentDetails && (
              <Stack key='empadd' component={motion.div} {...varEmployerAddress} sx={{ py: 2 }}>
                <Stack direction='column' spacing={2} justifyContent='flex-start'>
                  <AddressFinderAutoComplete name='empAddStreet' asynchronousFunc={getAddresses} addressFinderRequestConfig={empAddressFinderConfig} addressFinderSuccess={empAddressFinderSucess} addressFinderLabel='Employer Address' addressCompletions={empAddressFinderCompletions} control={control} onAddressChange={handleEmployerAddress} onAddressSelectedChange={handleEmployerAddressSelected} loading={loading} value={empAddressSelectedAddress} defualtValue='' helperText='Start typing employer address...' />
                  {!(empAddressSelectedPxid == null) && (
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
                  <Stack direction='column' spacing={2} justifyContent='flex-start' alignItems='center' sx={{ width: '100%' }}>
                    <LabelStyle sx={{ textAlign: 'center' }}>When did you start your employment{employerName ? ` at ${employerName}?` : '?'}</LabelStyle>
                    <DatePicker id='employEffectiveDate' name='employEffectiveDate' onDateChange={handleEmploymentEffDate} label='Employment Effective Date' control={control} variant='outlined' helperText='Month and Year. Eg: June 2020' openTo='year' format='MMMM YYYY' date={employEffectiveDate} maxDate={upperLimitForEffectiveDate} isRequired={true} views={['year', 'month']} />
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

export default EmploymentStatus
