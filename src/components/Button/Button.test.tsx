import { render } from '@testing-library/react'
import { Link, MemoryRouter } from 'react-router-dom'
import { describe, expect } from 'vitest'

import '@testing-library/jest-dom'

import { Button } from '@components/Button/Button'

describe('Button Component', () => {
  it('should render a <button> element by default', () => {
    const { getByRole } = render(<Button>Button</Button>)

    expect(getByRole('button').tagName).toBe('BUTTON')
    expect(getByRole('button')).toHaveTextContent('Button')
  })

  it('should render a <Link> element when prop as is provided', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Button as={Link} to={'/'}>
          Link
        </Button>
      </MemoryRouter>
    )

    expect(getByRole('link').tagName).toBe('A')
    expect(getByRole('link')).toHaveTextContent('Link')
    expect(getByRole('link')).toHaveAttribute('href', '/')
  })
})
