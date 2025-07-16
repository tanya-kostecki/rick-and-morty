import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import type { Character } from '@/api'
import { CharacterCard, Card, Title } from '@/components'

import styles from './ItemPageLayout.module.scss'

type Props = {
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
      <Title>{pageTitle}</Title>
      <Card>
        <div className={styles.infoBlock}>{children}</div>
      </Card>
      <Title as={'h2'} className={styles.h2}>
        {itemsTitle}
      </Title>
      {characters.length === 0 ? (
        <span>{t('locationPage.noCharacters')}</span>
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
      {error && <span>{error}</span>}
    </>
  )
}
