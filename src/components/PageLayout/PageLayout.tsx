import type { ReactNode } from 'react'

import { Title } from '../Title/Title'

import styles from './PageLayout.module.scss'

type Props = {
  title: string
  children: ReactNode
}
export const PageLayout = ({ title, children }: Props) => {
  return (
    <>
      <Title>{title}</Title>
      <div className={styles.cards}>{children}</div>
    </>
  )
}
