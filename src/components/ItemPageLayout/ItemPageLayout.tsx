import type { ReactNode } from 'react'

import type { Character } from '../../api/types'
import { Card } from '../Card/Card'
import { CharacterCard } from '../CharacterCard/CharacterCard'
import { Title } from '../Title/Title'

import styles from './ItemPageLayout.module.scss'

type Props = {
  pageTitle: string
  characters: Character[]
  children: ReactNode
}
export const ItemPageLayout = ({ pageTitle, characters, children }: Props) => {
  return (
    <>
      <Title>{pageTitle}</Title>
      <Card>
        <div className={styles.infoBlock}>{children}</div>
      </Card>
      <Title as={'h2'} className={styles.h2}>
        Characters from episode
      </Title>
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
    </>
  )
}
