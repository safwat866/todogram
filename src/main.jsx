import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login'
import Task from './Task'


createRoot(document.getElementById("root")).render(

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/task/inbox" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/task/:id" element={<Task />} />
      </Routes>
    </BrowserRouter>

);
