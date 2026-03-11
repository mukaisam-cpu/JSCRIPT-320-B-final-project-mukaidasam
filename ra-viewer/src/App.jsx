import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './routes/Home'
import GameInfo from './routes/GameInfo'
import SavedGames from './routes/SavedGames'
import About from './routes/About'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<GameInfo />} />
        <Route path="/saved" element={<SavedGames />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
