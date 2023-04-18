import React, { useEffect } from 'react'

// Framer
import { motion, AnimatePresence } from 'framer-motion'
import { varFade } from '../../components/ui/animate'

// RHF
import { useForm } from 'react-hook-form'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { yourPersonalDetailsActions } from '../../redux/slices/yourPersonalDetailsSlice'

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

//* Custom components
import Form from '../../components/Form'
import Counter from '../../components/Counter'
import InputField from '../../components/rhf-components/Input'
import DatePicker from '../../components/rhf-components/DatePicker'
import DatePickerCust from '../../components/rhf-components/DatePickerCust'
import SelectMenu from '../../components/rhf-components/SelectMenu'
import RadioGroups from '../../components/rhf-components/RadioGroups'

//* MUI - Icons
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'

//* Codes
import { maritalStatusMenu } from './Codes/PersonalDetailsCodes'

import { format, parse, isDate } from 'date-fns'

//* Utils
import { fDate, convertToUTCTimestamp, fDateYear, fDateCustom, fDateTime, fDateYYYY_MM_DD, fDateForwardSlashSeperated } from '../../utils/formatDateTime'

const dobUpperLimit = new Date().setFullYear(new Date().getFullYear() - 18)

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
}))

const YourPersonalDetails = () => {
  window.dataLayer = window.dataLayer || []

  console.log('Window. Data Layer - ', (window.dataLayer = window.dataLayer || []))

  const defMinDobDate = new Date().setFullYear(new Date().getFullYear() - 120)

  const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(fecthMartialStatus())
  // }, [])

  const secureSessionID = useSelector((state) => state.globalReducer.secureSessionID)

  const title = useSelector((state) => state.yourPersonalDetailReducer.title)
  const preferredTitle = useSelector((state) => state.yourPersonalDetailReducer.preferredTitle)
  const forenames = useSelector((state) => state.yourPersonalDetailReducer.forenames)
  const middleNames = useSelector((state) => state.yourPersonalDetailReducer.middleNames)
  const lastName = useSelector((state) => state.yourPersonalDetailReducer.lastName)
  const otherNames = useSelector((state) => state.yourPersonalDetailReducer.otherNames)
  const gender = useSelector((state) => state.yourPersonalDetailReducer.gender)
  const dobDefDate = useSelector((state) => state.yourPersonalDetailReducer.dobDefDate)
  const dob = useSelector((state) => state.yourPersonalDetailReducer.dob)

  const maritalStatus = useSelector((state) => state.yourPersonalDetailReducer.maritalStatus)
  const showOtherTitleField = useSelector((state) => state.yourPersonalDetailReducer.showOtherTitleField)
  const dependents = useSelector((state) => state.yourPersonalDetailReducer.dependents)

  const validSovereignPersonalDetailsTitle = useSelector((state) => state.yourPersonalDetailReducer.validSovereignPersonalDetailsTitle)
  const validSovereignPersonalDetailsForenames = useSelector((state) => state.yourPersonalDetailReducer.validSovereignPersonalDetailsForenames)
  const validSovereignPersonalDetailsSurname = useSelector((state) => state.yourPersonalDetailReducer.validSovereignPersonalDetailsSurname)
  const validSovereignPersonalDetailsGender = useSelector((state) => state.yourPersonalDetailReducer.validSovereignPersonalDetailsGender)
  const validSovereignPersonalDetailsDob = useSelector((state) => state.yourPersonalDetailReducer.validSovereignPersonalDetailsDob)
  const validSovereignPersonalDetailsMaritalStatus = useSelector((state) => state.yourPersonalDetailReducer.validSovereignPersonalDetailsMaritalStatus)

  const validSovereignPersonalDetails = useSelector((state) => state.yourPersonalDetailReducer.validSovereignPersonalDetails)
  const listenOnSubmitYourPersonalDetails = useSelector((state) => state.yourPersonalDetailReducer.onSubmitYourPersonalDetails)

  const minDateOfBirthFromToday = new Date(new Date().setFullYear(new Date().getFullYear() - 100))

  const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    preferredTitle: yup
      .string()
      .when('title', { is: 'Other', then: yup.string().required('Your preferred title is required'), otherwise: yup.string().nullable() })
      .nullable(),
    firstNames: yup
      .string()
      .required('First names are required')
      .matches(/^([^0-9]*)$/, 'First name(s) should not contain numbers'),
    middleNames: yup.string().matches(/^([^0-9]*)$/, 'Middle Name(s) should not contain numbers'),
    lastName: yup
      .string()
      .required('Last name is a required field')
      .matches(/^([^0-9]*)$/, 'Last name should not contain numbers'),
    otherNames: yup.string().matches(/^([^0-9]*)$/, 'Name should not contain numbers'),
    gender: yup
      .string()
      .required('Gender is required')
      .test('Gender Inconsistent with title', 'Gender is inconsistent with Title', function (gender) {
        if (gender === 'Male' && (title === 'Mrs' || title === 'Miss' || title === 'Ms')) {
          return false
        }
        if (gender === 'Female' && title === 'Mr') {
          return false
        }

        return true
      }),
    dob: yup
      .string()
      .required('Date of Birth is required')
      .test('cannot be lower than 1900', 'Invalid Date of Birth. Date Format: DD/MM/YYYY', function (dateOfBirth) {
        // console.log('Yup Raw dateOfBirth: ', dateOfBirth)
        // console.log('Yup Raw dateOfBirth Formatted: ', dateOfBirth)
        // console.log('Redux Date: ', dob)
        if (dateOfBirth === 'Invalid Date') {
          return false
        }

        return true
      })
      .test('cannot be lower than 1900', `Must be born after ${fDate(minDateOfBirthFromToday)}`, function (dateOfBirth) {
        if (dateOfBirth === 'Invalid Date') {
          return false
        }

        if (new Date(dateOfBirth) < minDateOfBirthFromToday) {
          return false
        }

        return true
      })
      .test('Eighteen plus check', 'You must be at least 18 years old to apply', function (dateOfBirth) {
        if (dateOfBirth === 'Invalid Date') {
          return false
        }
        if (new Date(dateOfBirth) > dobUpperLimit) {
          return false
        }

        return true
      })
      .nullable(),
    maritalStatus: yup.string().required('Marital status is required'),
  })

  const varTitleFade = showOtherTitleField
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight

  const {
    formState: { errors, isValidating, isValid },
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: title,
      preferredTitle: preferredTitle,
      firstNames: forenames,
      middleNames: middleNames,
      lastName: lastName,
      otherNames: otherNames,
      gender: gender,
      dob: dob,
      dependents: dependents,
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
  }, [])

  useEffect(() => {
    setIsValidForm(isValid)
  }, [isValid])

  function onSubmit() {
    window.dataLayer.push({ event: 'prime_personal_details_submit' })
    console.log('Submitted')
  }

  useEffect(() => {
    if (listenOnSubmitYourPersonalDetails != null) {
      handleSubmit(onSubmit())()
    }
  }, [listenOnSubmitYourPersonalDetails])

  function setIsValidForm(isValid) {
    dispatch(yourPersonalDetailsActions.setIsValidYourPersonalDetails(isValid))

    if (secureSessionID) {
      dispatch(yourPersonalDetailsActions.setValidSovereignPersonalDetails(isValid))
    }
  }

  const handleTitle = (event) => {
    dispatch(yourPersonalDetailsActions.setTitle(event.target.value))
    dispatch(yourPersonalDetailsActions.toggleOtherTitle(event.target.value))
  }
  const handlePreferredTitle = (event) => {
    dispatch(yourPersonalDetailsActions.setPreferredTitle(event.target.value))
  }

  const handleFornames = (event) => {
    dispatch(yourPersonalDetailsActions.setForenames(event.target.value))
  }

  const handleMiddleNames = (event) => {
    dispatch(yourPersonalDetailsActions.setMiddleNames(event.target.value))
  }

  const handleLastName = (event) => {
    dispatch(yourPersonalDetailsActions.setLastName(event.target.value))
  }

  const handleOtherName = (event) => {
    dispatch(yourPersonalDetailsActions.setOtherNames(event.target.value))
  }

  const handleGender = (event) => {
    dispatch(yourPersonalDetailsActions.setGender(event.target.value))
  }

  const handleDateofBirth = (date) => {
    dispatch(yourPersonalDetailsActions.setDob(date))
  }

  const handleMaritalStatus = (event) => {
    // console.log(
    //   'Marital Status Menu: ',
    //   maritalStatusMenu.find((maritalStatusMenu) => {
    //     return maritalStatusMenu.value === event.target.value
    //   })
    // )

    dispatch(
      yourPersonalDetailsActions.setMaritalStatus(
        maritalStatusMenu.find((maritalStatusMenu) => {
          return maritalStatusMenu.value === event.target.value
        })
      )
    )
  }

  const incrementDependants = () => {
    dispatch(yourPersonalDetailsActions.setDependents(dependents + 1))
  }

  const decrementDependants = () => {
    dispatch(yourPersonalDetailsActions.setDependents(dependents - 1))
  }

  return (
    <>
      <Form>
        <Stack direction='column' spacing={5} justifyContent='flex-start'>
          <RadioGroups id='title' name='title' label='Title' onRadioChange={handleTitle} control={control} value={title} defaultValue={title || ''} row={true}>
            <FormControlLabel disabled={secureSessionID !== null && title !== '' && title !== undefined && validSovereignPersonalDetailsTitle === true} value='Mr' control={<Radio size='small' />} label='Mr' key='Mr' />
            <FormControlLabel disabled={secureSessionID !== null && title !== '' && title !== undefined && validSovereignPersonalDetailsTitle === true} value='Mrs' control={<Radio size='small' />} label='Mrs' key='Mrs' />
            <FormControlLabel disabled={secureSessionID !== null && title !== '' && title !== undefined && validSovereignPersonalDetailsTitle === true} value='Miss' control={<Radio size='small' />} label='Miss' key='Miss' />
            <FormControlLabel disabled={secureSessionID !== null && title !== '' && title !== undefined && validSovereignPersonalDetailsTitle === true} value='Ms' control={<Radio size='small' />} label='Ms' key='Ms' />
            <FormControlLabel disabled={secureSessionID !== null && title !== '' && title !== undefined && validSovereignPersonalDetailsTitle === true} value='Other' control={<Radio size='small' />} label='Other' key='Other' />
          </RadioGroups>
          <AnimatePresence>
            {showOtherTitleField && (
              <motion.div {...varTitleFade}>
                <InputField name='preferredTitle' type='text' label='Preferred Title' onInputChange={handlePreferredTitle} control={control} hasTooltip={false} />
              </motion.div>
            )}
          </AnimatePresence>
          <InputField name='firstNames' label='First Name' type='text' control={control} onInputChange={handleFornames} hasTooltip={false} disabled={secureSessionID !== null && forenames !== '' && forenames !== undefined && validSovereignPersonalDetailsForenames === true} placeholder='First Name' hasStartAdornment={true} StartAdornmentIcon={<PersonRoundedIcon color='primary' />} />
          <InputField name='middleNames' label='Middle Names' type='text' control={control} onInputChange={handleMiddleNames} hasTooltip={false} disabled={false} placeholder='Middle Names' hasStartAdornment={true} StartAdornmentIcon={<PersonRoundedIcon color='primary' />} />
          <InputField name='lastName' label='Last Name' type='text' control={control} onInputChange={handleLastName} hasTooltip={false} disabled={secureSessionID !== null && lastName !== '' && lastName !== undefined && validSovereignPersonalDetailsSurname === true} placeholder='Last Name' hasStartAdornment={true} StartAdornmentIcon={<PersonRoundedIcon color='primary' />} />
          {/* <InputField name='otherNames' label='Other Names' type='text' control={control} onInputChange={handleOtherName} helperTextInput='Have you ever been know by another name?' hasTooltip={false} /> */}
          <RadioGroups id='gender' name='gender' onRadioChange={handleGender} control={control} label='Gender' value={gender} defaultValue={gender || ''} hasTooltip={false} row={true}>
            <FormControlLabel value='Male' disabled={secureSessionID !== null && gender !== '' && gender !== undefined && validSovereignPersonalDetailsGender === true} control={<Radio size='small' />} label='Male' key='Male' />
            <FormControlLabel value='Female' disabled={secureSessionID !== null && gender !== '' && gender !== undefined && validSovereignPersonalDetailsGender === true} control={<Radio size='small' />} label='Female' key='Female' />
            <FormControlLabel value='Other' disabled={secureSessionID !== null && gender !== '' && gender !== undefined && validSovereignPersonalDetailsGender === true} control={<Radio size='small' />} label='Other' key='Other' />
          </RadioGroups>
          <DatePicker id='dob' name='dob' onDateChange={handleDateofBirth} label='Date of Birth' control={control} format='DD/MM/YYYY' openTo='year' date={dob} minDate={minDateOfBirthFromToday} maxDate={dobDefDate} isRequired={true} disabled={secureSessionID !== null && dob !== '' && dob !== undefined && validSovereignPersonalDetailsDob === true} />

          <SelectMenu id='maritalStatus' name='maritalStatus' onSelectChange={handleMaritalStatus} label='Marital Status' control={control} menuItems={maritalStatusMenu} defualtValue={maritalStatus?.value} value={maritalStatus?.value} placeholder='Select Marital Status...' />
          <Stack direction='column' spacing={3} justifyContent='flex-start' alignItems='center' pt={2}>
            <LabelStyle>How many dependant children do you have?</LabelStyle>
            <Counter name='dependents' count={dependents} maxValue={50} onIncrementCount={incrementDependants} onDecrementCount={decrementDependants} />
          </Stack>
        </Stack>
      </Form>
    </>
  )
}

export default YourPersonalDetails

// <Button
// onClick={() => {
//   console.log('UTC - ', convertToUTCTimestamp(dob))
// }}
// >
// Click UTC
// </Button>
