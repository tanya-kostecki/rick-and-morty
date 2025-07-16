import { Outlet } from 'react-router-dom'

import { Header } from '@/components'

import styles from './RootLayout.module.scss'

export const RootLayout = () => {
  return (
    <div className="app">
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
