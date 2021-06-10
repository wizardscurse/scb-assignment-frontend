import React from 'react'
import { Redirect } from 'react-router-dom'
import HomeView from './views/home'
import SignInView from './views/authen/signIn'
import SignUpView from './views/authen/signUp'
import CreateView from './views/create'
import UpdateView from './views/update'
import DetailView from './views/detail'

const RedirectToSignIn = () => <Redirect to="/signin" />
const RedirectToIndex = () => <Redirect to="/" />

const authenticatedComponent = (
  isSignedIn,
  mainComponent,
  fallbackComponent,
) => {
  if (isSignedIn) {
    return mainComponent
  }

  return (
    fallbackComponent ||
    function () {
      return null
    }
  )
}

export default ({ isSignedIn }) => [
  {
    path: '/signup',
    exact: true,
    component: authenticatedComponent(
      isSignedIn,
      RedirectToIndex,
      SignUpView,
    ),
  },
  {
    path: '/signin',
    exact: true,
    component: authenticatedComponent(
      isSignedIn,
      RedirectToIndex,
      SignInView,
    ),
  },
  {
    path: '/create',
    exact: true,
    component: authenticatedComponent(
      isSignedIn,
      CreateView,
      RedirectToSignIn,
    ),
  },
  {
    path: '/update/:id',
    exact: true,
    component: authenticatedComponent(
      isSignedIn,
      UpdateView,
      RedirectToSignIn,
    ),
  },
  {
    path: '/:id',
    exact: true,
    component: authenticatedComponent(
      isSignedIn,
      DetailView,
      RedirectToSignIn,
    ),
  },
  {
    path: '/',
    exact: true,
    component: authenticatedComponent(
      isSignedIn,
      HomeView,
      RedirectToSignIn,
    ),
  },
  {
    component: () => <div>not found</div>,
  },
]
