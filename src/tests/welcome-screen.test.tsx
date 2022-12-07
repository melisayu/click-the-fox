import React from 'react'
import { BrowserRouter as Router  } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import WelcomeScreen from '../pages/welcome-screen.component';

test('renders welcome screen', () => {
  const mockedUsedNavigate = jest.fn();
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate,
  }));

  render(
    <Router>
      <WelcomeScreen />
    </Router>
  )
  const formLabel = screen.getByText('Enter your name :')
  expect(formLabel).toBeInTheDocument()

  const playButton = screen.getByText('PLAY!')
  expect(playButton).toBeInTheDocument()
})
