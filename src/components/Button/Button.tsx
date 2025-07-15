import clsx from 'clsx'
import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react'

import styles from './Button.module.scss'

type Props<T extends ElementType = 'button'> = {
  as?: T
  children?: ReactNode
} & ComponentPropsWithRef<T>

export const Button = <T extends ElementType = 'button'>({
  as,
  children,
  className,
  ...props
}: Props<T>) => {
  const Component = as || 'button'
  return (
    <Component className={clsx(styles.button, className)} {...props}>
      {children}
    </Component>
  )
}
