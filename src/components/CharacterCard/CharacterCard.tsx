import { NavLink } from 'react-router-dom'

import { Card, Typography } from '@/components'

import styles from './CharacterCard.module.scss'

interface Props {
  id: number
  name: string
  image: string
  onMouseEnter?: () => void
}
export const CharacterCard = ({ id, name, image, onMouseEnter }: Props) => {
  return (
    <Card as={NavLink} to={`/${id}`} className={styles.card} onMouseEnter={onMouseEnter}>
      <Typography as={'h3'} variant={'h3'}>
        {name}
      </Typography>
      <img src={image} alt={name} />
    </Card>
  )
}
