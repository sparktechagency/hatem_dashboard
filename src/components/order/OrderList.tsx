import { lazy, Suspense, useState, type ReactNode } from "react"
import ListLoading from "../loader/ListLoading"
import TableOverlayLoading from "../loader/TableOverlayLoading"
import useDebounce from "@/hooks/useDebounce"
import ListHeader from "../common/ListHeader"
import { useGetOrdersQuery } from "@/redux/features/order/orderApi"

const OrderTable = lazy(() => import("./OrderTable"));

const OrderList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const { searchTerm } = useDebounce({searchQuery, setCurrentPage}) //debounce handled
  const { data, isLoading, isFetching, isError } = useGetOrdersQuery([
    { name: "page", value: currentPage},
    { name: "limit", value: pageSize },
    { name: "searchTerm", value: searchTerm }
  ]);

  
  const orders = data?.data || [];
  const meta = data?.meta || {};
 
  let content:ReactNode;

  if(isLoading){
    content = <ListLoading/>
  }

  if(!isLoading && !isError){
    content = <Suspense fallback={<ListLoading/>}>
      <OrderTable orders={orders} meta={meta} currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={pageSize} setPageSize={setPageSize}/>
    </Suspense>
  }

  if(!isLoading && isError){
    content = <h1 className="text-red-500">Something Went Wrong</h1>
  }


  return (
    <div className="w-full mx-auto relative">
      {/* Header Part */}
       <ListHeader title="Order List" total={meta?.total} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
       
       {/* table part */}
      <div className="relative">
        {content}
        {!isLoading && isFetching && <TableOverlayLoading />}
      </div>
    </div>
  )
}


export default OrderList;