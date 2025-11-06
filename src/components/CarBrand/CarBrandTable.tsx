import DeleteCategoryModal from "../modal/category/DeleteCategoryModal"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { ICardBrand } from "@/types/carBrand.type"
import CustomPagination from "../form/CustomPagination"
import type { IMeta } from "@/types/global.type";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"



type TCarBrandTableProps = {
  brands: ICardBrand[];
  meta: IMeta,
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}


const CarBrandTable = ({ brands, meta, currentPage, setCurrentPage, pageSize, setPageSize }: TCarBrandTableProps) => {
  return (
    <>
      <div className="border border-border rounded-lg bg-card overflow-hidden">
        <div className="relative">
          {/* Single table container with synchronized scrolling */}
          <div className="">
            <Table className="min-w-[800px]">
              <TableHeader className="sticky top-0 z-10 bg-yellow-50 border-b">
                <TableRow className="hover:bg-yellow-50">
                  <TableHead className="w-16 bg-yellow-50">S.N.</TableHead>
                  <TableHead className="min-w-32 bg-yellow-50">Name</TableHead>
                  <TableHead className="min-w-32 bg-yellow-50">Image</TableHead>
                  <TableHead className="min-w-24 bg-yellow-50">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {brands?.length > 0 ? (
                  brands.map((brand, index) => (
                    <TableRow key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-muted/30"}>
                      <TableCell className="w-16 text-muted-foreground">{Number(index + 1) + (meta?.page - 1) * pageSize}</TableCell>
                      <TableCell className="min-w-32 font-medium text-foreground">{brand?.brandName}</TableCell>
                      <TableCell className="min-w-32 font-medium text-foreground">
                        <img src={brand?.brandImage} alt="brandImg" className="h-[40px] w-[45px] rounded" />
                      </TableCell>
                      <TableCell className="min-w-24">
                        <div className="flex items-center gap-2">
                          {/* <UpdateCategoryModal category={brand} key={Math.random()}/> */}
                          <DeleteCategoryModal categoryId={brand?.brandId} key={Math.random()}/>
                        </div> 
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No brands found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div> 
       <div className="fixed bottom-0 flex left-0 w-full bg-white border-t py-3">
        <CustomPagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={meta?.totalPages} />
        {meta?.total > 50 && (
          <div className="flex flex-1 justify-end">
            <Select value={pageSize.toString()} aria-label="Results per page" onValueChange={(val) => {
              setCurrentPage(1)
              setPageSize(Number(val));
            }}>
              <SelectTrigger
                id="results-per-page"
                className="w-fit whitespace-nowrap"
              >
                <SelectValue placeholder="Select number of results" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 / page</SelectItem>
                <SelectItem value="20">20 / page</SelectItem>
                <SelectItem value="50">50 / page</SelectItem>
                <SelectItem value="100">100 / page</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </>
  )
}

export default CarBrandTable;