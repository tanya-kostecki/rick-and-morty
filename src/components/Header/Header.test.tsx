import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import type { TFunction } from 'i18next'
import { MemoryRouter } from 'react-router-dom'
import { expect, type Mock, vi } from 'vitest'

import { Header } from '@components/Header/Header'
import { getHeaderLinks } from '@components/Header/headerLinks'
import { useScreenWidth } from '@hooks/useScreenWidth'

const mockToggleOpen = vi.fn()
vi.mock('@hooks/useToggle', () => ({
  useToggle: vi.fn(() => ({ isOpen: false, toggleOpen: mockToggleOpen })),
}))

vi.mock('@hooks/useScreenWidth', () => ({
  useScreenWidth: vi.fn(() => ({ isMobile: false })),
}))

vi.mock('react-i18next', async () => {
  const actual = await vi.importActual<typeof import('react-i18next')>('react-i18next')

  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string) => key,
      i18n: {
        changeLanguage: vi.fn(),
      },
    }),
    initReactI18next: actual.initReactI18next,
  }
})

vi.mock('@components/Select/Select', () => ({
  Select: () => <div data-testid="select">Select</div>,
}))

vi.mock('@assets/icons/LogoIcon', () => ({
  LogoIcon: () => <div data-testid="logo-icon">LogoIcon</div>,
}))

vi.mock('@components/Header/MenuIcon/MenuIcon', () => ({
  MenuIcon: ({ onClick }: { onClick: () => void }) => (
    <div data-testid="menu-icon" onClick={onClick}>
      MenuIcon
    </div>
  ),
}))

describe('Header Component', () => {
  it('should render Header Component', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    expect(getByTestId('logo-icon')).toBeInTheDocument()
    expect(getByTestId('select')).toBeInTheDocument()
  })

  it('should render navigation links', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    getHeaderLinks(((key: string) => key) as TFunction).forEach((link) => {
      expect(getByText(link.label)).toBeInTheDocument()
    })
  })

  it('should show MenuIcon on smaller devices', () => {
    ;(useScreenWidth as Mock).mockImplementationOnce(() => ({
      isMobile: true,
    }))

    const { getByTestId } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    expect(getByTestId('menu-icon')).toBeInTheDocument()
  })

  it('should toggle menu on MenuIcon click', async () => {
    ;(useScreenWidth as Mock).mockImplementationOnce(() => ({
      isMobile: true,
    }))

    const { getByTestId } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    fireEvent.click(getByTestId('menu-icon'))
    expect(mockToggleOpen).toHaveBeenCalled()
  })
})
