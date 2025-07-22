import { useTranslation } from 'react-i18next'

import { Button, Typography } from '@/components'

import styles from './Pagination.module.scss'

interface Props {
  currentPage: number
  lastPage: number
  setCurrentPage: (page: number) => void
}

export const MobilePagination = ({ currentPage, lastPage, setCurrentPage }: Props) => {
  const { t } = useTranslation()

  return (
    <div className={styles.mobileWrapper}>
      <Button
        disabled={currentPage === 1}
        className={currentPage === 1 ? styles.disable : ''}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        {t('pagination.back')}
      </Button>

      <Typography as="span" variant="span" className={styles.activeSpan}>
        {currentPage}
      </Typography>

      <Button
        disabled={currentPage === lastPage}
        className={currentPage === lastPage ? styles.disable : ''}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        {t('pagination.next')}
      </Button>
    </div>
  )
}
