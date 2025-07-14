import { createBrowserRouter } from 'react-router-dom'

import { RootLayout } from '../components/RootLayout/RootLayout'
import Characters from '../pages/Characters/Characters'
import Episodes from '../pages/Episodes/Episodes'
import Locations from '../pages/Locations/Location'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Characters /> },
      { path: 'locations', element: <Locations /> },
      { path: 'episodes', element: <Episodes /> },
    ],
  },
])

/*
export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Characters />,
  },
  {
    path: '/locations',
    element: <Locations />,
  },
  {
    path: '/episodes',
    element: <Episodes />,
  },
])
*/
