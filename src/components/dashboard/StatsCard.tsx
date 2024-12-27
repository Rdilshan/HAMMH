interface StatsCardProps {
  name:string
    title: string
    value: string
    icon: React.ReactNode;
    trend: number
  }
  
  export function StatsCard({ name,title, value, icon }: StatsCardProps) {
    let bgColor;
    let iconBgColor
  switch (name) {
    case 'Doctor':
      bgColor = 'bg-blue-500'; 
      iconBgColor = 'bg-blue-400';
      break;
    case 'Nurse':
      bgColor = 'bg-green-500'; 
      iconBgColor = 'bg-green-400';
      break;
    case 'Patient':
      bgColor = 'bg-red-500'; 
      iconBgColor = 'bg-red-400';
      break;
    case 'Staff':
      bgColor = 'bg-yellow-500'; 
      iconBgColor = 'bg-yellow-400';
      break;
    default:
      bgColor = 'bg-gray-500'; 
  }
    return (
      <div>
      
        <div className={`rounded-lg p-6 shadow-lg ${bgColor}`}>
        <div className="flex items-center justify-between">
        <div className={`rounded-full p-3 ${iconBgColor}`}>
          <span className="text-[30px] md:text-3xl text-white">{icon}</span>
          </div>
          <div>
            <p className="text-white font-semibold text-sm">{title}</p>
            <h3 className="text-2xl font-bold mt-1 text-white">{value}</h3>
          </div>
          
         
        </div>
       
      </div>
      </div>
      
    )
  }