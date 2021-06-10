import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom'
import axios from 'axios'
import { useApp } from './logic/hook/useApp'
import getRoutes from './routes'

const App = () => {
  const { isSignedIn, token } = useApp()

  axios.defaults.baseURL = API_ENDPOINT
  axios.defaults.headers.common['Authorization'] = token
    ? `Bearer ${token}`
    : ''
  axios.defaults.headers.common['Content-Type'] =
    'application/json'
  axios.defaults.headers.common['x-api-version'] = '1.1'

  const routes = getRoutes({ isSignedIn })

  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route, key) => (
          <Route
            key={key}
            exact={!!route.exact}
            path={route.path}
            component={route.component}
          />
        ))}
      </Switch>
    </BrowserRouter>
  )
}

export default App
