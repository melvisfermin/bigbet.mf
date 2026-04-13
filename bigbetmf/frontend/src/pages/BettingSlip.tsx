import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import EventCard from '../components/EventCard'

export default function BettingSlip() {
  const [betSlip, setBetSlip] = useState<any[]>([])
  const [stake, setStake] = useState('')

  const events = [
    { id: '1', name: 'Real Madrid vs Barcelona', sport: 'Fútbol', time: 'HOY 20:00', odds: { back: 1.85, draw: 2.15, lay: 3.50 } },
    { id: '2', name: 'Liverpool vs Manchester United', sport: 'Fútbol', time: 'HOY 15:00', odds: { back: 1.95, draw: 2.05, lay: 3.20 } },
    { id: '3', name: 'PSG vs Lyon', sport: 'Fútbol', time: 'HOY 18:30', odds: { back: 1.75, draw: 2.25, lay: 3.80 } },
    { id: '4', name: 'Bayern Munich vs Dortmund', sport: 'Fútbol', time: 'HOY 21:00', odds: { back: 2.10, draw: 2.00, lay: 3.10 } },
  ]

  const handleAddBet = (eventId: string, odds: number) => {
    const event = events.find(e => e.id === eventId)
    if (event && !betSlip.find(b => b.id === eventId)) {
      setBetSlip([...betSlip, { ...event, selectedOdds: odds }])
    }
  }

  const handleRemoveBet = (eventId: string) => {
    setBetSlip(betSlip.filter(b => b.id !== eventId))
  }

  const totalOdds = betSlip.reduce((acc, bet) => acc * bet.selectedOdds, 1)
  const totalStake = parseFloat(stake) || 0
  const potentialWinning = totalStake * totalOdds

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Nueva Apuesta</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Events */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">Eventos Disponibles</h2>
            <div className="space-y-6">
              {events.map(event => (
                <EventCard
                  key={event.id}
                  {...event}
                  onBet={(odds) => handleAddBet(event.id, odds)}
                />
              ))}
            </div>
          </div>

          {/* Betting Slip */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-6 sticky top-20">
              <h2 className="text-2xl font-bold text-white mb-6">Tu Apuesta</h2>

              {betSlip.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">No hay apuestas seleccionadas</p>
                  <p className="text-gray-500 text-sm">Haz clic en una cuota para agregar una apuesta</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto">
                    {betSlip.map(bet => (
                      <div key={bet.id} className="bg-white/10 rounded-lg p-4 border border-purple-500/20">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <p className="text-white font-bold text-sm">{bet.name}</p>
                            <p className="text-purple-400 text-sm">{bet.selectedOdds}</p>
                          </div>
                          <button
                            onClick={() => handleRemoveBet(bet.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 mb-6 border-t border-purple-500/30 pt-4">
                    <div className="flex justify-between text-gray-400">
                      <span>Cuota Total:</span>
                      <span className="text-white font-bold">{totalOdds.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Tipo:</span>
                      <span className="text-purple-400 font-bold">
                        {betSlip.length === 1 ? 'Simple' : `Parlay x${betSlip.length}`}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-white font-bold mb-2">Cantidad a Apostar</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-400">$</span>
                      <input
                        type="number"
                        value={stake}
                        onChange={(e) => setStake(e.target.value)}
                        className="w-full bg-white/10 border border-purple-500/30 text-white rounded-lg pl-8 pr-4 py-2 focus:border-purple-500 focus:outline-none"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="bg-purple-600/30 rounded-lg p-4 mb-6 border border-purple-500/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">Posible Ganancia:</span>
                      <span className="text-green-400 font-bold text-xl">${potentialWinning.toFixed(2)}</span>
                    </div>
                    <div className="text-gray-400 text-sm">
                      Apuesta: ${totalStake.toFixed(2)} × {totalOdds.toFixed(2)}
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition">
                    <Plus size={20} className="inline mr-2" />
                    Colocar Apuesta
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
