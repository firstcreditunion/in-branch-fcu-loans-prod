import { mount } from 'loanCalculator/LoanCalculatorApp'
import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default function ({ onLoanAmountChange, onInterestChange, onTermChange, onPaymentFrequencyChange, setCreditSense, setCreditCheck, setMotorwebCheck, setPPSR, setDocusign, setCloudCheckId, setCloudCheckPEP, sethasLpiPrimeDeath, sethasLpiPrimeDisability, sethasLpiPrimeCriticalIllness, sethasLpiPrimeBankruptcy, setLPIUpfrontFee }) {
  const ref = useRef(null)
  const history = useHistory()

  // Call the useEffect only on first instance
  useEffect(() => {
    // the micro app returns parentNavigate object.
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location

        if (pathname !== nextPathname) {
          history.push(nextPathname)
        }
      },
      onLoanAmountChange,
      onInterestChange,
      onTermChange,
      onPaymentFrequencyChange,
      setCreditSense,
      setCreditCheck,
      setMotorwebCheck,
      setPPSR,
      setDocusign,
      setCloudCheckId,
      setCloudCheckPEP,
      sethasLpiPrimeDeath,
      sethasLpiPrimeDisability,
      sethasLpiPrimeCriticalIllness,
      sethasLpiPrimeBankruptcy,
      setLPIUpfrontFee,
    })

    // A change in browser history is communicated down to sub app by calling onParentNavigate.
    // History.listen sends the current location down to sub app through onParentNavigate.
    history.listen(onParentNavigate)
  }, [])

  return <div ref={ref} />
}

// git control 1
