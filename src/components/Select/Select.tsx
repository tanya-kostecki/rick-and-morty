import clsx from 'clsx'
import { useState } from 'react'

import { ArrowIcon } from '../../assets/icons/ArrowIcon'

import styles from './Select.module.scss'

const languageOptions = ['EN', 'РУ']

export const Select = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [chosenLang, setChosenLang] = useState('EN')

  const onLanguageChange = () => {
    if (chosenLang === 'EN') {
      setChosenLang('РУ')
    } else {
      setChosenLang('EN')
    }
    setIsOpen(false)
  }

  const onArrowClick = () => {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <div
      className={styles.selectContainer}
      role="button"
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-labelledby="custom-select-label"
      tabIndex={0}
    >
      <span id="custom-select-label">{chosenLang}</span>
      <button
        aria-label={isOpen ? 'Collapse language options' : 'Expand language options'}
        aria-expanded={isOpen}
        aria-controls={'language-dropdown'}
        onClick={onArrowClick}
        className={styles.button}
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
              onClick={onLanguageChange}
            >
              {option}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
