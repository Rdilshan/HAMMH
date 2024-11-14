interface OverviewCardProps {
  title: string
  count: number
  icon: string
}

export function OverviewCard({ title, count, icon }: OverviewCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">

      <div className="flex flex-col justify-center items-center gap-4">
        <div className="p-3 bg-gray-100 rounded-full">
          <span className="text-3xl text-orange-500">{icon}</span>
        </div>
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{title}</p>
          <h4 className="text-2xl font-bold text-black">{count}</h4>
        </div>
      </div>

    </div>

  )
}