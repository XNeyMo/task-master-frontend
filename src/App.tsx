import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

import Home from './pages/home'
import Auth from './pages/auth'
import Protected from './components/protected'
import { AuthProvider } from './context/auth'
import TaskForm from './components/forms/task'
import { TaskProvider } from './context/task'

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />

            <Route element={<Protected />}>
              <Route path="/" element={<Home />} />
              <Route path="/task" element={<TaskForm />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App
