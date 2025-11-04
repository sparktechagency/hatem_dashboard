import { lazy, Suspense, useState, type ReactNode } from "react"
import ListLoading from "../loader/ListLoading"
import TableOverlayLoading from "../loader/TableOverlayLoading"
import useDebounce from "@/hooks/useDebounce"
import ListHeader from "../common/ListHeader"
import { useGetOrdersQuery } from "@/redux/features/order/orderApi"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const OrderTable = lazy(() => import("./OrderTable"));

const OrderList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("")
  const [pageSize, setPageSize] = useState(10);
  const { searchTerm } = useDebounce({searchQuery, setCurrentPage}) //debounce handled
  const { data, isLoading, isFetching, isError, refetch } = useGetOrdersQuery([
    { name: "page", value: currentPage},
    { name: "limit", value: pageSize },
    { name: "searchTerm", value: searchTerm },
    { name: "status", value: status ==="all" ? "" : status },
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
       <ListHeader 
          title="Order List" 
          total={meta?.total} 
          onRefresh={refetch} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          isLoading={isLoading} 
          isFetching={isFetching}
          leftField={
            <>
              <Select
                value={status} onValueChange={(val) => {
                  setStatus(val)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="PROCESSING">Processing</SelectItem>
                    <SelectItem value="DELIVERED">Delivered</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </>
          }
       />
       
       {/* table part */}
      <div className="relative">
        {content}
        {!isLoading && isFetching && <TableOverlayLoading />}
      </div>
    </div>
  )
}


export default OrderList;