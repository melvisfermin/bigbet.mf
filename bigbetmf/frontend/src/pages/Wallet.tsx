import { useState } from 'react'
import { ArrowDownLeft, ArrowUpRight, Plus } from 'lucide-react'

export default function Wallet() {
  const [activeTab, setActiveTab] = useState('transactions')
  const [balance] = useState(1250.50)
  const [bonusBalance] = useState(150)

  const transactions = [
    { id: 1, type: 'deposit', amount: 100, description: 'Depósito via Tarjeta', date: '2024-01-15', status: 'completed' },
    { id: 2, type: 'win', amount: 125.50, description: 'Ganancia de apuesta', date: '2024-01-14', status: 'completed' },
    { id: 3, type: 'bet', amount: 50, description: 'Apuesta en Real Madrid vs Barcelona', date: '2024-01-13', status: 'completed' },
    { id: 4, type: 'withdrawal', amount: 200, description: 'Retiro a Tarjeta', date: '2024-01-12', status: 'pending' },
    { id: 5, type: 'bonus', amount: 10, description: 'Bonus de Bienvenida', date: '2024-01-10', status: 'completed' },
  ]

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit': return <ArrowDownLeft className="text-green-400" size={20} />
      case 'withdrawal': return <ArrowUpRight className="text-red-400" size={20} />
      case 'win': return <ArrowDownLeft className="text-purple-400" size={20} />
      case 'bet': return <ArrowUpRight className="text-orange-400" size={20} />
      case 'bonus': return <Plus className="text-yellow-400" size={20} />
      default: return null
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'deposit': return 'bg-green-500/20 text-green-300 border-green-500'
      case 'withdrawal': return 'bg-red-500/20 text-red-300 border-red-500'
      case 'win': return 'bg-purple-500/20 text-purple-300 border-purple-500'
      case 'bet': return 'bg-orange-500/20 text-orange-300 border-orange-500'
      case 'bonus': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500'
      default: return ''
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Mi Billetera</h1>

        {/* Balance Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <p className="text-sm opacity-90 mb-2">Balance Principal</p>
            <h2 className="text-4xl font-bold mb-6">${balance.toFixed(2)}</h2>
            <div className="flex gap-3">
              <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-bold hover:shadow-lg transition flex items-center gap-2">
                <ArrowDownLeft size={18} /> Depositar
              </button>
              <button className="border-2 border-white text-white px-6 py-2 rounded-lg font-bold hover:bg-white/10 transition flex items-center gap-2">
                <ArrowUpRight size={18} /> Retirar
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-600 to-orange-600 rounded-2xl p-8 text-white">
            <p className="text-sm opacity-90 mb-2">Balance de Bonus</p>
            <h2 className="text-4xl font-bold mb-6">${bonusBalance.toFixed(2)}</h2>
            <div className="space-y-2 text-sm opacity-90">
              <p>✓ Utilizable en todas las apuestas</p>
              <p>✓ No tiene fecha de vencimiento</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg overflow-hidden">
          <div className="flex border-b border-purple-500/30">
            <button
              onClick={() => setActiveTab('transactions')}
              className={`flex-1 py-4 px-6 font-bold transition ${
                activeTab === 'transactions'
                  ? 'bg-purple-600/30 text-white border-b-2 border-purple-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Historial de Transacciones
            </button>
            <button
              onClick={() => setActiveTab('methods')}
              className={`flex-1 py-4 px-6 font-bold transition ${
                activeTab === 'methods'
                  ? 'bg-purple-600/30 text-white border-b-2 border-purple-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Métodos de Pago
            </button>
          </div>

          {activeTab === 'transactions' && (
            <div className="p-6">
              <div className="space-y-4">
                {transactions.map(transaction => (
                  <div
                    key={transaction.id}
                    className="bg-white/5 border border-purple-500/20 rounded-lg p-4 flex items-center justify-between hover:bg-white/10 transition"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-3 bg-white/10 rounded-lg">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-bold">{transaction.description}</p>
                        <p className="text-gray-400 text-sm">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${transaction.type === 'bet' || transaction.type === 'withdrawal' ? 'text-red-400' : 'text-green-400'}`}>
                        {transaction.type === 'bet' || transaction.type === 'withdrawal' ? '-' : '+'}${transaction.amount.toFixed(2)}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full inline-block mt-1 border ${getTransactionColor(transaction.type)}`}>
                        {transaction.status === 'completed' ? 'Completado' : 'Pendiente'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'methods' && (
            <div className="p-6">
              <div className="space-y-4">
                <div className="bg-white/5 border border-purple-500/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-bold">Tarjeta de Crédito</h3>
                    <button className="text-purple-400 hover:text-purple-300">Editar</button>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">**** **** **** 4242</p>
                  <p className="text-gray-400 text-sm">Expira: 12/25</p>
                </div>

                <div className="bg-white/5 border border-purple-500/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-bold">PayPal</h3>
                    <button className="text-red-400 hover:text-red-300">Remover</button>
                  </div>
                  <p className="text-gray-400 text-sm">email@example.com</p>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2">
                  <Plus size={20} /> Agregar Método de Pago
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
