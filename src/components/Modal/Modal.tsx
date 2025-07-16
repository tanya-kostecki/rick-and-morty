import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'

import type { Character } from '@/api'
import { Typography } from '@/components'
import { MenuIcon } from '@components/Header/MenuIcon/MenuIcon'

import styles from './Modal.module.scss'

interface Props {
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
        <Typography as={'h3'} variant={'h3'}>
          {t('modal.name')}: {currentCharacter.name}
        </Typography>
        <img src={currentCharacter.image} alt={currentCharacter.name} className={styles.img} />
        <Typography as={'p'} variant={'p'}>
          {t('modal.species')}: {currentCharacter.species}
        </Typography>
        <Typography as={'p'} variant={'p'}>
          {t('modal.location')}: {currentCharacter.location.name}
        </Typography>
      </div>
    </div>,
    body
  )
}
