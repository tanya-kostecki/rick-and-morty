import { createPortal } from 'react-dom'
import { NavLink } from 'react-router-dom'

import type { Character } from '../../api/types'
import { MenuIcon } from '../Header/MenuIcon/MenuIcon'

import styles from './Modal.module.scss'

type Props = {
  currentCharacter: Character
  onClose: () => void
}

export const Modal = ({ currentCharacter, onClose }: Props) => {
  const body = document.querySelector('body')

  if (!body) return null

  return createPortal(
    <div className={styles.modalWrapper}>
      <MenuIcon isOpen={!!currentCharacter} className={styles.close} onClick={onClose} />
      <div className={styles.modal}>
        <h3>Name: {currentCharacter.name}</h3>
        <img src={currentCharacter.image} alt={currentCharacter.name} className={styles.img} />
        <p>Species: {currentCharacter.species}</p>
        <p>Location: {currentCharacter.location.name}</p>
        <NavLink to={`/character/${currentCharacter.id}`} className={styles.button}>
          Go to character page
        </NavLink>
      </div>
    </div>,
    body
  )
}
