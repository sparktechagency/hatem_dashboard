
import { lazy, Suspense, type ReactNode } from "react"
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi"
import ListLoading from "../loader/ListLoading";
import TableOverlayLoading from "../loader/TableOverlayLoading";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const ProductTable = lazy(() => import("./ProductTable"));


const ProductList = () => {
  const { data, isLoading, isFetching, isError } = useGetCategoriesQuery(undefined);
  const categories = data?.data || [];
  const navigate = useNavigate();
 
  let content:ReactNode;

  if(isLoading){
    content = <ListLoading/>
  }

  if(!isLoading && !isError){
    content = <Suspense fallback={<ListLoading/>}>
      <ProductTable categories={categories} />
    </Suspense>
  }

  if(!isLoading && isError){
    content = <h1 className="text-red-500">Something Went Wrong</h1>
  }

  return (
    <div className="w-full mx-auto relative">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex justify-between items-center gap-3 w-full sm:w-auto">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Product List</h1>
          <div className="flex items-center">
            <span className="text-sm sm:text-base text-gray-600">Total:</span>
            <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 font-semibold rounded-full text-sm">
              {categories?.length || 0}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Button onClick={() => navigate("/add-product")} className="bg-cyan-600 w-full sm:w-auto hover:bg-cyan-700 text-white">
            Add Product
          </Button>
        </div>
      </div>
      <div className="relative">
        {content}
        {!isLoading && isFetching && <TableOverlayLoading />}
      </div>
    </div>
  )
}


export default ProductList;