import { render } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { beforeEach, describe, expect, vi } from 'vitest'
import '@testing-library/jest-dom'

import { getVisiblePages } from '@components/Pagination/getVisiblePages'
import { Pagination } from '@components/Pagination/Pagination'

vi.mock('./Pagination.module.scss', () => ({
  default: {
    wrapper: 'wrapper',
    disable: 'disable',
    span: 'span',
    activeSpan: 'activeSpan',
  },
}))

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

const setCurrentPage = vi.fn()

describe('Pagination Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render correctly', () => {
    const { getByText } = render(
      <Pagination lastPage={7} currentPage={1} setCurrentPage={setCurrentPage} />
    )

    expect(getByText('1')).toBeInTheDocument()
    expect(getByText('2')).toBeInTheDocument()

    const pageData = getVisiblePages(7, 1)
    expect(pageData.visiblePages.length).toBe(4)
  })

  it('should display the current page as active', () => {
    const { getByText } = render(
      <Pagination lastPage={7} currentPage={2} setCurrentPage={setCurrentPage} />
    )

    const currentPage = getByText('2')
    expect(currentPage.classList.contains('activeSpan')).toBe(true)
    expect(currentPage.classList.length).toBe(2)
  })

  it('should display a page as active when clicked', async () => {
    const { getByText } = render(
      <Pagination lastPage={7} currentPage={3} setCurrentPage={setCurrentPage} />
    )

    const user = userEvent.setup()
    const clickedPage = getByText('4')

    await user.click(clickedPage)

    expect(setCurrentPage).toHaveBeenCalledWith(4)
  })

  it('should disable the back button if current page is 1', async () => {
    const { getByText } = render(
      <Pagination lastPage={1} currentPage={1} setCurrentPage={setCurrentPage} />
    )

    expect(getByText('pagination.back').classList.contains('disable')).toBe(true)
  })

  it('should disable the next button if current page is the last page', async () => {
    const { getByText } = render(
      <Pagination lastPage={7} currentPage={7} setCurrentPage={setCurrentPage} />
    )

    expect(getByText('pagination.next').classList.contains('disable')).toBe(true)
  })
})
