import { useEffect, useState } from 'react'
import { TrendingUp, Wallet as WalletIcon, Trophy, History, ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import BetCard from '../components/BetCard'
import StatCard from '../components/StatCard'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [bets, setBets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setUser({
        name: 'Juan Pérez',
        balance: 1250.50,
        bonusBalance: 150,
        totalBets: 24,
        winRate: 62,
        weeklyGains: 125.50,
      })

      setBets([
        { id: 1, event: 'Real Madrid vs Barcelona', amount: 50, odds: 1.85, potential: 92.50, status: 'won' },
        { id: 2, event: 'Liverpool vs Manchester United', amount: 100, odds: 2.15, potential: 215, status: 'won' },
        { id: 3, event: 'PSG vs Lyon', amount: 75, odds: 1.95, potential: 146.25, status: 'pending' },
        { id: 4, event: 'Bayern Munich vs Dortmund', amount: 60, odds: 1.75, potential: 105, status: 'lost' },
      ])

      setLoading(false)
    }, 500)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-20 pb-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Bienvenido, {user?.name}</h1>
          <p className="text-gray-400">Aquí está tu resumen de apuestas y estadísticas</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Balance Total"
            value={`$${user?.balance.toFixed(2)}`}
            icon={<WalletIcon size={32} />}
            color="purple"
          />
          <StatCard
            title="Bonus Disponible"
            value={`$${user?.bonusBalance}`}
            icon={<TrendingUp size={32} />}
            color="pink"
            trend="+$10 disponibles"
          />
          <StatCard
            title="Tasa de Ganancia"
            value={`${user?.winRate}%`}
            icon={<Trophy size={32} />}
            color="green"
          />
          <StatCard
            title="Esta Semana"
            value={`+$${user?.weeklyGains}`}
            icon={<ArrowUpRight size={32} />}
            color="yellow"
          />
        </div>

        {/* Recent Bets + Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <History size={24} /> Apuestas Recientes
              </h2>
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {bets.map(bet => (
                  <BetCard
                    key={bet.id}
                    event={bet.event}
                    amount={bet.amount}
                    odds={bet.odds}
                    potential={bet.potential}
                    status={bet.status}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Acciones Rápidas</h3>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2 rounded-lg font-bold hover:shadow-lg transition flex items-center justify-center gap-2">
                  <ArrowDownLeft size={20} /> Depositar
                </button>
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg font-bold hover:shadow-lg transition flex items-center justify-center gap-2">
                  <ArrowUpRight size={20} /> Retirar
                </button>
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-bold hover:shadow-lg transition">
                  Nueva Apuesta
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Estadísticas</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Total Apuestas:</span>
                  <span className="text-white font-bold">{user?.totalBets}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Ganadas:</span>
                  <span className="text-green-400 font-bold">{Math.ceil(user?.totalBets * user?.winRate / 100)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Perdidas:</span>
                  <span className="text-red-400 font-bold">{Math.ceil(user?.totalBets * (100 - user?.winRate) / 100)}</span>
                </div>
                <div className="flex justify-between text-gray-400 pt-3 border-t border-purple-500/30">
                  <span>ROI:</span>
                  <span className="text-purple-400 font-bold">+12.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
