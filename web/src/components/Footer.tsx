import { Link, useLocation } from 'react-router-dom'
import { Home, User } from 'react-feather' // アイコンの例

type NavItem = {
  path: string
  label: string
  icon: React.ReactNode
  badge?: number
}

const Footer = ({ className }: React.HTMLAttributes<HTMLElement>) => {
  const location = useLocation()

  const navItems: NavItem[] = [
    { 
      path: '/', 
      label: 'ホーム', 
      icon: <Home className="w-6 h-6" /> 
    },
    { 
      path: '/profile', 
      label: 'プロフィール', 
      icon: <User className="w-6 h-6" /> 
    },
    { 
      path: '/about', 
      label: 'アバウト', 
      icon: <User className="w-6 h-6" /> 
    },
  ]

  return (
    <footer className={`bg-white border-t border-gray-200 shadow-lg ${className || ''}`}>
      <nav className="max-w-lg mx-auto">
        <ul className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`relative flex flex-col items-center px-3 py-1
                  transition-colors duration-200 ease-in-out
                  hover:text-blue-500 active:scale-95
                  ${location.pathname === item.path 
                    ? 'text-blue-500' 
                    : 'text-gray-500'
                  }`}
              >
                {/* アイコンとバッジのコンテナ */}
                <div className="relative">
                  {item.icon}
                  {item.badge && (
                    <span className="absolute -top-1 -right-1
                      bg-red-500 text-white text-xs
                      w-4 h-4 rounded-full
                      flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                
                {/* ラベル */}
                <span className="mt-1 text-xs font-medium">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  )
}

export default Footer