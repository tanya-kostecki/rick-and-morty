import type { ReactNode } from 'react'

import { Loader, Typography } from '@/components'

import styles from './PageLayout.module.scss'
import { Pagination } from './Pagination/Pagination'

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

export const PageLayout = ({
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
