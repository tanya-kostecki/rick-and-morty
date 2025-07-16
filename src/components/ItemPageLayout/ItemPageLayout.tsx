import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import type { Character } from '@/api'
import { CharacterCard, Card, Typography } from '@/components'

import styles from './ItemPageLayout.module.scss'

interface Props {
  pageTitle: string
  characters: Character[]
  children: ReactNode
  itemsTitle: string
  error: string | null
}
export const ItemPageLayout = ({ pageTitle, characters, children, itemsTitle, error }: Props) => {
  const { t } = useTranslation()
  return (
    <>
      <Typography>{pageTitle}</Typography>
      <Card>
        <div className={styles.infoBlock}>{children}</div>
      </Card>
      <Typography as={'h2'} className={styles.h2}>
        {itemsTitle}
      </Typography>
      {characters.length === 0 ? (
        <Typography as={'span'}>{t('locationPage.noCharacters')}</Typography>
      ) : (
        <div className={styles.characters}>
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              id={character.id}
              image={character.image}
              name={character.name}
            />
          ))}
        </div>
      )}
      {error && <Typography as={'span'}>{error}</Typography>}
    </>
  )
}
