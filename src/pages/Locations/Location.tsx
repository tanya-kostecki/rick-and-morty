import { useTranslation } from 'react-i18next'

import { Title } from '../../components/Title/Title'

const Locations = () => {
  const { t } = useTranslation()
  return <Title>{t('locations.title')}</Title>
}
export default Locations
