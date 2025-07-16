import { createBrowserRouter } from 'react-router-dom'

import { RootLayout } from '@/components'
import { CharacterPage, EpisodePage, LocationPage, Characters, Episodes, Locations } from '@/pages'

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
