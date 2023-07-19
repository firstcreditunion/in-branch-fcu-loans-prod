import React from 'react'

//* Redux
import { useSelector } from 'react-redux'

//* RHF
import { useFormContext } from 'react-hook-form'

//* MUI
import { useTheme } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Portal from '@mui/material/Portal'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'

import WarningIcon from '@mui/icons-material/Warning'
import CheckIcon from '@mui/icons-material/Check'
import ErrorIcon from '@mui/icons-material/Error'

import Expand from '../../components/ExpandMore'

// Custom Theme Manipulation
import { bgBlur } from '../../theme/customCSS'

import useResponsive from '../../hooks/useResponsive'

import { fCurrency } from '../../utils/formatNumber'
import { fNumberCust } from '../../utils/formatNumber'

export default function PreviewLoanDetailsPortal() {
  const theme = useTheme()

  const mdUp = useResponsive('up', 'md')

  // Redux Selectors
  const requestedLoanAmount = useSelector((state) => state.loanDetailsReducer.requestedLoanAmount)

  const existingLoan = useSelector((state) => state.loanDetailsReducer.existingLoan)
  const feeCharged = useSelector((state) => state.loanCalculatorReducer.feeCharged)
  const applicationFee = useSelector((state) => state.loanDetailsReducer.applicationFee)
  const creditReportAndDocusign = useSelector((state) => state.loanDetailsReducer.creditReportAndDocusign)

  //* Redux Selectors for PRIME-BORROWERS
  const primes6Balance = useSelector((state) => state.clientSearchReducer.primeFunding.s6Balance)
  const primeFndActiveAccounts = useSelector((state) => state.clientSearchReducer.primeFunding.activeAccountCount)
  const primeFndSettledAccounts = useSelector((state) => state.clientSearchReducer.primeFunding.settledAccountCount)

  const primetotalExposure = useSelector((state) => state.clientSearchReducer.primeLending.totalExposure)
  const primetotalArrears = useSelector((state) => state.clientSearchReducer.primeLending.totalArrears)
  const primeactiveLendingAccountCount = useSelector((state) => state.clientSearchReducer.primeLending.activeAccountCount)
  const primesettledLendingAccountCount = useSelector((state) => state.clientSearchReducer.primeLending.settledAccountCount)

  const primeactiveRecvCount = useSelector((state) => state.clientSearchReducer.primeRecovery.activeAccountCount)
  const primesettledRecvCount = useSelector((state) => state.clientSearchReducer.primeRecovery.inactiveAccountCount)
  const primeRecvBalance = useSelector((state) => state.clientSearchReducer.primeRecovery.balance)

  //* Redux Selectors for CO-BORROWERS
  const joints6Balance = useSelector((state) => state.clientSearchReducer.jointFunding.s6Balance)
  const jointtotalExposure = useSelector((state) => state.clientSearchReducer.jointLending.totalExposure)
  const jointtotalArrears = useSelector((state) => state.clientSearchReducer.jointLending.totalArrears)
  const jointactiveLendingAccountCount = useSelector((state) => state.clientSearchReducer.jointLending.activeAccountCount)
  const jointsettledLendingAccountCount = useSelector((state) => state.clientSearchReducer.jointLending.settledAccountCount)
  const jointactiveRecvCount = useSelector((state) => state.clientSearchReducer.jointRecovery.activeAccountCount)
  const jointsettledRecvCount = useSelector((state) => state.clientSearchReducer.jointRecovery.inactiveAccountCount)
  const jointRecvBalance = useSelector((state) => state.clientSearchReducer.jointRecovery.balance)

  const totalLoanExposureUpperLimit = useSelector((state) => state.clientSearchReducer.totalLoanExposureUpperLimit)

  //* Totals for Assosiated Members
  const totalS6Balance = primes6Balance + joints6Balance
  const totalExposure = primetotalExposure + jointtotalExposure
  const totalArrears = primetotalArrears + jointtotalArrears
  const totalActiveLendingAccounts = primeactiveLendingAccountCount + jointactiveLendingAccountCount
  const totalSettledLendingAccounts = primesettledLendingAccountCount + jointsettledLendingAccountCount

  const totalActiveRecvCount = primeactiveRecvCount + jointactiveRecvCount
  const totalSettledRecvCount = primesettledRecvCount + jointsettledRecvCount
  const totalrecoveryBalance = primeRecvBalance + jointRecvBalance

  var newLoanAmount = requestedLoanAmount + totalExposure + feeCharged

  const isLoanOverMaxTotalExposure = totalExposure > totalLoanExposureUpperLimit

  //* Interest Rate Details
  const primeIreEstimate = useSelector((state) => state.clientSearchReducer.primeIreEstimate)

  if (!mdUp) {
    return null
  }

  return (
    <Portal>
      <Stack
        sx={{
          p: 3,
          top: 0,
          right: 0,
          height: 1,
          width: 380,
          position: 'fixed',
          overflowX: 'auto',
          color: 'common.white',
          zIndex: theme.zIndex.drawer,
          ...bgBlur({ color: theme.palette.grey[900] }),
        }}
      >
        <Typography variant='button' sx={{ color: 'secondary.light', my: 0.5, textTransform: 'uppercase', fontWeight: 'light', letterSpacing: 1 }}>
          Loan Summary
        </Typography>
        <Divider sx={{ my: 0.5 }} />
        <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={2} sx={{ width: '100%', pb: 5 }}>
          <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={1} sx={{ width: '100%' }}>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
              <Typography variant='subtitle2' sx={{ fontWeight: 'light' }}>
                Existing Loan
              </Typography>
              <Typography variant='subtitle2'>{fCurrency(primetotalExposure + jointtotalExposure)}</Typography>
            </Stack>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
              <Typography variant='subtitle2' sx={{ fontWeight: 'light' }}>
                Approved Loan
              </Typography>
              <Typography variant='subtitle2'>{fCurrency(requestedLoanAmount)}</Typography>
            </Stack>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
              <Typography variant='subtitle2' sx={{ fontWeight: 'light' }}>
                Application Fee
              </Typography>
              <Typography variant='subtitle2'>{fCurrency(feeCharged)}</Typography>
            </Stack>
            {/* <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
              <Typography variant='subtitle2' sx={{ fontWeight: 'light' }}>
                Credit Report / Docusign
              </Typography>
              <Typography variant='subtitle2'>{fCurrency(5.0)}</Typography>
            </Stack> */}
            <Divider sx={{ color: 'common.white', mt: 1, width: '100%' }} />
          </Stack>
          <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
            <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
              New Loan Total
            </Typography>
            <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
              {fCurrency(newLoanAmount)}
            </Typography>
          </Stack>
        </Stack>
        {/* <Typography variant='h6' sx={{ color: 'secondary.light', my: 0.5, textTransform: 'uppercase', fontWeight: 'light', letterSpacing: 1 }}>
          Repayment Summary
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={3} sx={{ width: '100%', pb: 5 }}>
          <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={1} sx={{ width: '100%' }}>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
              <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                Minimum Repayment
              </Typography>
              <Typography>{fCurrency(10)}</Typography>
            </Stack>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
              <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                Repayment Amount
              </Typography>
              <Typography>{fCurrency(15)}</Typography>
            </Stack>
          </Stack>
        </Stack> */}
        <Typography variant='button' sx={{ color: 'secondary.light', my: 0.5, textTransform: 'uppercase', fontWeight: 'light', letterSpacing: 1 }}>
          Checks
        </Typography>
        <Divider sx={{ my: 0.5 }} />
        <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={2} sx={{ width: '100%', pb: 5 }}>
          <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={1} sx={{ width: '100%' }}>
            <Typography variant='overline' sx={{ color: 'primary.lighter' }}>
              Funding
            </Typography>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
              <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                S6 Balance
              </Typography>
              <Typography variant='subtitle2'>{fCurrency(totalS6Balance)}</Typography>
            </Stack>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
              <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                Active Accounts
              </Typography>
              <Typography variant='subtitle2'>{primeFndActiveAccounts}</Typography>
            </Stack>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
              <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                Settled Accounts
              </Typography>
              <Typography variant='subtitle2'>{primeFndSettledAccounts}</Typography>
            </Stack>
            <Divider sx={{ color: 'common.white', mt: 1, width: '100%' }} />
          </Stack>
          <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={1} sx={{ width: '100%' }}>
            <Typography variant='overline' sx={{ color: 'primary.lighter' }}>
              Lending
            </Typography>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
              <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={1}>
                <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                  Exposure
                </Typography>
                {isLoanOverMaxTotalExposure > 0 && (
                  <Tooltip title={`Total Exposure for both members are over ${fCurrency(totalLoanExposureUpperLimit)}`}>
                    <ErrorIcon fontSize='small' color='error' />
                  </Tooltip>
                )}
              </Stack>
              <Typography variant='subtitle2'>{fCurrency(totalExposure)}</Typography>
            </Stack>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
              <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={1}>
                <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                  Arrears Balance
                </Typography>
                {totalArrears > 0 && (
                  <Tooltip title='One or both members are in arrears'>
                    <WarningIcon fontSize='small' color='warning' />
                  </Tooltip>
                )}
              </Stack>
              <Typography variant='subtitle2'>{fCurrency(totalArrears)}</Typography>
            </Stack>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
              <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                Active Accounts
              </Typography>
              <Typography variant='subtitle2'>{totalActiveLendingAccounts}</Typography>
            </Stack>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
              <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                Settled Accounts
              </Typography>
              <Typography variant='subtitle2'>{totalSettledLendingAccounts}</Typography>
            </Stack>
            <Divider sx={{ color: 'common.white', mt: 1, width: '100%' }} />
          </Stack>
          <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={1} sx={{ width: '100%' }}>
            <Typography variant='overline' sx={{ color: 'primary.lighter' }}>
              Recovery
            </Typography>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
              <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={1}>
                <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                  Recovery Balance
                </Typography>
                {totalrecoveryBalance > 0 && (
                  <Tooltip title='Member has an active recovery account'>
                    <WarningIcon fontSize='small' color='warning' />
                  </Tooltip>
                )}
              </Stack>
              <Typography variant='subtitle2'>{fCurrency(totalrecoveryBalance)}</Typography>
            </Stack>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
              <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={1}>
                <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                  Active Accounts
                </Typography>
                {totalActiveRecvCount > 0 && (
                  <Tooltip title='Member has an active recovery account'>
                    <WarningIcon fontSize='small' color='warning' />
                  </Tooltip>
                )}
              </Stack>
              <Typography variant='subtitle2'>{totalActiveRecvCount}</Typography>
            </Stack>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
              <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={1}>
                <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                  Inactive Accounts
                </Typography>
                {totalSettledRecvCount > 0 && (
                  <Tooltip title='Member had recovery accounts'>
                    <WarningIcon fontSize='small' color='warning' />
                  </Tooltip>
                )}
              </Stack>
              <Typography variant='subtitle2'>{totalSettledRecvCount}</Typography>
            </Stack>

            {/* <Divider sx={{ color: 'common.white', mt: 1, width: '100%' }} /> */}
          </Stack>
        </Stack>

        <Typography
          variant='button'
          sx={{
            color: 'secondary.light',
            my: 0.5,
            textTransform: 'uppercase',
            fontWeight: 'light',
            letterSpacing: 1,
          }}
        >
          Interest Rate Establishment
        </Typography>
        <Divider
          sx={{
            my: 0.5,
          }}
        />
        <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={1} sx={{ width: '100%', pb: 5 }}>
          <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
            <Typography
              variant='body1'
              sx={{
                fontWeight: 'light',
              }}
            >
              Base Rate
            </Typography>
            <Typography variant='subtitle2'>{primeIreEstimate?.baseRate}% p.a.</Typography>
          </Stack>
          <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
            <Typography variant='body1' sx={{ fontWeight: 'light' }}>
              History Discount
            </Typography>
            <Typography variant='subtitle2'>{!(primeIreEstimate?.discounts?.history == null) ? fNumberCust(primeIreEstimate?.discounts?.history) : ''}</Typography>
          </Stack>
          <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
            <Typography variant='body1' sx={{ fontWeight: 'light' }}>
              Loyalty Discount
            </Typography>
            <Typography variant='subtitle2'>{!(primeIreEstimate?.discounts?.loyalty == null) ? fNumberCust(primeIreEstimate?.discounts?.loyalty) : ''}</Typography>
          </Stack>
          <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
            <Typography variant='body1' sx={{ fontWeight: 'light' }}>
              Products Discounts
            </Typography>
            <Typography variant='subtitle2'>{!(primeIreEstimate?.discounts?.products == null) ? fNumberCust(primeIreEstimate?.discounts?.products) : ''}</Typography>
          </Stack>
          <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
            <Typography variant='body1' sx={{ fontWeight: 'light' }}>
              Security
            </Typography>
            <Typography variant='subtitle2'>{!(primeIreEstimate?.security?.value == null) ? fNumberCust(primeIreEstimate?.security?.value) : ''}</Typography>
          </Stack>
          <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
            <Typography variant='body1' sx={{ fontWeight: 'light' }}>
              Credit History
            </Typography>
            <Typography variant='subtitle2'>{!(primeIreEstimate?.creditHistory == null) ? fNumberCust(primeIreEstimate?.creditHistory) : ''}</Typography>
          </Stack>
          <Divider flexItem />
          <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
            <Typography variant='body1' sx={{ fontWeight: 'light' }}>
              Final Interest Rate
            </Typography>
            <Typography variant='subtitle2'>{!(primeIreEstimate?.estimatedInterestRate == null) ? fNumberCust(primeIreEstimate?.estimatedInterestRate) : ''} % p.a.</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Portal>
  )
}
