
import { lazy, Suspense, type ReactNode } from "react"
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi"
import ListLoading from "../loader/ListLoading";
import TableOverlayLoading from "../loader/TableOverlayLoading";
import ListHeader from "../common/ListHeader";
import CreateCategoryModal from "../modal/category/CreateCategoryModal";

const CategoryTable = lazy(() => import("./CategoryTable"));


const CategoryList = () => {
  const { data, isLoading, isFetching, isError } = useGetCategoriesQuery(undefined);
  const categories = data?.data || [];
 
  let content:ReactNode;

  if(isLoading){
    content = <ListLoading/>
  }

  if(!isLoading && !isError){
    content = <Suspense fallback={<ListLoading/>}>
      <CategoryTable categories={categories} />
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