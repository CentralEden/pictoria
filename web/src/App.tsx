import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import './App.css'

import Home from './pages/Home'
import Profile from './pages/Profile'

function App() {

  return (
    // アプリ全体のスタイリング
    <div className="w-full min-h-screen bg-gray-50 text-gray-900">
      <Routes>
        <Route element={<Layout />}>
          {/* ホーム画面 */}
          <Route path="/" element={
            <Home />
          } />

          {/* プロフィール画面 */}
          <Route path="/profile" element={
            <Profile />
          } />

          {/* 404ページ */}
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center h-screen">
              <h1 className="text-2xl font-bold">404</h1>
              <p className="text-gray-600">ページが見つかりません</p>
            </div>
          } />
        </Route>
      </Routes>
    </div>
  )
}

export default App
