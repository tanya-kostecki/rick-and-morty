import type { ReactNode } from 'react'

import { Loader } from '../Loader/Loader'
import { Title } from '../Title/Title'

import styles from './PageLayout.module.scss'

type Props = {
  title: string
  isLoading: boolean
  children: ReactNode
  error: string | null
}
export const PageLayout = ({ title, isLoading, children, error }: Props) => {
  return (
    <>
      <Title>{title}</Title>
      <div className={styles.cards}>
        {isLoading && <Loader />}
        {children}
        {error && <span>{error}</span>}
      </div>
    </>
  )
}
