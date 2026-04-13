import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react'

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthDate: '',
    country: '',
    acceptTerms: false,
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPasswords, setShowPasswords] = useState({ password: false, confirm: false })

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

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (!formData.acceptTerms) {
      setError('Debes aceptar los términos y condiciones')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        birthDate: formData.birthDate,
        country: formData.country,
      })

      setSuccess('¡Registro exitoso! Redirigiendo...')
      localStorage.setItem('token', response.data.token)
      setTimeout(() => navigate('/dashboard'), 2000)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error en el registro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black pt-20 pb-20">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-8 backdrop-blur-xl">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">Crear Cuenta</h1>
          <p className="text-gray-400 text-center mb-8">Únete a BigBet.MF y comienza a ganar</p>

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

          <form onSubmit={handleSubmit} className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            <div>
              <label className="block text-white font-semibold mb-2">Nombre Completo</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border border-purple-500/30 text-white rounded-lg px-4 py-2 focus:border-purple-500 focus:outline-none transition placeholder-gray-500"
                placeholder="Juan Pérez"
              />
            </div>

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
                  type={showPasswords.password ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-purple-500/30 text-white rounded-lg px-4 py-2 focus:border-purple-500 focus:outline-none transition placeholder-gray-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(prev => ({ ...prev, password: !prev.password }))}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                >
                  {showPasswords.password ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Confirmar Contraseña</label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-purple-500/30 text-white rounded-lg px-4 py-2 focus:border-purple-500 focus:outline-none transition placeholder-gray-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                >
                  {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Teléfono</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-white/10 border border-purple-500/30 text-white rounded-lg px-4 py-2 focus:border-purple-500 focus:outline-none transition placeholder-gray-500"
                placeholder="+34 600 000 000"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Fecha de Nacimiento</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full bg-white/10 border border-purple-500/30 text-white rounded-lg px-4 py-2 focus:border-purple-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">País</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full bg-white/10 border border-purple-500/30 text-white rounded-lg px-4 py-2 focus:border-purple-500 focus:outline-none transition placeholder-gray-500"
                placeholder="España"
              />
            </div>

            <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="w-4 h-4 rounded bg-white/10 border-purple-500/30"
              />
              <span className="text-sm">Acepto los términos y condiciones</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </button>
          </form>

          <p className="text-gray-400 text-center mt-6 text-sm">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-purple-400 hover:text-purple-300 font-bold">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
