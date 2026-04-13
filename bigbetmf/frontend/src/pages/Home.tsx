import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp, Shield, Zap, Users, Trophy, Clock } from 'lucide-react'
import StatCard from '../components/StatCard'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black pt-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
              Bienvenido a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">BigBet.MF</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              La plataforma de apuestas deportivas más moderna, segura y confiable del mercado. Apuesta en tus equipos favoritos y gana premios increíbles con cuotas competitivas.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/register" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg transform hover:scale-105 transition flex items-center gap-2">
                Comenzar Ahora <ArrowRight size={20} />
              </Link>
              <Link to="/login" className="border-2 border-purple-600 text-purple-400 px-8 py-3 rounded-lg font-bold hover:bg-purple-600/10 transition">
                Iniciar Sesión
              </Link>
            </div>
          </div>
          <div className="hidden md:block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border border-purple-500/30 backdrop-blur-xl">
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4 border border-purple-500/20">
                  <p className="text-gray-400 text-sm">⚽ Próximo Evento</p>
                  <p className="text-white text-lg font-bold mt-1">Real Madrid vs Barcelona</p>
                  <p className="text-purple-400 text-sm mt-2">HOY • 20:00 CET</p>
                  <div className="flex gap-2 mt-3">
                    <span className="px-2 py-1 bg-purple-600/50 text-purple-300 rounded text-xs font-bold">1.85</span>
                    <span className="px-2 py-1 bg-purple-600/50 text-purple-300 rounded text-xs font-bold">2.15</span>
                    <span className="px-2 py-1 bg-purple-600/50 text-purple-300 rounded text-xs font-bold">3.50</span>
                  </div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 border border-purple-500/20">
                  <p className="text-gray-400 text-sm">💰 Tu Balance</p>
                  <p className="text-white text-2xl font-bold mt-1">$1,250.50</p>
                  <p className="text-green-400 text-sm mt-2">+$125.50 esta semana 📈</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-6">
        <StatCard title="Usuarios Activos" value="50K+" icon={<Users size={32} />} color="purple" />
        <StatCard title="Eventos Diarios" value="500+" icon={<Trophy size={32} />} color="pink" />
        <StatCard title="Pagos Procesados" value="$2.5M" icon={<TrendingUp size={32} />} color="green" />
        <StatCard title="Soporte 24/7" value="Disponible" icon={<Clock size={32} />} color="blue" />
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-12">¿Por qué elegir BigBet.MF?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 border border-purple-500/30 rounded-xl p-8 hover:bg-white/10 hover:border-purple-500/60 transition">
            <Shield className="text-purple-400 mb-4" size={40} />
            <h3 className="text-xl font-bold text-white mb-3">100% Seguro</h3>
            <p className="text-gray-400 leading-relaxed">Licenciado y regulado a nivel internacional. Tu dinero y datos están completamente protegidos con encriptación de nivel bancario.</p>
          </div>
          <div className="bg-white/5 border border-purple-500/30 rounded-xl p-8 hover:bg-white/10 hover:border-purple-500/60 transition">
            <TrendingUp className="text-pink-400 mb-4" size={40} />
            <h3 className="text-xl font-bold text-white mb-3">Cuotas Competitivas</h3>
            <p className="text-gray-400 leading-relaxed">Las mejores cuotas del mercado en todos los eventos deportivos. Garantizamos rentabilidad en tus apuestas.</p>
          </div>
          <div className="bg-white/5 border border-purple-500/30 rounded-xl p-8 hover:bg-white/10 hover:border-purple-500/60 transition">
            <Zap className="text-yellow-400 mb-4" size={40} />
            <h3 className="text-xl font-bold text-white mb-3">Retiradas Rápidas</h3>
            <p className="text-gray-400 leading-relaxed">Retira tus ganancias en minutos sin esperas. Soportamos múltiples métodos de pago y procesamiento inmediato.</p>
          </div>
        </div>
      </section>

      {/* Events Preview */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-white mb-12">Próximos Eventos en Vivo</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { sport: '⚽ Fútbol', match: 'Liverpool vs Manchester United', time: 'HOY 15:00', odds: '1.95' },
            { sport: '🏀 Baloncesto', match: 'Lakers vs Celtics', time: 'HOY 18:30', odds: '2.10' },
            { sport: '🎾 Tenis', match: 'Djokovic vs Alcaraz', time: 'HOY 12:00', odds: '1.75' },
            { sport: '🏈 Fútbol Americano', match: 'Cowboys vs Eagles', time: 'HOY 21:00', odds: '2.05' },
          ].map((event, i) => (
            <div key={i} className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg p-6 hover:border-purple-500/60 hover:from-purple-600/30 hover:to-pink-600/30 transition cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-400 text-sm">{event.sport}</p>
                  <h3 className="text-white font-bold text-lg">{event.match}</h3>
                </div>
                <p className="text-gray-400 text-sm">{event.time}</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded transition">1</button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded transition">X</button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded transition">2</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-20 mb-20">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-pink-600/50 opacity-50"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-4">¿Listo para Comenzar?</h2>
            <p className="text-lg text-white/90 mb-8">Únete a miles de apostadores ganadores en BigBet.MF. Recibe $10 de bonus al registrarte.</p>
            <Link to="/register" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:shadow-lg transform hover:scale-105 transition inline-block">
              Registrarse Gratis
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
