import React, { ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Game from './pages/game.component'
import ScoreBoard from './pages/scoreboard.component'
import WelcomeScreen from './pages/welcome-screen.component'
import { GlobalStore } from './store/context'

function App (): ReactElement {
  return (
    <GlobalStore>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/game" element={<Game />} />
            <Route path="/scoreboard" element={<ScoreBoard />} />
          </Routes>
        </header>
      </div>
    </GlobalStore>
  )
}

export default App
