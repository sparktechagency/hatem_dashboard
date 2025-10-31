import { lazy, Suspense, type ReactNode } from "react"
import ListLoading from "../loader/ListLoading";
import TableOverlayLoading from "../loader/TableOverlayLoading";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useGetBrandsQuery } from "@/redux/features/brand/brandApi";

const CarBrandTable = lazy(() => import("./CarBrandTable"));


const CarBrandList = () => {
  const navigate = useNavigate();
  const { data, isLoading, isFetching, isError } = useGetBrandsQuery(undefined);
  const brands = data?.data || [];

 
  let content:ReactNode;

  if(isLoading){
    content = <ListLoading/>
  }

  if(!isLoading && !isError){
    content = <Suspense fallback={<ListLoading/>}>
      <CarBrandTable brands={brands} />
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
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Car Brand List</h1>
          <div className="flex items-center">
            <span className="text-sm sm:text-base text-gray-600">Total:</span>
            <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 font-semibold rounded-full text-sm">
              {brands?.length || 0}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Button onClick={() => navigate("/add-brand")} className="bg-cyan-600 w-full sm:w-auto hover:bg-cyan-700 text-white">
            Add Brand
          </Button>
        </div>
      </div>
      <div className="relative h-[700px] overflow-y-auto">
        {content}
        {!isLoading && isFetching && <TableOverlayLoading />}
      </div>
    </div>
  )
}


export default CarBrandList;