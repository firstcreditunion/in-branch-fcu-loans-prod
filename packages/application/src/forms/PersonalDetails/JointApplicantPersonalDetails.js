import React, { useEffect } from 'react'

//Framer
import { motion, AnimatePresence } from 'framer-motion'
import { varFade } from '../../components/ui/animate'

// RHF
import { useForm } from 'react-hook-form'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { yourPersonalDetailsActions } from '../../redux/slices/yourPersonalDetailsSlice'
import { fecthMartialStatus } from '../../redux/slices/yourPersonalDetailsSlice'

//Yup
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

//* MUI - Styles
import { styled } from '@mui/material/styles'

import Stack from '@mui/material/Stack'
import Radio from '@mui/material/Radio'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import FormControlLabel from '@mui/material/FormControlLabel'

// Custom Components
import Form from '../../components/Form'
import InputField from '../../components/rhf-components/Input'
import RadioGroups from '../../components/rhf-components/RadioGroups'
import DatePicker from '../../components/rhf-components/DatePicker'
import SelectMenu from '../../components/rhf-components/SelectMenu'
import Counter from '../../components/Counter'

//* MUI - Icons
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded'

import { maritalStatusMenu } from './Codes/PersonalDetailsCodes'

const dobUpperLimit = new Date().setFullYear(new Date().getFullYear() - 18)

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
}))

let startTime = null
window.dataLayer = window.dataLayer || []

const JointApplicantPersonalDetails = () => {
  const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(fecthMartialStatus())
  // }, [])
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))

  const jointtitle = useSelector((state) => state.yourPersonalDetailReducer.jointtitle)
  const jointpreferredTitle = useSelector((state) => state.yourPersonalDetailReducer.jointpreferredTitle)
  const jointforenames = useSelector((state) => state.yourPersonalDetailReducer.jointforenames)
  const jointMiddleNames = useSelector((state) => state.yourPersonalDetailReducer.jointMiddleNames)
  const jointlastName = useSelector((state) => state.yourPersonalDetailReducer.jointlastName)
  const jointotherNames = useSelector((state) => state.yourPersonalDetailReducer.jointotherNames)
  const jointgender = useSelector((state) => state.yourPersonalDetailReducer.jointgender)
  const jointdobDefDate = useSelector((state) => state.yourPersonalDetailReducer.jointdobDefDate)
  const jointdob = useSelector((state) => state.yourPersonalDetailReducer.jointdob)
  const jointmaritalStatus = useSelector((state) => state.yourPersonalDetailReducer.jointmaritalStatus)
  const jointshowOtherTitleField = useSelector((state) => state.yourPersonalDetailReducer.jointshowOtherTitleField)
  const jointdependents = useSelector((state) => state.yourPersonalDetailReducer.jointdependents)

  const onSubmitJointPersonalDetails = useSelector((state) => state.yourPersonalDetailReducer.onSubmitJointPersonalDetails)

  const schema = yup.object().shape({
    jointtitle: yup.string().required('Title is required'),
    jointpreferredTitle: yup
      .string()
      .when('jointtitle', { is: 'Other', then: yup.string().required('Your preferred title is required'), otherwise: yup.string().nullable() })
      .nullable(),
    jointfirstNames: yup
      .string()
      .required('First name(s) are required')
      .matches(/^([^0-9]*)$/, 'First name(s) should not contain numbers'),
    jointMiddleNames: yup.string().matches(/^([^0-9]*)$/, 'Middle name(s) should not contain numbers'),
    jointlastName: yup
      .string()
      .required('Last name is a required field')
      .matches(/^([^0-9]*)$/, 'Last name should not contain numbers'),
    jointotherNames: yup.string().matches(/^([^0-9]*)$/, 'Name should not contain numbers'),
    jointgender: yup
      .string()
      .required('Gender is required')
      .test('Gender Inconsistent with title', 'Gender is inconsistent with Title', function (gender) {
        if (gender === 'Male' && (jointtitle === 'Mrs' || jointtitle === 'Miss' || jointtitle === 'Ms')) {
          return false
        }
        if (gender === 'Female' && jointtitle === 'Mr') {
          return false
        }

        return true
      }),
    jointdob: yup
      .string()
      .required('Date of Birth is required')
      .test('cannot be lower than 1900', 'Invalid Date of Birth. Date Format: DD/MM/YYYY', function (dob) {
        if (dob === 'Invalid Date') {
          return false
        }

        return true
      })
      .test('cannot be lower than 1900', 'Must be born after 1900', function (dob) {
        if (dob === 'Invalid Date') {
          return false
        }

        if (new Date(dob).getFullYear() < 1900) {
          return false
        }

        return true
      })
      .test('Eighteen plus check', 'You must be at least 18 years old to apply', function (dob) {
        if (dob === 'Invalid Date') {
          return false
        }
        if (new Date(dob) > dobUpperLimit) {
          return false
        }

        return true
      })
      .nullable(),
    jointmaritalStatus: yup.string().required('Marital status is required'),
  })

  const varTitleFade = jointshowOtherTitleField
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
    formState: { errors, isValid },
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      jointtitle: jointtitle,
      jointpreferredTitle: jointpreferredTitle,
      jointfirstNames: jointforenames,
      jointMiddleNames: jointMiddleNames,
      jointlastName: jointlastName,
      jointotherNames: jointotherNames,
      jointgender: jointgender,
      jointdob: jointdob,
      jointdependents: jointdependents,
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    dispatch(yourPersonalDetailsActions.setIsValidJointPersonalDetails(isValid))
  }, [isValid])

  function onSubmit() {
    let endTime = new Date()
    let timeSpentMillis = endTime - startTime

    if (isValid) {
      window.dataLayer.push({
        event: 'joint_personal_detail_submit',
        time_elapsed: timeSpentMillis,
        form_name: 'Joint Your Personal Details',
      })
    }
    console.log('Submitted')
  }

  useEffect(() => {
    if (onSubmitJointPersonalDetails != null) {
      handleSubmit(onSubmit())()
    }
  }, [onSubmitJointPersonalDetails])

  useEffect(() => {
    startTime = new Date()
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [])

  const handleTitle = (event) => {
    dispatch(yourPersonalDetailsActions.setJointTitle(event.target.value))
    dispatch(yourPersonalDetailsActions.toggleJointOtherTitle(event.target.value))
  }
  const handlePreferredTitle = (event) => {
    dispatch(yourPersonalDetailsActions.setJointPreferredTitle(event.target.value))
  }

  const handleFornames = (event) => {
    dispatch(yourPersonalDetailsActions.setJointForenames(event.target.value))
  }

  const handleMiddleNames = (event) => {
    dispatch(yourPersonalDetailsActions.setJointMiddleNames(event.target.value))
  }

  const handleLastName = (event) => {
    dispatch(yourPersonalDetailsActions.setJointLastName(event.target.value))
  }

  const handleOtherName = (event) => {
    dispatch(yourPersonalDetailsActions.setJointOtherNames(event.target.value))
  }

  const handleGender = (event) => {
    dispatch(yourPersonalDetailsActions.setJointGender(event.target.value))
  }

  const handleDateofBirth = (date) => {
    dispatch(yourPersonalDetailsActions.setJointDob(date))
  }

  const handleMaritalStatus = (event) => {
    dispatch(
      yourPersonalDetailsActions.setJointMaritalStatus(
        maritalStatusMenu.find((maritalStatusMenu) => {
          return maritalStatusMenu.value === event.target.value
        })
      )
    )
  }

  const incrementDependants = () => {
    dispatch(yourPersonalDetailsActions.setJointDependents(jointdependents + 1))
  }

  const decrementDependants = () => {
    dispatch(yourPersonalDetailsActions.setJointDependents(jointdependents - 1))
  }

  return (
    <>
      <Form>
        <Stack direction='column' spacing={5} justifyContent='flex-start' sx={{ pt: downSm ? 5 : 3 }}>
          <RadioGroups id='jointtitle' name='jointtitle' label='Title' onRadioChange={handleTitle} control={control} value={jointtitle} defaultValue={jointtitle || ''} row={true}>
            <FormControlLabel value='Mr' control={<Radio size='small' />} label='Mr' key='Mr' />
            <FormControlLabel value='Mrs' control={<Radio size='small' />} label='Mrs' key='Mrs' />
            <FormControlLabel value='Miss' control={<Radio size='small' />} label='Miss' key='Miss' />
            <FormControlLabel value='Ms' control={<Radio size='small' />} label='Ms' key='Ms' />
            <FormControlLabel value='Other' control={<Radio size='small' />} label='Other' key='Other' />
          </RadioGroups>
          <AnimatePresence>
            {jointshowOtherTitleField && (
              <motion.div {...varTitleFade}>
                <InputField name='jointpreferredTitle' type='text' label='Preferred Title' onInputChange={handlePreferredTitle} control={control} hasTooltip={false} />
              </motion.div>
            )}
          </AnimatePresence>
          <InputField name='jointfirstNames' label='First Name' type='text' control={control} onInputChange={handleFornames} hasTooltip={false} placeholder='First Name' hasStartAdornment={true} StartAdornmentIcon={<PeopleRoundedIcon color='secondary' />} />
          <InputField name='jointMiddleNames' label='Middles Names' type='text' control={control} onInputChange={handleMiddleNames} hasTooltip={false} placeholder='Middle Names' hasStartAdornment={true} StartAdornmentIcon={<PeopleRoundedIcon color='secondary' />} />
          <InputField name='jointlastName' label='Last Name' type='text' control={control} onInputChange={handleLastName} hasTooltip={false} placeholder='Surname' hasStartAdornment={true} StartAdornmentIcon={<PeopleRoundedIcon color='secondary' />} />
          {/* <InputField name='jointotherNames' label='Other Names' type='text' control={control} onInputChange={handleLastName} helperTextInput='Have you ever been know by another name?' hasTooltip={false} /> */}
          <RadioGroups id='jointgender' name='jointgender' onRadioChange={handleGender} control={control} label='Gender' value={jointgender} defaultValue={jointgender || ''} hasTooltip={false} row={true}>
            <FormControlLabel value='Male' control={<Radio size='small' />} label='Male' key='Male' />
            <FormControlLabel value='Female' control={<Radio size='small' />} label='Female' key='Female' />
            <FormControlLabel value='Other' control={<Radio size='small' />} label='Other' key='Other' />
          </RadioGroups>
          <DatePicker id='jointdob' name='jointdob' onDateChange={handleDateofBirth} label='Date of Birth' control={control} format='DD/MM/YYYY' variant='outlined' openTo='year' date={jointdob} maxDate={jointdobDefDate} />
          <SelectMenu id='jointmaritalStatus' name='jointmaritalStatus' onSelectChange={handleMaritalStatus} label='Marital Status' value={jointmaritalStatus?.value} control={control} menuItems={maritalStatusMenu} defualtValue={jointmaritalStatus?.value} />
          <Stack direction='column' spacing={3} justifyContent='flex-start' alignItems='center' pt={2}>
            <LabelStyle>How many dependant children do you have?</LabelStyle>
            <Counter name='jointdependents' count={jointdependents} maxValue={50} onIncrementCount={incrementDependants} onDecrementCount={decrementDependants} />
          </Stack>
        </Stack>
      </Form>
    </>
  )
}

export default JointApplicantPersonalDetails
