import React, { useContext } from 'react'

import { AuthContext } from './AwsCongnitoContext'

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  console.log('Context - ', context)

  if (!context) throw new Error('useAuthContext context must be use inside AuthProvider')

  return context
}
