import DeleteCategoryModal from "../modal/category/DeleteCategoryModal"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { ICardBrand } from "@/types/carBrand.type"


type TCarBrandTableProps = {
    brands: ICardBrand[]
}


const CarBrandTable = ({ brands }: TCarBrandTableProps) => {
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
                      <TableCell className="w-16 text-muted-foreground">{index + 1}</TableCell>
                      <TableCell className="min-w-32 font-medium text-foreground">{brand?.brandName}</TableCell>
                      <TableCell className="min-w-32 font-medium text-foreground">
                        <img src={brand?.brandImage} alt="brandImg" className="h-[45px] w-[45px]" />
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
    </>
  )
}

export default CarBrandTable;