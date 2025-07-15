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
}

export const PageLayout = ({ title, isLoading, children, error, pages }: Props) => {
  return (
    <>
      <Title>{title}</Title>
      <div className={styles.cards}>
        {isLoading && <Loader />}
        {children}
        {error && <span>{error}</span>}
      </div>
      {!isLoading && <Pagination lastPage={pages} />}
    </>
  )
}
