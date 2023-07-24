import React from 'react'
import ReactDOM from 'react-dom'

import { createMemoryHistory, createBrowserHistory } from 'history'
import { HelmetProvider } from 'react-helmet-async'

import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store'

// Mount funcion to start up the app
const mount = (el, { onNavigate, defaultHistory, initialPath, cognitoToken, sovereignUser }) => {
  // uses Default history in isolation mode. Uses createMemoryHistory in production mode
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    })
  if (onNavigate) {
    history.listen(onNavigate)
  }

  ReactDOM.render(
    <HelmetProvider>
      <Provider store={store}>
        <App history={history} cognitoToken={cognitoToken} sovereignUser={sovereignUser} />
      </Provider>
    </HelmetProvider>,
    el
  )

  return {
    // When you call history.listen in container, it return the location. This is accepted onNavigate and passed on to the memory history
    // the location object has pathname wich we are interested in
    onParentNavigate({ pathname: nextPathname }) {
      // Get current loacation
      const { pathname } = history.location

      // If current loacation is not same as new location then update
      if (pathname !== nextPathname) {
        history.push(nextPathname)
      }
    },
  }
}

// If we are in development and in isolation, call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_memberonly-application-root')

  // Passing browser history instance to mount function if dev mode
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() })
  }
}

// if we are in running through container. we should export the mount function
export { mount }
