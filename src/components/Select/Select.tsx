import clsx from 'clsx'

import { useToggle } from '@/hooks'
import { ArrowIcon } from '@assets/icons'

import i18n from '../../i18n'

import styles from './Select.module.scss'

const languageOptions: ('en' | 'ru')[] = ['en', 'ru']

const languageLabels: Record<'en' | 'ru', string> = {
  en: 'EN',
  ru: 'РУ',
}

export const Select = () => {
  const { isOpen, toggleOpen } = useToggle()

  const chosenLang = i18n.language as 'en' | 'ru'

  const onLanguageChange = async (lang: 'en' | 'ru') => {
    await i18n.changeLanguage(lang)
    localStorage.setItem('lang', lang)
    toggleOpen()
  }

  return (
    <div
      className={styles.selectContainer}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-labelledby="custom-select-label"
      tabIndex={0}
    >
      <span id="custom-select-label">{languageLabels[chosenLang]}</span>
      <button
        aria-label={isOpen ? 'Collapse language options' : 'Expand language options'}
        aria-expanded={isOpen}
        aria-controls={'language-dropdown'}
        onClick={toggleOpen}
        className={styles.button}
        role="button"
        tabIndex={0}
      >
        <ArrowIcon
          className={clsx(styles.arrow, isOpen && styles.up)}
          width={20}
          height={20}
          aria-hidden
        />
      </button>
      {isOpen && (
        <div
          className={styles.dropdown}
          role="listbox"
          aria-labelledby={'dropdown-label'}
          id={'language-dropdown'}
        >
          {languageOptions.map((option) => (
            <span
              key={option}
              role="option"
              tabIndex={0}
              aria-selected={chosenLang === option}
              className={clsx(chosenLang === option && styles.chosen)}
              onClick={() => onLanguageChange(option)}
            >
              {languageLabels[option]}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
