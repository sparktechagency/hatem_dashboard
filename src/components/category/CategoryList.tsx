
import { lazy, Suspense, useState, type ReactNode } from "react"
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi"
import ListLoading from "../loader/ListLoading";
import TableOverlayLoading from "../loader/TableOverlayLoading";
import ListHeader from "../common/ListHeader";
import CreateCategoryModal from "../modal/category/CreateCategoryModal";

const CategoryTable = lazy(() => import("./CategoryTable"));


const CategoryList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, isFetching, isError } = useGetCategoriesQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize }
  ]);

  const categories = data?.data || [];
  const meta = data?.meta || {};
 
  let content:ReactNode;

  if(isLoading){
    content = <ListLoading/>
  }

  if(!isLoading && !isError){
    content = <Suspense fallback={<ListLoading/>}>
      <CategoryTable categories={categories} meta={meta} currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={pageSize} setPageSize={setPageSize}/>
    </Suspense>
  }

  if(!isLoading && isError){
    content = <h1 className="text-red-500">Something Went Wrong</h1>
  }

  return (
    <div className="w-full mx-auto relative">
      {/* Header Part */}
      <ListHeader title="Category List" total={categories?.total}>
         <CreateCategoryModal/>
      </ListHeader>
      <div className="relative">
        {content}
        {!isLoading && isFetching && <TableOverlayLoading />}
      </div>
    </div>
  )
}


export default CategoryList;