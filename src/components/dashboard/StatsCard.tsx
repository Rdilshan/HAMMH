interface StatsCardProps {
    title: string
    value: string
    icon: string
    trend: number
  }
  
  export function StatsCard({ title, value, icon, trend }: StatsCardProps) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{title}</p>
            <h3 className="text-2xl font-bold mt-1 dark:text-white">{value}</h3>
          </div>
          <span className="text-3xl">{icon}</span>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className={trend >= 0 ? 'text-green-500' : 'text-red-500'}>
            {trend}%
          </span>
          <span className="text-gray-600 dark:text-gray-400 text-sm">vs last month</span>
        </div>
      </div>
    )
  }