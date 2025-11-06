import { useGetOrdersQuery } from "@/redux/features/order/orderApi";
import { useNavigate } from "react-router-dom";
import { lazy, Suspense, type ReactNode } from "react";
import RecentOrderLoading from "../loader/RecentOrderLoading";


const RecentOrderTable = lazy(() => import("./RecentOrderTable"));


const RecentOrderList = () => {
    const navigate = useNavigate();
    const { data, isLoading, isError } = useGetOrdersQuery([
        { name: "page", value: 1 },
        { name: "limit", value: 5 },
    ]);
    
    const orders = data?.data || [];
    let content: ReactNode;

    if (isLoading) {
        content = <RecentOrderLoading />
    }

    if (!isLoading && !isError) {
        content = <Suspense fallback={<RecentOrderLoading />}>
             <RecentOrderTable orders={orders}/>
        </Suspense>
    }



    return (
        <div className="w-full mx-auto relative bg-white p-4 rounded-md mt-4 shadow">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex justify-between items-center gap-3 w-full">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Recent Orders</h1>
                    <button onClick={() => navigate('/orders')} className="text-sm cursor-pointer text-blue-600 hover:underline">View All</button>
                </div>
            </div>

            {/* Table Container with Fixed Height and Scrolling */}
            <div className="border border-border rounded-lg bg-card overflow-hidden">
                <div className="relative">
                  {content}
                </div>
            </div>
        </div>
    )
}


export default RecentOrderList;