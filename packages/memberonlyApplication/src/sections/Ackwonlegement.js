import React, { useEffect, useState } from 'react'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { authorisationActions } from '../redux/slices/authorisationSlice'
import { sopExpenseAction } from '../redux/slices/sopExpenseSlice'

import useMediaQuery from '@mui/material/useMediaQuery'
import { Typography, Alert, AlertTitle, Stack, Divider, Snackbar } from '@mui/material'

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import CheckIcon from '@mui/icons-material/Check'

// List MUI
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'

//Other MUI
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import CommentIcon from '@mui/icons-material/Comment'
import { Box } from '@mui/material'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'

import Slide from '@mui/material/Slide'

export default function Authorisation() {
  const [open, setOpen] = useState(false)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const dispatch = useDispatch()
  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  const declarationObject = useSelector((state) => state.authorisationReducer.declarationItems)

  const onSubmitPrivacyActDeclaration = useSelector((state) => state.authorisationReducer.onSubmitPrivacyActDeclaration)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [])

  const [openAuthorise, setOpenAuthorise] = useState(true)

  function SlideTransition(props) {
    return <Slide {...props} direction='up' />
  }

  const [openDeclCompletionAlert, setOpenDeclCompletionAlert] = useState({
    open: false,
    Transition: SlideTransition,
  })

  const handleDeclCompletionAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenDeclCompletionAlert({
      ...openDeclCompletionAlert,
      open: false,
    })
  }

  const declarationItems = Object.values(declarationObject)

  // console.log('declarationItems: ', declarationItems)

  const handleChange = (index, accept) => (event) => {
    if (index === 0) {
      dispatch(authorisationActions.setAcceptCreditWorthiness(!accept))
      return
    }
    if (index === 1) {
      dispatch(authorisationActions.setAcceptAuthoriseFCU(!accept))
      return
    }
    if (index === 2) {
      dispatch(authorisationActions.setAcceptTrueInformation(!accept))
      return
    }
    if (index === 3) {
      dispatch(authorisationActions.setAcceptAmlCftObligations(!accept))
      return
    }
    if (index === 4) {
      dispatch(authorisationActions.setAcceptStorePersonalInfo(!accept))
      return
    }
  }

  const handleChildren = (index, openChildren) => {
    if (index === 0) {
      dispatch(authorisationActions.setOpenChildrenCreditWorthiness(!openChildren))
      return
    }
    if (index === 1) {
      dispatch(authorisationActions.setOpenChildrenAuthoriseFCU(!openChildren))
      return
    }
    if (index === 2) {
      dispatch(authorisationActions.setOpenChildrenTrueInformation(!openChildren))
      return
    }
    if (index === 3) {
      dispatch(authorisationActions.setOpenChildrenAmlCftObligations(!openChildren))
      return
    }
    if (index === 4) {
      dispatch(authorisationActions.setOpenChildrenStorePersonalInfo(!openChildren))
      return
    }
  }

  useEffect(() => {
    if (declarationObject.CreditWorthiness.accept && declarationObject.AuthoriseFCU.accept && declarationObject.TrueInformation.accept && declarationObject.AmlCftObligations.accept && declarationObject.StorePersonalInfo.accept) {
      dispatch(authorisationActions.setIsValidPrivacyActDeclaration(true))
      // let endTime = new Date()
      // let timeSpentMillis = endTime - startTime

      // window.dataLayer.push({
      //   event: 'privacy_declaration_submit',
      //   time_elapsed: timeSpentMillis,
      //   form_name: 'Privacy Declaration',
      // })

      return
    }
    dispatch(authorisationActions.setIsValidPrivacyActDeclaration(false))
  }, [declarationObject.CreditWorthiness.accept, declarationObject.AuthoriseFCU.accept, declarationObject.TrueInformation.accept, declarationObject.AmlCftObligations.accept, declarationObject.StorePersonalInfo.accept])

  useEffect(() => {
    if (declarationObject.CreditWorthiness.accept && declarationObject.AuthoriseFCU.accept && declarationObject.TrueInformation.accept && declarationObject.AmlCftObligations.accept && declarationObject.StorePersonalInfo.accept) {
      setOpen(false)
      return
    }

    if (onSubmitPrivacyActDeclaration == null) return
    setOpen(true)
  }, [onSubmitPrivacyActDeclaration])

  function onSubmit() {
    // console.log('Privacy Declaration Submitted')
  }

  return (
    <Stack direction='column' spacing={3} sx={{ width: '100%' }}>
      <Stack direction='column' alignItems='center' justifyContent='center' spacing={1}>
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
          Privacy Declaration
        </Typography>
        <Typography variant='subtitle2' sx={{ color: 'text.secondary', fontWeight: 'light' }}>
          Authorisation by Applicant for use and disclosure of information.
        </Typography>
      </Stack>
      <Box>
        <List
          sx={{ width: '100%', bgcolor: 'background.paper' }}
          subheader={
            <ListSubheader disableGutters={true} sx={{ my: 2 }}>
              <Stack direction='column' spacing={1}>
                <Typography variant='body1' sx={{ textTransform: 'uppercse' }}>
                  Pursuant to the Privacy Act 2020:
                </Typography>
              </Stack>
            </ListSubheader>
          }
        >
          {declarationItems.map((item) => {
            const labelId = `checkbox-list-label-${item.title.key}`
            return (
              <>
                <Box sx={{ display: 'flex', pb: item.openChildren === 1 ? 2 : 0 }}>
                  <ListItem
                    key={item.index}
                    divider={true}
                    disablePadding
                    sx={{ pb: 0 }}
                    secondaryAction={
                      <IconButton edge='end' aria-label='delete' onClick={() => handleChildren(item.index, item.openChildren)}>
                        {item.children.length > 0 && (
                          <KeyboardArrowDownRoundedIcon
                            sx={{
                              transform: item.openChildren ? 'rotate(-180deg)' : 'rotate(0)',
                              transition: '0.2s',
                            }}
                          />
                        )}
                      </IconButton>
                    }
                  >
                    <Stack direction='column' justifyContent='flex-start' alignItems='stretch' alignContent='stretch' spacing={1} sx={{ width: '100%', pb: item.openChildren ? 2 : 0 }}>
                      <ListItemButton
                        alignItems='center'
                        disableRipple={true}
                        sx={{
                          width: '100%',
                          px: downSm ? 0 : 3,
                          py: item.openChildren ? 1 : 2,
                          '&:hover, &:focus': { '& svg': { opacity: item.openChildren ? 1 : 1 } },
                        }}
                      >
                        <Stack direction='row' justifyContent='space-between' alignItems='center'>
                          <ListItemIcon>
                            <Checkbox
                              edge='start'
                              checked={item.accept}
                              onChange={handleChange(item.index, item.accept)}
                              disableRipple
                              inputProps={{
                                'aria-labelledby': labelId,
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            id={labelId}
                            primary={item.header}
                            primaryTypographyProps={{
                              variant: downSm ? 'caption' : 'subtitle1',
                              fontWeight: downSm ? 500 : 700,
                            }}
                            sx={{ pr: 3 }}
                          />
                        </Stack>
                      </ListItemButton>
                      {item.openChildren &&
                        item.children.map((child) => (
                          <ListItemText
                            secondary={child}
                            secondaryTypographyProps={{
                              variant: downSm ? 'caption' : 'body2',
                            }}
                            sx={{ pl: downSm ? 6 : 9, pr: 5 }}
                          />
                        ))}
                    </Stack>
                  </ListItem>
                </Box>
                {/* <Divider /> */}
              </>
            )
          })}
        </List>
        <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={6000} onClose={handleClose}>
          <Alert variant='filled' onClose={handleClose} severity='error' sx={{ width: '100%' }}>
            Please make sure that the privacy declaration items are ticked!
          </Alert>
        </Snackbar>
      </Box>
    </Stack>
  )
}
