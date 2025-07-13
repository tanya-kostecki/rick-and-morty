import { useTranslation } from 'react-i18next'

import { Title } from '../../components/Title/Title'

const Episodes = () => {
  const { t } = useTranslation()
  return <Title>{t('episodes.title')}</Title>
}
export default Episodes
