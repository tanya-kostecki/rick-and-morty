import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { api } from '../../api/api'
import type { Character } from '../../api/types'
import { Card } from '../../components/Card/Card'
import { PageLayout } from '../../components/PageLayout/PageLayout'

import styles from './Characters.module.scss'

const Characters = () => {
  const { t } = useTranslation()
  const [characters, setCharacters] = useState<Character[]>([])
  useEffect(() => {
    const getCharacters = async () => {
      const res = await api.fetchCharacters(1)
      setCharacters(res.results)
    }
    getCharacters()
  }, [])
  return (
    <PageLayout title={t('characters.title')}>
      {characters.map((character) => (
        <Card key={character.id} className={styles.card}>
          <h3>{character.name}</h3>
          <img src={character.image} alt={character.name} />
        </Card>
      ))}
    </PageLayout>
  )
}
export default Characters
