export default function IncomeOverviewLoading () {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="h-7 w-40 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-9 w-20 bg-gray-200 rounded border animate-pulse"></div>
      </div>

      {/* Chart Area */}
      <div className="relative h-80 bg-gray-50 rounded-lg overflow-hidden">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-4 pr-4">
          <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Chart skeleton with animated gradient */}
        <div className="ml-12 mr-4 h-full relative">
          {/* Animated chart area */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-100 to-blue-50 opacity-30 animate-pulse">
            {/* Simulated chart curve */}
            <div className="absolute bottom-0 left-0 w-full h-3/4">
              <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                <path
                  d="M0,150 Q50,120 100,100 T200,80 T300,90 T400,70"
                  fill="none"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth="2"
                  className="opacity-30"
                />
                <path
                  d="M0,150 Q50,120 100,100 T200,80 T300,90 T400,70 L400,200 L0,200 Z"
                  fill="url(#gradient)"
                  className="opacity-20"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-px bg-gray-200 opacity-50"></div>
            ))}
          </div>
        </div>

        {/* X-axis labels */}
        <div className="absolute bottom-0 left-12 right-4 flex justify-between items-end pb-2">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((_month, index) => (
            <div key={index} className="h-4 w-6 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>

      {/* Additional skeleton elements for completeness */}
      <div className="mt-6 flex justify-center space-x-4">
        <div className="h-2 w-2 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="h-2 w-2 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="h-2 w-2 bg-gray-300 rounded-full animate-pulse"></div>
      </div>
    </div>
  )
}
