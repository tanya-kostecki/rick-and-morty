import type { TFunction } from 'i18next'

interface HeaderLink {
  label: string
  href: string
}

export const getHeaderLinks = (t: TFunction): HeaderLink[] => [
  {
    label: t('header.characters'),
    href: '/',
  },
  {
    label: t('header.episodes'),
    href: '/episodes',
  },
  {
    label: t('header.locations'),
    href: '/locations',
  },
]
