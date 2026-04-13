import { ReactNode } from 'react'

interface StatCardProps {
  title: string
  value: string | number
  icon: ReactNode
  color: 'purple' | 'pink' | 'green' | 'yellow' | 'blue'
  trend?: string
}

export default function StatCard({ title, value, icon, color, trend }: StatCardProps) {
  const colorMap = {
    purple: 'text-purple-400',
    pink: 'text-pink-400',
    green: 'text-green-400',
    yellow: 'text-yellow-400',
    blue: 'text-blue-400',
  }

  return (
    <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg p-6 hover:border-purple-500/60 transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <p className="text-white text-3xl font-bold">{value}</p>
          {trend && <p className={`text-sm ${trend.includes('+') ? 'text-green-400' : 'text-red-400'}`}>{trend}</p>}
        </div>
        <div className={`text-3xl ${colorMap[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  )
}
