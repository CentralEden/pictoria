import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pb-16 px-4"> {/* フッターの高さ分のパディング */}
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
