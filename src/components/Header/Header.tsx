import clsx from 'clsx'
import { NavLink } from 'react-router-dom'

import { LocoIcon } from '../../assets/icons/LocoIcon'

import styles from './Header.module.scss'
import { headerLinks } from './headerLinks'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <LocoIcon fill={'var(--accent-color)'} width={40} height={40} />
        <nav>
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
      </div>
    </header>
  )
}
