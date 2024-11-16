import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const BaseTemplate = () => {
  return (
    <div className="flex flex-col bg-gray-50 h-dvh">
      <Header className="fixed top-0 left-0 right-0 z-10" />
      <main className="pt-8 pb-16">
        <Outlet />
      </main>
      <Footer className="fixed bottom-0 left-0 right-0 z-10" />
    </div>
  )
}

export default BaseTemplate
