export default function UserOverviewLoading() {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-white">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="h-6 sm:h-8 w-24 sm:w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-8 sm:h-10 w-16 sm:w-20 bg-gray-200 rounded border animate-pulse"></div>
      </div>

      {/* Chart Container */}
      <div className="relative overflow-hidden">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-[40vh] flex flex-col justify-between text-xs sm:text-sm text-gray-400 pr-2 sm:pr-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-3 sm:h-4 w-6 sm:w-8 bg-gray-200 rounded animate-pulse"
            ></div>
          ))}
        </div>

        {/* Chart Area */}
        <div className="ml-8 sm:ml-12 border-l border-b border-gray-200 relative">
          {/* Grid lines */}
          <div className="absolute ml-8 sm:ml-12 w-full h-[40vh]">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full border-t border-gray-100"
                style={{ top: `${i * 20}%` }}
              ></div>
            ))}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute h-full border-l border-gray-100"
                style={{ left: `${(i + 1) * (100 / 13)}%` }}
              ></div>
            ))}
          </div>

          {/* Skeleton Bars */}
          <div className="flex items-end justify-between h-[40vh] px-2 sm:px-4 relative">
            {[
              90, 80, 120, 110, 150, 145, 155, 180, 135, 210, 185, 230,
            ].map((h, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className="w-6 sm:w-8 md:w-10 lg:w-12 bg-gray-300 rounded-t animate-pulse mb-1 sm:mb-2"
                  style={{ height: `${h}px` }}
                ></div>
              </div>
            ))}
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between px-2 sm:px-4 pt-2 sm:pt-4 text-xs sm:text-sm">
            {[
              "Jan", "Feb", "Mar", "Apr", "May", "Jun",
              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            ].map((month) => (
              <div
                key={month}
                className="h-3 sm:h-4 w-4 sm:w-6 bg-gray-200 rounded animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
