import { useTranslation } from 'react-i18next'

import { Cards } from '../../components/Cards/Cards'
import { Title } from '../../components/Title/Title'

const Characters = () => {
  const { t } = useTranslation()
  return (
    <>
      <Title>{t('characters.title')}</Title>
      <Cards />
    </>
  )
}
export default Characters
