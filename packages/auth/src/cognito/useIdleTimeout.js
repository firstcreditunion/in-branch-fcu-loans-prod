import { useContext, useState } from 'react'
import { useIdleTimer } from 'react-idle-timer'

import { LoginContext } from '../cognito/UserAccount'

const useIdleTimeout = ({ onIdle, idleTime = 1 }) => {
  const idleTimeout = 1000 * idleTime
  const [isIdle, setIdle] = useState(false)
  const { logout } = useContext(AuthContext)
  const handleIdle = () => {
    setIdle(true)
    logout()
  }
  const idleTimer = useIdleTimer({
    timeout: idleTimeout,
    promptTimeout: idleTimeout / 2,
    onPrompt: onIdle,
    onIdle: handleIdle,
    debounce: 500,
  })

  return {
    isIdle,
    setIdle,
    idleTimer,
  }
}

export default useIdleTimeout
