import React, { Suspense, lazy, useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch, Router, useLocation } from 'react-router-dom'

import { createBrowserHistory } from 'history'
import { useDispatch, useSelector } from 'react-redux'

import { globalActions } from '../redux/slices/globalSlice'

import { Box } from '@mui/material'
import Fab from '@mui/material/Fab'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Zoom from '@mui/material/Zoom'
import Slide from '@mui/material/Slide'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import useMediaQuery from '@mui/material/useMediaQuery'

import LoadingScreen from '../components/LoadingScreen'
import SplashScreen from '../components/SplashScreen'
import Header from '../components/Header'
import Footer from '../layouts/MainFooter'

// const ROOT_AUTH = '/auth'
const ROOT_AUTHENTICATION = '/'
const ROOT_APPLICATION = '/application'
const ROOT_MEMBERONLYLOAN = '/memberonlyloan'
const ROOT_LOANCALCULATOR = '/loanCalculator'

const LoanCalculator = lazy(() => import('../components/LoanCalculator'))
const Authentication = lazy(() => import('../components/AuthenticationApp'))
const MemberOnlyLoanApplication = lazy(() => import('../components/MemberOnlyApplicationApp'))

import LoanPrerequisites from '../sections/LoanPrerequisites'

const history = createBrowserHistory()

function ScrollTop(props) {
  const { children, window } = props
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 10,
  })

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#_firstloan-container')

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'center',
      })
    }
  }

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role='presentation'
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
      >
        {children}
      </Box>
    </Zoom>
  )
}

export default function RouterMain(props) {
  const [memberInstance, setMemberInstance] = useState(null)
  const dispatch = useDispatch()
  const downLg = useMediaQuery((theme) => theme.breakpoints.down('lg'))

  const [appTheme, setAppTheme] = useState('light')
  const [loanAmount, setLoanAmount] = useState(3000)
  const [interestRate, setInterestRate] = useState(12.5)
  const [term, setTerm] = useState(36)
  const [paymentFrequency, setPaymentFrequency] = useState('W')

  const [cognitoToken, setCognitoToken] = useState(null)
  const [sovereignUser, setSovereignUser] = useState(null)
  const [expiryTime, setExpiryTime] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)

  // * Loan Cost Recovery Fee useStates
  const [creditCheck, setcreditCheck] = useState(4.6)
  const [creditSense, setcreditSense] = useState(3.8)
  const [motorWebCheck, setmotorWebCheck] = useState(4.8)
  const [ppsrRegistration, setppsrRegistration] = useState(8.05)
  const [docuSignSigning, setdocuSignSigning] = useState(5.32)
  const [cloudCheckIdVerification, setcloudCheckIdVerification] = useState(3.0)
  const [cloudCheckPEP, setcloudCheckPEP] = useState(0.25)

  //* LPI useStates
  const [hasLpiPrimeDeath, sethasLpiPrimeDeath] = useState(false)
  const [hasLpiPrimeDisability, sethasLpiPrimeDisability] = useState(false)
  const [hasLpiPrimeCriticalIllness, sethasLpiPrimeCriticalIllness] = useState(false)
  const [hasLpiPrimeBankruptcy, sethasLpiPrimeBankruptcy] = useState(false)
  const [awsCalculatedLpiAmount, setawsCalculatedLpiAmount] = useState(0)

  const themeMode = useSelector((state) => state.globalReducer.themeMode)
  const secureLoginSessionResposneStatus = useSelector((state) => state.globalReducer.secureLoginSessionResposneStatus)

  useEffect(() => {
    dispatch(globalActions.setSigninInstance(memberInstance))
    if (memberInstance?.data?.status === 200) {
      dispatch(globalActions.setSecureSessionID(memberInstance?.data?.SID))
      dispatch(globalActions.setSecureSessionExpiry(memberInstance?.data?.expires_in))
      dispatch(globalActions.setSecureLoginSessionResposneStatus(memberInstance?.data?.status))
    }
  }, [memberInstance])

  return (
    <BrowserRouter history={history}>
      <Suspense fallback={<LoadingScreen />}>
        <Switch>
          <Route path={ROOT_LOANCALCULATOR}>
            <LoanCalculator onLoanAmountChange={setLoanAmount} onInterestChange={setInterestRate} onTermChange={setTerm} onPaymentFrequencyChange={setPaymentFrequency} setCreditSense={setcreditSense} setCreditCheck={setcreditCheck} setMotorwebCheck={setmotorWebCheck} setPPSR={setppsrRegistration} setDocusign={setdocuSignSigning} setCloudCheckId={setcloudCheckIdVerification} setCloudCheckPEP={setcloudCheckPEP} sethasLpiPrimeDeath={sethasLpiPrimeDeath} sethasLpiPrimeDisability={sethasLpiPrimeDisability} sethasLpiPrimeCriticalIllness={sethasLpiPrimeCriticalIllness} sethasLpiPrimeBankruptcy={sethasLpiPrimeBankruptcy} setLPIUpfrontFee={setawsCalculatedLpiAmount} />
          </Route>
          <Route path={ROOT_MEMBERONLYLOAN}>
            <MemberOnlyLoanApplication cognitoToken={cognitoToken} sovereignUser={sovereignUser} expiryTime={expiryTime} refreshToken={refreshToken} />
          </Route>
          <Route path={ROOT_AUTHENTICATION}>
            <Authentication setCognitoToken={setCognitoToken} setSovereignUser={setSovereignUser} setExpiryTime={setExpiryTime} setRefreshToken={setRefreshToken} />
          </Route>
        </Switch>
      </Suspense>
      <ScrollTop {...props}>
        <Fab color='secondary' size='small' aria-label='scroll back to top'>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </BrowserRouter>
  )
}
// git control 1
