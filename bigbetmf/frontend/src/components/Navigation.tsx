import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut, Wallet as WalletIcon } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [userBalance, setUserBalance] = useState(0)

  useEffect(() => {
    if (token) {
      setUserBalance(1250.50)
    }
  }, [token])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsOpen(false)
    navigate('/')
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-purple-500/30 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 flex items-center gap-2">
          🎰 BigBet.MF
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link to="/" className={`transition ${isActive('/') ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}>
            Inicio
          </Link>
          {token && (
            <>
              <Link to="/dashboard" className={`transition ${isActive('/dashboard') ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}>
                Dashboard
              </Link>
              <Link to="/betting" className={`transition ${isActive('/betting') ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}>
                Apostar
              </Link>
              <Link to="/wallet" className={`transition ${isActive('/wallet') ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}>
                Billetera
              </Link>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-purple-500/30">
                <WalletIcon size={18} className="text-purple-400" />
                <span className="text-white font-bold">${userBalance.toFixed(2)}</span>
              </div>
              <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300 transition">
                <LogOut size={18} /> Salir
              </button>
            </>
          )}
          {!token && (
            <>
              <Link to="/login" className="text-purple-400 hover:text-purple-300">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition">
                Registrarse
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/90 border-t border-purple-500/30 p-4 space-y-4">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-white hover:text-purple-400 py-2">
            Inicio
          </Link>
          {token && (
            <>
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block text-white hover:text-purple-400 py-2">
                Dashboard
              </Link>
              <Link to="/betting" onClick={() => setIsOpen(false)} className="block text-white hover:text-purple-400 py-2">
                Apostar
              </Link>
              <Link to="/wallet" onClick={() => setIsOpen(false)} className="block text-white hover:text-purple-400 py-2">
                Billetera
              </Link>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-purple-500/30 my-4">
                <WalletIcon size={18} className="text-purple-400" />
                <span className="text-white font-bold">${userBalance.toFixed(2)}</span>
              </div>
              <button onClick={handleLogout} className="block w-full text-left text-red-400 py-2">
                Salir
              </button>
            </>
          )}
          {!token && (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)} className="block text-purple-400 py-2">
                Iniciar Sesión
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded text-center">
                Registrarse
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
