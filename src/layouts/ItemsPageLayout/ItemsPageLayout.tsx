import type { ReactNode } from 'react'

import { Loader, Typography } from '@/components'
import { Pagination } from '@components/Pagination/Pagination'

import styles from './ItemsPageLayout.module.scss'

interface Props {
  title: string
  isLoading: boolean
  children: ReactNode
  error: string | null
  pages: number
  setCurrentPage: (page: number) => void
  currentPage: number
  onMouseLeave?: () => void
}

export const ItemsPageLayout = ({
  title,
  isLoading,
  children,
  error,
  pages,
  setCurrentPage,
  currentPage,
  onMouseLeave,
}: Props) => {
  return (
    <>
      <Typography>{title}</Typography>
      <div className={styles.cards} onMouseLeave={onMouseLeave}>
        {isLoading && <Loader />}
        {children}
        {error && <span>{error}</span>}
      </div>

      {!isLoading && (
        <Pagination lastPage={pages} setCurrentPage={setCurrentPage} currentPage={currentPage} />
      )}
    </>
  )
}
