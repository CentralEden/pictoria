import { Routes, Route } from 'react-router-dom'
import BaseTemplate from '@/templates/BaseTemplate'

import Home from '@/pages/Home'
import Profile from '@/pages/Profile'
import NotFound from '@/pages/NotFound'


const routeConfig = [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/profile',
      element: <Profile />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ] as const

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<BaseTemplate />}>
        {routeConfig.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Route>
    </Routes>
  )
}

export default AppRoutes
