import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { userEvent } from '@testing-library/user-event'
import { expect, vi } from 'vitest'

import i18n from '../../i18n'

import { Select } from './Select'

vi.mock('../../i18n', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../i18n')>()
  return {
    ...actual,
    default: {
      language: 'en',
      changeLanguage: vi.fn(async (lang: 'en' | 'ru') => {
        vi.mocked(i18n).language = lang
      }),
    },
  }
})

//Mock module scss styles
vi.mock('./Select.module.scss', () => ({
  default: {
    selectContainer: 'selectContainer',
    button: 'button',
    arrow: 'arrow',
    up: 'up',
    dropdown: 'dropdown',
    chosen: 'chosen',
  },
}))

// Mock ArrowIcon component
vi.mock('../../assets/icons/ArrowIcon', () => ({
  ArrowIcon: ({ className }: { className?: string }) => (
    <svg data-testid="arrow-icon" className={className} />
  ),
}))

describe('Select Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(i18n).language = 'en'
  })

  it('should render default language', () => {
    const { getByText, getByRole } = render(<Select />)
    expect(getByText('EN')).toBeInTheDocument()
    expect(getByRole('button')).toBeInTheDocument()
  })

  it('should render with language from localStorage', async () => {
    localStorage.setItem('lang', 'en')
    const user = userEvent.setup()
    const { getByRole, getByText } = render(<Select />)

    await user.click(getByRole('button'))
    await user.click(getByRole('option', { name: 'РУ' }))

    expect(getByText('РУ')).toBeInTheDocument()

    expect(localStorage.getItem('lang')).toBe('ru')
  })

  it('should change language on option click', async () => {
    const { getByText, getByRole } = render(<Select />)
    const user = userEvent.setup()
    await user.click(getByRole('button'))
    await user.click(getByText('РУ'))

    expect(vi.mocked(i18n.changeLanguage)).toHaveBeenCalledWith('ru')
    expect(vi.mocked(i18n).language).toBe('ru')
  })

  it('should render an arrow icon', () => {
    const { getByTestId } = render(<Select />)
    expect(getByTestId('arrow-icon')).toBeInTheDocument()
  })

  it('should show rotated arrow when open', async () => {
    const user = userEvent.setup()
    const { getByRole, getByTestId } = render(<Select />)

    const arrow = getByTestId('arrow-icon')

    expect(arrow.classList.contains('arrow')).toBe(true)
    expect(arrow.classList.contains('up')).toBe(false)

    await user.click(getByRole('button'))

    expect(arrow.classList.contains('arrow')).toBe(true)
    expect(arrow.classList.contains('up')).toBe(true)
  })
})
