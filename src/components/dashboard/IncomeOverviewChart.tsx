import { useState } from "react";
import {
   AreaChart,
   Area,
   XAxis,
   YAxis,
   Tooltip,
   ResponsiveContainer,
} from "recharts";
import { yearOptions } from "../../data/options.data";
import { useGetIncomeGrowthQuery } from "@/redux/features/dashboard/dashboardApi";

const IncomeOverviewChart = () => {
   const date = new Date();
   const currentYear = date.getFullYear().toString();
   const [selectedYear, setSelectedYear] = useState(currentYear);
   const { data, isLoading, isError, isFetching } =
      useGetIncomeGrowthQuery(selectedYear);

   const barData = (() => {
      const payload: any = (data as any)?.data ?? (data as any);
      if (!payload) return [];

      // If payload is already an array of items
      if (Array.isArray(payload)) {
         return payload.map((item: any) => ({
            month: item.month ?? item.label ?? item.name,
            income: item.income ?? item.total ?? item.value ?? 0,
         }));
      }

      // If payload is an object containing `earningGrowth`
      const growth = payload?.earningGrowth ?? payload?.earningGrowth;
      if (Array.isArray(growth)) {
         return growth.map((item: any) => ({
            month: item.month ?? item.label ?? item.name,
            income: item.income ?? item.total ?? item.value ?? 0,
         }));
      }

      return [];
   })();

   if (isLoading || isFetching) {
      return (
         <div className="md:p-6 bg-white rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-bold">Income Overview</h2>
               <select
                  className="border rounded px-2 py-1 bg-white"
                  value={selectedYear}
                  disabled
               >
                  {yearOptions.map((year) => (
                     <option key={year} value={year}>
                        {year}
                     </option>
                  ))}
               </select>
            </div>
            <div className="h-80 flex items-center justify-center">
               Loading...
            </div>
         </div>
      );
   }

   if (!isLoading && isError) {
      return (
         <div className="md:p-6 bg-white rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-bold">Income Overview</h2>
               <select
                  className="border rounded px-2 py-1 bg-white"
                  value={selectedYear}
                  disabled
               >
                  {yearOptions.map((year) => (
                     <option key={year} value={year}>
                        {year}
                     </option>
                  ))}
               </select>
            </div>
            <div className="h-80 text-red-500">Server Error Occurred</div>
         </div>
      );
   }

   return (
      <div className="md:p-6 bg-white rounded-lg shadow-sm">
         <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Income Overview</h2>
            <select
               className="border rounded px-2 py-1 bg-white"
               value={selectedYear}
               onChange={(e) => setSelectedYear(e.target.value)}
            >
               {yearOptions.map((year) => (
                  <option key={year} value={year}>
                     {year}
                  </option>
               ))}
            </select>
         </div>

         <div className="h-80">
            <ResponsiveContainer width="100%" height={300}>
               <AreaChart data={barData}>
                  <defs>
                     <linearGradient
                        id="colorBookings"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                     >
                        <stop
                           offset="5%"
                           stopColor="#007bff"
                           stopOpacity={0.8}
                        />
                        <stop
                           offset="95%"
                           stopColor="#007bff"
                           stopOpacity={0}
                        />
                     </linearGradient>
                  </defs>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                     type="monotone"
                     dataKey="income"
                     stroke="#007bff"
                     fillOpacity={1}
                     fill="url(#colorBookings)"
                  />
               </AreaChart>
            </ResponsiveContainer>
         </div>
      </div>
   );
};

export default IncomeOverviewChart;
