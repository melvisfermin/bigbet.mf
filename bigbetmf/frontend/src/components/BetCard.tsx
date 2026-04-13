interface BetCardProps {
  event: string
  amount: number
  odds: number
  potential: number
  status: 'won' | 'lost' | 'pending' | 'cancelled'
}

export default function BetCard({ event, amount, odds, potential, status }: BetCardProps) {
  const statusColors = {
    won: 'bg-green-500/20 text-green-300 border-green-500',
    lost: 'bg-red-500/20 text-red-300 border-red-500',
    pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500',
    cancelled: 'bg-gray-500/20 text-gray-300 border-gray-500',
  }

  const statusLabels = {
    won: '✓ Ganado',
    lost: '✗ Perdido',
    pending: '⏳ Pendiente',
    cancelled: '❌ Cancelado',
  }

  return (
    <div className="bg-white/5 border border-purple-500/30 rounded-lg p-4 hover:bg-white/10 transition">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-400 text-sm">Evento</p>
          <p className="text-white font-bold">{event}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-bold border ${statusColors[status]}`}>
          {statusLabels[status]}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-gray-400 text-xs">Cantidad</p>
          <p className="text-white font-bold">${amount}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs">Cuota</p>
          <p className="text-purple-400 font-bold">{odds}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs">Potencial</p>
          <p className="text-green-400 font-bold">${potential}</p>
        </div>
      </div>
    </div>
  )
}
