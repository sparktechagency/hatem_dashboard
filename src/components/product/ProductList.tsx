import { lazy, Suspense, useState, type ReactNode } from "react"
import { useGetContactListQuery } from "@/redux/features/contact/contactApi"
import ListLoading from "../loader/ListLoading"
import TableOverlayLoading from "../loader/TableOverlayLoading"
import useDebounce from "@/hooks/useDebounce"
import ListHeader from "../common/ListHeader"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"

const ProductTable = lazy(() => import("./ProductTable"));

const ProductList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const { searchTerm } = useDebounce({searchQuery, setCurrentPage})
  const { data, isLoading, isFetching, isError } = useGetContactListQuery([
    { name: "page", value: currentPage},
    { name: "limit", value: pageSize },
    { name: "searchTerm", value: searchTerm }
  ]);

  

  const contacts = data?.data || [];
  const meta = data?.meta || {};
 
  let content:ReactNode;

  if(isLoading){
    content = <ListLoading/>
  }

  if(!isLoading && !isError){
    content = <Suspense fallback={<ListLoading/>}>
      <ProductTable contacts={contacts} meta={meta} currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={pageSize} setPageSize={setPageSize}/>
    </Suspense>
  }

  if(!isLoading && isError){
    content = <h1 className="text-red-500">Something Went Wrong</h1>
  }


  return (
    <div className="w-full mx-auto relative">
      <ListHeader title="Product List" total={meta?.total} searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
        <Button onClick={() => navigate("/add-product")} className="bg-cyan-600 w-full sm:w-auto hover:bg-cyan-700 text-white">
          Add Product
        </Button>
      </ListHeader>
      <div className="relative">
        {content}
        {!isLoading && isFetching && <TableOverlayLoading />}
      </div>
    </div>
  )
}


export default ProductList;