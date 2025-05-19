import React, { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Loading from './domains/common/components/Loading'

// Import pages
import Home from './domains/capsule/pages/Home'
import Splash from './domains/common/pages/Splash'
import Signup from './domains/auth/pages/Signup'
import Login from './domains/auth/pages/Login'
import WriteCapsule from './domains/capsule/pages/WriteCapsule'

const router = createBrowserRouter([
  { path: '/', element: <Splash /> },
  { path: '/signup', element: <Signup /> },
  { path: '/login', element: <Login /> },
  { path: '/:userType/capsule-box/:jarId', element: <Home /> },
  {
    path: '/:userType/write/:jarId/:writeType/:step',
    element: <WriteCapsule />,
  },
])

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default AppRoutes
