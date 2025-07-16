import type { ReactNode } from 'react'

import { Loader } from '../Loader/Loader'
import { Title } from '../Title/Title'

import styles from './PageLayout.module.scss'
import { Pagination } from './Pagination/Pagination'

type Props = {
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
      <Title>{title}</Title>
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
