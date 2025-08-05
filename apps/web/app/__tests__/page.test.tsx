import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../page'

describe('Home', () => {
  it('renders a heading', async () => {
    render(<Home />)

    const heading = await screen.findByRole('heading', {
      name: /get started by editing/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
