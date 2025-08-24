import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage';
import NoteDetailPage from './pages/NoteDetailPage';
import CreatePage from './pages/CreatePage';

// import toast from 'react-hot-toast'
import './index.css';


const App = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 
  [background:radial-gradient(circle at bottom left, #00FF9D 0%, transparent 70%),
              radial-gradient(circle at bottom right, #00FF9D 0%, transparent 70%),
              #000]"/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes/:id" element={<NoteDetailPage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </div>
  )
}

export default App
