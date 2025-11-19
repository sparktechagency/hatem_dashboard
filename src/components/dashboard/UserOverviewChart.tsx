import { useState } from "react";
import {
   BarChart,
   Bar,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
} from "recharts";
import { yearOptions } from "../../data/options.data";
import { useGetUserGrowthQuery } from "@/redux/features/dashboard/dashboardApi";

const UserOverviewChart = () => {
   const date = new Date();
   const currentYear = date.getFullYear().toString();
   const [selectedYear, setSelectedYear] = useState(currentYear);
   const { data, isLoading, isFetching, isError } =
      useGetUserGrowthQuery(selectedYear);

   const barData = (() => {
      const payload: any = (data as any)?.data ?? (data as any);
      const list = Array.isArray(payload)
         ? payload
         : payload?.userGrowthByMonth ?? payload?.userGrowth ?? [];

      if (!Array.isArray(list)) return [];

      // If list contains per-role breakdown (role + count), aggregate per month
      if (list.length && list[0].role !== undefined) {
         const map = new Map<string, number>();
         list.forEach((item: any) => {
            const month = item.month ?? item.label ?? item.name;
            const cnt = item.count ?? item.total ?? 0;
            map.set(month, (map.get(month) ?? 0) + cnt);
         });
         return Array.from(map.entries()).map(([month, users]) => ({
            month,
            users,
         }));
      }

      // If list already has `month` and `users` fields
      if (list.length && list[0].users !== undefined) {
         return list.map((i: any) => ({ month: i.month, users: i.users }));
      }

      // If list has `month` and `count` (already aggregated), map to {month, users}
      if (list.length && list[0].count !== undefined) {
         return list.map((i: any) => ({ month: i.month, users: i.count }));
      }

      return [];
   })();

   if (isLoading || isFetching) {
      return (
         <div className="md:p-6 bg-white rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-bold">User Overview</h2>
               <select
                  className="border bg-white rounded px-2 py-1"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
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
               <h2 className="text-xl font-bold">User Overview</h2>
               <select
                  className="border bg-white rounded px-2 py-1"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
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
            <h2 className="text-xl font-bold">User Overview</h2>
            <select
               className="border bg-white rounded px-2 py-1"
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
            <ResponsiveContainer width="100%" height="100%">
               <BarChart
                  data={barData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 30 }}
               >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis
                  // domain={domain}
                  // ticks={ticks}
                  // tickFormatter={(value) =>
                  //   new Intl.NumberFormat('en').format(value)
                  // }
                  />
                  <Tooltip
                     formatter={(value) => [
                        new Intl.NumberFormat("en").format(value as number),
                        "users",
                     ]}
                     cursor={{ fill: "#E7F0FA" }}
                  />
                  <Bar dataKey="users" fill="#22385C" radius={[4, 4, 0, 0]} />
               </BarChart>
            </ResponsiveContainer>
         </div>
      </div>
   );
};

export default UserOverviewChart;
