import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password,
      })

      setSuccess('¡Login exitoso! Redirigiendo...')
      localStorage.setItem('token', response.data.token)
      setTimeout(() => navigate('/dashboard'), 2000)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error en el login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black pt-20 pb-20 flex items-center">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-8 backdrop-blur-xl">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">Iniciar Sesión</h1>
          <p className="text-gray-400 text-center mb-8">Bienvenido de vuelta a BigBet.MF</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg mb-4 animate-fade-in">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 bg-green-500/20 border border-green-500 text-green-300 p-3 rounded-lg mb-4 animate-fade-in">
              <CheckCircle size={20} />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border border-purple-500/30 text-white rounded-lg px-4 py-2 focus:border-purple-500 focus:outline-none transition placeholder-gray-500"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-purple-500/30 text-white rounded-lg px-4 py-2 focus:border-purple-500 focus:outline-none transition placeholder-gray-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 rounded bg-white/10 border-purple-500/30"
              />
              Recuérdame
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="#" className="text-purple-400 hover:text-purple-300 text-sm">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <p className="text-gray-400 text-center mt-6">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-purple-400 hover:text-purple-300 font-bold">Crea una</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
