import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'

import { LogoIcon } from '@/assets/icons'
import { Select } from '@/components'
import { useScreenWidth, useToggle } from '@/hooks'

import styles from './Header.module.scss'
import { getHeaderLinks } from './headerLinks'
import { MenuIcon } from './MenuIcon/MenuIcon'

export const Header = () => {
  const { isMobile } = useScreenWidth()
  const { isOpen, toggleOpen } = useToggle()

  const { t } = useTranslation()

  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <Link to={'/'}>
          <LogoIcon fill={'var(--accent-color)'} width={40} height={40} />
        </Link>
        <div className={styles.navWrapper}>
          <Select />
          <nav className={clsx(styles.nav, isOpen && styles.navOpen)}>
            <ul className={styles.ul}>
              {getHeaderLinks(t).map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.href}
                    className={({ isActive }) => clsx(styles.navLink, isActive && styles.active)}
                    onClick={toggleOpen}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          {isMobile && (
            <MenuIcon className={styles.menuToggleIcon} isOpen={isOpen} onClick={toggleOpen} />
          )}
        </div>
      </div>
    </header>
  )
}
