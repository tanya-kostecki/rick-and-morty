import { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { api, type Character } from '@/api'
import { CharacterCard, Modal, ItemsPageLayout } from '@/components'
import { useFetchAllItems, useScreenWidth } from '@/hooks'

export const Characters = () => {
  const { t } = useTranslation()
  const {
    data: characters,
    error,
    isLoading,
    allPages,
    currentPage,
    setCurrentPage,
  } = useFetchAllItems<Character>(api.fetchCharacters)

  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(null)
  const { isTablet } = useScreenWidth()

  console.log('Characters page', currentCharacter)
  return (
    <ItemsPageLayout
      title={t('characters.title')}
      isLoading={isLoading}
      error={error}
      pages={allPages}
      onMouseLeave={() => {
        setCurrentCharacter(null)
      }}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
    >
      {characters?.map((character) => (
        <Fragment key={character.id}>
          <CharacterCard
            id={character.id}
            onMouseEnter={() => {
              setCurrentCharacter(character)
            }}
            name={character.name}
            image={character.image}
          />
          {currentCharacter?.id === character.id && !isTablet && (
            <Modal
              currentCharacter={currentCharacter}
              onClose={() => {
                setCurrentCharacter(null)
              }}
            />
          )}
        </Fragment>
      ))}
    </ItemsPageLayout>
  )
}
