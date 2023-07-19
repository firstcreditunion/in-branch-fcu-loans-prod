import React from 'react'
import PropTypes from 'prop-types'
// form
import { FormProvider as Form } from 'react-hook-form'

// ----------------------------------------------------------------------

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
  methods: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
}

export default function FormProvider({ children, onSubmit, methods, ...props }) {
  return (
    <Form {...methods}>
      <form noValidate autoComplete='off' onSubmit={onSubmit} {...props} width='100%'>
        {children}
      </form>
    </Form>
  )
}
