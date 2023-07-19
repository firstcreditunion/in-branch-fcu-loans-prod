import { mount } from 'auth/AuthApp'
import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default () => {
  const ref = useRef(null)
  const history = useHistory()
  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location

        if (pathname !== nextPathname) {
          history.push(nextPathname)
        }
      },
    })

    // A change in browser history is communicated down to sub app by calling onParentNavigate.
    // History.listen sends the current location down to sub app through onParentNavigate.
    history.listen(onParentNavigate)
  }, [])

  return <div ref={ref} />
}

// git control 1
