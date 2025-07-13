import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { LocoIcon } from '../../assets/icons/LocoIcon'
import { useScreenWidth } from '../../hooks/useScreenWidth'
import { useToggle } from '../../hooks/useToggle'
import { Select } from '../Select/Select'

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
        <LocoIcon fill={'var(--accent-color)'} width={40} height={40} />
        <div className={styles.navWrapper}>
          <Select />
          <nav className={clsx(styles.nav, isOpen && styles.navOpen)}>
            <ul className={styles.ul}>
              {getHeaderLinks(t).map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.href}
                    className={({ isActive }) => clsx(styles.navLink, isActive && styles.active)}
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
