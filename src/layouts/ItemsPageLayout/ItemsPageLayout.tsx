import type { ReactNode } from 'react'

import { Loader, Typography } from '@/components'
import { useScreenWidth } from '@/hooks'
import { MobilePagination } from '@components/Pagination/MobilePagination'
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
  const { isMobile } = useScreenWidth()

  if (isLoading) return <Loader />

  return (
    <>
      <Typography>{title}</Typography>
      <div className={styles.cards} onMouseLeave={onMouseLeave}>
        {children}
        {error && (
          <Typography as={'span'} variant={'span'}>
            {error}
          </Typography>
        )}
      </div>

      {isMobile ? (
        <MobilePagination
          currentPage={currentPage}
          lastPage={pages}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <Pagination lastPage={pages} setCurrentPage={setCurrentPage} currentPage={currentPage} />
      )}
    </>
  )
}
