import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '../../Button/Button'

import styles from './Pagination.module.scss'

type Props = {
  lastPage: number
}

const getVisiblePages = (lastPage: number, currentPage: number) => {
  const maxVisible = 4
  const firstPage = 1

  let firstVisiblePage = Math.min(Math.max(currentPage - 2, firstPage), lastPage - maxVisible + 1)

  if (firstVisiblePage < firstPage) firstVisiblePage = firstPage

  const visiblePages = []
  for (let i = firstVisiblePage; i < firstVisiblePage + maxVisible && i <= lastPage; i++) {
    visiblePages.push(i)
  }

  return { firstPage, visiblePages }
}

export const Pagination = ({ lastPage }: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { firstPage, visiblePages } = getVisiblePages(lastPage, currentPage)

  const { t } = useTranslation()

  return (
    <div className={styles.wrapper}>
      <Button
        className={clsx(currentPage === firstPage && styles.disable)}
        disabled={currentPage === firstPage}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        {t('pagination.back')}
      </Button>

      <span
        className={currentPage === firstPage ? styles.activeSpan : styles.span}
        onClick={() => setCurrentPage(firstPage)}
      >
        {firstPage}
      </span>

      {visiblePages[0] > firstPage + 1 && <span className={styles.span}>...</span>}

      {visiblePages
        .filter((page) => page !== firstPage && page !== lastPage)
        .map((page) => (
          <span
            key={page}
            className={page === currentPage ? styles.activeSpan : styles.span}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </span>
        ))}

      {visiblePages[visiblePages.length - 1] < lastPage - 1 && (
        <span className={styles.span}>...</span>
      )}

      <span
        className={currentPage === lastPage ? styles.activeSpan : styles.span}
        onClick={() => setCurrentPage(lastPage)}
      >
        {lastPage}
      </span>

      <Button
        className={clsx(currentPage === lastPage && styles.disable)}
        disabled={currentPage === lastPage}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        {t('pagination.next')}
      </Button>
    </div>
  )
}
