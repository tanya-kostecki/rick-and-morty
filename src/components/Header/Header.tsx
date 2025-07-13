import clsx from 'clsx'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { LocoIcon } from '../../assets/icons/LocoIcon'
import { useScreenWidth } from '../../hooks/useScreenWidth'
import { Select } from '../Select/Select'

import styles from './Header.module.scss'
import { headerLinks } from './headerLinks'
import { MenuIcon } from './MenuIcon/MenuIcon'

export const Header = () => {
  const { isMobile } = useScreenWidth()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <LocoIcon fill={'var(--accent-color)'} width={40} height={40} />
        <div className={styles.navWrapper}>
          <Select />
          <nav className={clsx(styles.nav, isOpen && styles.navOpen)}>
            <ul className={styles.ul}>
              {headerLinks.map((link) => (
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
            <MenuIcon className={styles.menuToggleIcon} isOpen={isOpen} onClick={toggleMenu} />
          )}
        </div>
      </div>
    </header>
  )
}
