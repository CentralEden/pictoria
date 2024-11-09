import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">ホーム</Link>
        <Link to="/about">アバウト</Link>
        <Link to="/contact">お問い合わせ</Link>
      </nav>
    </header>
  )
}

export default Header