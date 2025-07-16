import clsx from 'clsx'
import type { ComponentPropsWithoutRef, ElementType } from 'react'

import styles from './Typography.module.scss'

type Props<T extends ElementType = 'h1'> = {
  as?: T
  variant?: 'h1' | 'h2' | 'h3' | 'span' | 'p'
} & ComponentPropsWithoutRef<T>

export const Typography = <T extends ElementType = 'h1'>({
  children,
  className,
  as,
  variant = 'h1',
  ...props
}: Props<T>) => {
  const Component = as || 'h1'
  return (
    <Component className={clsx(styles[variant], className)} {...props}>
      {children}
    </Component>
  )
}
