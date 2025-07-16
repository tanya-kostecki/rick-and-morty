import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'

import type { Character } from '@/api'
import { MenuIcon } from '@components/Header/MenuIcon/MenuIcon'

import styles from './Modal.module.scss'

type Props = {
  currentCharacter: Character
  onClose: () => void
}

export const Modal = ({ currentCharacter, onClose }: Props) => {
  const body = document.querySelector('body')
  const { t } = useTranslation()

  if (!body) return null

  return createPortal(
    <div className={styles.modalWrapper}>
      <MenuIcon isOpen={!!currentCharacter} className={styles.close} onClick={onClose} />
      <div className={styles.modal}>
        <h3>
          {t('modal.name')}: {currentCharacter.name}
        </h3>
        <img src={currentCharacter.image} alt={currentCharacter.name} className={styles.img} />
        <p>
          {t('modal.species')}: {currentCharacter.species}
        </p>
        <p>
          {t('modal.location')}: {currentCharacter.location.name}
        </p>
      </div>
    </div>,
    body
  )
}
