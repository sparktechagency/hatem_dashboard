import { lazy, Suspense, type ReactNode } from "react"
import ListLoading from "../loader/ListLoading";
import TableOverlayLoading from "../loader/TableOverlayLoading";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useGetBrandsQuery } from "@/redux/features/brand/brandApi";
import ListHeader from "../common/ListHeader";

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
      {/* Header part */}
      <ListHeader title="Car Brand List" total={brands?.length}>
        <Button onClick={() => navigate("/add-brand")} className="bg-cyan-600 w-full sm:w-auto hover:bg-cyan-700 text-white">
          Add Brand
        </Button>
      </ListHeader>

      {/* table part */}
      <div className="relative h-[700px] overflow-y-auto">
        {content}
        {!isLoading && isFetching && <TableOverlayLoading />}
      </div>
    </div>
  )
}


export default CarBrandList;