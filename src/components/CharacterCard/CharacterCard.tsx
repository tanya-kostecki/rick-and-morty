import { NavLink } from 'react-router-dom'

import { Card } from '@/components'

import styles from './CharacterCard.module.scss'

type Props = {
  id: number
  name: string
  image: string
  onMouseEnter?: () => void
}
export const CharacterCard = ({ id, name, image, onMouseEnter }: Props) => {
  return (
    <Card as={NavLink} to={`/${id}`} className={styles.card} onMouseEnter={onMouseEnter}>
      <h3>{name}</h3>
      <img src={image} alt={name} />
    </Card>
  )
}
