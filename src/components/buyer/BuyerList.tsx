import { lazy, Suspense, useState, type ReactNode } from "react"
import ListLoading from "../loader/ListLoading"
import TableOverlayLoading from "../loader/TableOverlayLoading"
import useDebounce from "@/hooks/useDebounce"
import ListHeader from "../common/ListHeader"
import { useGetBuyersQuery } from "@/redux/features/user/userApi"

const BuyerTable = lazy(() => import("./BuyerTable"));

const BuyerList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { searchTerm } = useDebounce({searchQuery, setCurrentPage}) //debounce handled
  const { data, isLoading, isFetching, isError, refetch } = useGetBuyersQuery([
    { name: "page", value: currentPage},
    { name: "limit", value: pageSize },
    { name: "searchTerm", value: searchTerm },
  ]);

  
  const buyers = data?.data || [];
  const meta = data?.meta || {};
 
  let content:ReactNode;

  if(isLoading){
    content = <ListLoading/>
  }

  if(!isLoading && !isError){
    content = <Suspense fallback={<ListLoading/>}>
      <BuyerTable buyers={buyers} meta={meta} currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={pageSize} setPageSize={setPageSize}/>
    </Suspense>
  }

  if(!isLoading && isError){
    content = <h1 className="text-red-500">Something Went Wrong</h1>
  }


  return (
    <div className="w-full mx-auto relative">
      {/* Header Part */}
       <ListHeader 
          title="Buyer List" 
          total={meta?.total} 
          onRefresh={refetch} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          isLoading={isLoading} 
          isFetching={isFetching}
       />
       
       {/* table part */}
      <div className="relative">
        {content}
        {!isLoading && isFetching && <TableOverlayLoading />}
      </div>
    </div>
  )
}


export default BuyerList;