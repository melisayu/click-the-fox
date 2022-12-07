import React from 'react'
import { BrowserRouter as Router  } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import App from '../App'

test('renders app', () => {
  render(
    <Router>
      <App />
    </Router>
  )
  const title = screen.getByText('Click the Fox! Game')
  expect(title).toBeInTheDocument()
})
