import { Link } from 'react-router-dom'

const Header = ({ className }: React.HTMLAttributes<HTMLElement>) => {
  return (
    <header className={`bg-white border-t border-gray-200 shadow-lg ${className || ''}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 h-8">
        <Link to="/">ホーム</Link>
        <Link to="/about">アバウト</Link>
        <Link to="/contact">お問い合わせ</Link>
      </nav>
    </header>
  )
}

export default Header