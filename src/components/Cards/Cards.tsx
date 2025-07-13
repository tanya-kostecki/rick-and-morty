import { Card } from './Card/Card'
import styles from './Cards.module.scss'

export const Cards = () => {
  return (
    <div className={styles.cards}>
      <Card />
      <Card />
      <Card />
    </div>
  )
}
