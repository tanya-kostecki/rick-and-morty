import { useTranslation } from 'react-i18next'

import { api } from '../../api/api'
import type { Character } from '../../api/types'
import { Card } from '../../components/Card/Card'
import { PageLayout } from '../../components/PageLayout/PageLayout'
import { useFetch } from '../../hooks/useFetch'

import styles from './Characters.module.scss'

const Characters = () => {
  const { t } = useTranslation()
  const { data: characters, error, isLoading } = useFetch<Character>(api.fetchCharacters, 1)

  return (
    <PageLayout title={t('characters.title')} isLoading={isLoading} error={error}>
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
