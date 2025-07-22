import { render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, vi } from 'vitest'

import '@testing-library/jest-dom'
import { api } from '@/api/api'
import type { Character, Episode } from '@/api/types'
import { EpisodePage } from '@/pages'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => ({ id: '1' }),
  }
})

vi.mock('react-i18next', async () => {
  const actual = await vi.importActual<typeof import('react-i18next')>('react-i18next')
  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string) => key,
      i18n: { changeLanguage: vi.fn() },
    }),
    initReactI18next: actual.initReactI18next,
  }
})

const mockEpisode: Episode = {
  id: 1,
  name: 'Pilot',
  air_date: 'December 2, 2013',
  episode: 'S01E01',
  characters: [
    'https://rickandmortyapi.com/api/character/1',
    'https://rickandmortyapi.com/api/character/2',
  ],
  url: 'https://rickandmortyapi.com/api/episode/1',
  created: '2017-11-10T12:56:33.798Z',
}

const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth', url: 'https://rickandmortyapi.com/api/location/1' },
    location: { name: 'Earth', url: 'https://rickandmortyapi.com/api/location/20' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: ['https://rickandmortyapi.com/api/episode/1'],
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:48:46.250Z',
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth', url: 'https://rickandmortyapi.com/api/location/1' },
    location: { name: 'Earth', url: 'https://rickandmortyapi.com/api/location/20' },
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    episode: ['https://rickandmortyapi.com/api/episode/1'],
    url: 'https://rickandmortyapi.com/api/character/2',
    created: '2017-11-04T18:50:21.651Z',
  },
]

const fetchEpisodeSpy = vi.spyOn(api, 'fetchEpisode').mockResolvedValue(mockEpisode)
const fetchMultipleCharactersSpy = vi
  .spyOn(api, 'fetchMultipleCharacters')
  .mockResolvedValue(mockCharacters)

describe('Episode Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the Episode Page with mock data', async () => {
    const { findByText } = render(
      <MemoryRouter initialEntries={['/episode/1']}>
        <EpisodePage />
      </MemoryRouter>
    )

    expect(await findByText('Pilot')).toBeInTheDocument()
    expect(await findByText('Morty Smith')).toBeInTheDocument()
  })

  it('calls API methods with correct parameters based on mock data', async () => {
    render(
      <MemoryRouter initialEntries={['/episode/1']}>
        <EpisodePage />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(fetchEpisodeSpy).toHaveBeenCalledWith(1)
    })

    await waitFor(() => {
      expect(fetchMultipleCharactersSpy).toHaveBeenCalledWith([1, 2])
    })
  })
})
