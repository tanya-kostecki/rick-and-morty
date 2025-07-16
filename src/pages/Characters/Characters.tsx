import { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { api } from '@api/api'
import type { Character } from '@api/types'
import { CharacterCard } from '@components/CharacterCard/CharacterCard'
import { Modal } from '@components/Modal/Modal'
import { PageLayout } from '@components/PageLayout/PageLayout'
import { useFetch } from '@hooks/useFetch'
import { useScreenWidth } from '@hooks/useScreenWidth'

const Characters = () => {
  const { t } = useTranslation()
  const {
    data: characters,
    error,
    isLoading,
    allPages,
    currentPage,
    setCurrentPage,
  } = useFetch<Character>(api.fetchCharacters)

  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(null)
  const { isTablet } = useScreenWidth()

  console.log('Characters page', currentCharacter)
  return (
    <PageLayout
      title={t('characters.title')}
      isLoading={isLoading}
      error={error}
      pages={allPages}
      onMouseLeave={() => setCurrentCharacter(null)}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
    >
      {characters?.map((character) => (
        <Fragment key={character.id}>
          <CharacterCard
            id={character.id}
            onMouseEnter={() => setCurrentCharacter(character)}
            name={character.name}
            image={character.image}
          />
          {currentCharacter?.id === character.id && !isTablet && (
            <Modal currentCharacter={currentCharacter} onClose={() => setCurrentCharacter(null)} />
          )}
        </Fragment>
      ))}
    </PageLayout>
  )
}
export default Characters
