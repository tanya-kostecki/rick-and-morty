import { createBrowserRouter } from 'react-router-dom'

import { RootLayout } from '@components/RootLayout/RootLayout'
import { CharacterPage } from '@pages/Character/Character'
import { EpisodePage } from '@pages/Episode/Episode'
import { LocationPage } from '@pages/Location/Location'

import Characters from '../pages/Characters/Characters'
import Episodes from '../pages/Episodes/Episodes'
import Locations from '../pages/Locations/Locations'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Characters /> },
      { path: 'locations', element: <Locations /> },
      { path: 'episodes', element: <Episodes /> },
      { path: ':id', element: <CharacterPage /> },
      { path: 'episodes/:id', element: <EpisodePage /> },
      { path: 'locations/:id', element: <LocationPage /> },
    ],
  },
])
