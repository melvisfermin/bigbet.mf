import { useState } from 'react'

interface EventCardProps {
  id: string
  name: string
  sport: string
  time: string
  odds: { back: number; draw: number; lay: number }
  onBet?: (odds: number) => void
}

export default function EventCard({ id, name, sport, time, odds, onBet }: EventCardProps) {
  const [selectedOdd, setSelectedOdd] = useState<number | null>(null)

  return (
    <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg p-6 hover:border-purple-500/60 transition">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-400 text-sm">⚽ {sport}</p>
          <h3 className="text-white font-bold text-lg">{name}</h3>
        </div>
        <p className="text-gray-400 text-sm">{time}</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => {
            setSelectedOdd(odds.back)
            onBet?.(odds.back)
          }}
          className={`py-2 rounded font-bold transition ${selectedOdd === odds.back ? 'bg-purple-700 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
        >
          {odds.back}
        </button>
        <button
          onClick={() => {
            setSelectedOdd(odds.draw)
            onBet?.(odds.draw)
          }}
          className={`py-2 rounded font-bold transition ${selectedOdd === odds.draw ? 'bg-purple-700 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
        >
          {odds.draw}
        </button>
        <button
          onClick={() => {
            setSelectedOdd(odds.lay)
            onBet?.(odds.lay)
          }}
          className={`py-2 rounded font-bold transition ${selectedOdd === odds.lay ? 'bg-purple-700 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
        >
          {odds.lay}
        </button>
      </div>
    </div>
  )
}
