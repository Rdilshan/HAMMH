interface OverviewCardProps {
    title: string
    count: number
    icon: string
  }
  
  export function OverviewCard({ title, count, icon }: OverviewCardProps) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex flex-col justify-center items-center">
          <span className="text-2xl">{icon}</span>
          <div className="flex flex-col justify-center items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">{title}</p>
            <h4 className="text-xl font-bold mt-1 dark:text-gray-600">{count}</h4>
          </div>
        </div>
      </div>
    )
  }