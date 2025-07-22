import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { Button, Typography } from '@/components'
import { getVisiblePages } from '@/components/Pagination/getVisiblePages'

import styles from './Pagination.module.scss'

interface Props {
  lastPage: number
  currentPage: number
  setCurrentPage: (page: number) => void
}

export const Pagination = ({ lastPage, currentPage, setCurrentPage }: Props) => {
  const { firstPage, visiblePages } = getVisiblePages(lastPage, currentPage)

  const { t } = useTranslation()

  const filteredPages = visiblePages.filter((page) => page !== firstPage && page !== lastPage)

  return (
    <div className={styles.wrapper}>
      <Button
        className={clsx(currentPage === firstPage && styles.disable)}
        disabled={currentPage === firstPage}
        onClick={() => {
          setCurrentPage(currentPage - 1)
        }}
      >
        {t('pagination.back')}
      </Button>

      <Typography
        as={'span'}
        variant={'span'}
        className={currentPage === firstPage ? styles.activeSpan : styles.span}
        onClick={() => {
          setCurrentPage(firstPage)
        }}
      >
        {firstPage}
      </Typography>

      {visiblePages[0] > firstPage + 1 && (
        <Typography as={'span'} variant={'span'} className={styles.span}>
          ...
        </Typography>
      )}

      {filteredPages.map((page) => (
        <Typography
          as={'span'}
          variant={'span'}
          key={page}
          className={page === currentPage ? styles.activeSpan : styles.span}
          onClick={() => {
            setCurrentPage(page)
          }}
        >
          {page}
        </Typography>
      ))}

      {visiblePages[visiblePages.length - 1] < lastPage - 1 && (
        <Typography as={'span'} variant={'span'} className={styles.span}>
          ...
        </Typography>
      )}

      <Typography
        as={'span'}
        variant={'span'}
        className={currentPage === lastPage ? styles.activeSpan : styles.span}
        onClick={() => {
          setCurrentPage(lastPage)
        }}
      >
        {lastPage}
      </Typography>

      <Button
        className={clsx(currentPage === lastPage && styles.disable)}
        disabled={currentPage === lastPage}
        onClick={() => {
          setCurrentPage(currentPage + 1)
        }}
      >
        {t('pagination.next')}
      </Button>
    </div>
  )
}
