import { useState } from "react";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import CustomPagination from "../form/CustomPagination";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "../ui/select";
import type { IMeta } from "@/types/global.type";
import type { IProduct } from "@/types/product.type";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DeleteProductModal from "../modal/product/ProductDeleteModal";

type TProps = {
   products: IProduct[];
   meta: IMeta;
   currentPage: number;
   setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
   pageSize: number;
   setPageSize: React.Dispatch<React.SetStateAction<number>>;
};

const ProductTable = ({
   products,
   meta,
   currentPage,
   setCurrentPage,
   pageSize,
   setPageSize,
}: TProps) => {
   const navigate = useNavigate();
   const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(
      null
   );

   const handleDeleteClick = (product: IProduct) => {
      setSelectedProduct(product);
   };

   return (
      <>
         <div className="border border-border rounded-lg bg-card overflow-hidden">
            <div className="relative">
               <div className="overflow-auto">
                  <Table className="min-w-[800px]">
                     <TableHeader className="sticky top-0 z-10 bg-yellow-50 border-b">
                        <TableRow className="hover:bg-yellow-50">
                           <TableHead className="w-16 bg-yellow-50">
                              S.N.
                           </TableHead>
                           <TableHead className="min-w-24 bg-yellow-50">
                              Image
                           </TableHead>
                           <TableHead className="min-w-48 bg-yellow-50">
                              Name
                           </TableHead>
                           <TableHead className="min-w-32 hidden sm:table-cell bg-yellow-50">
                              Price ($)
                           </TableHead>
                           <TableHead className="min-w-24 hidden sm:table-cell bg-yellow-50">
                              Discount (%)
                           </TableHead>
                           <TableHead className="min-w-32 hidden sm:table-cell bg-yellow-50">
                              Stock
                           </TableHead>
                           <TableHead className="min-w-48 hidden md:table-cell bg-yellow-50">
                              Description
                           </TableHead>
                           <TableHead className="min-w-32 hidden md:table-cell bg-yellow-50">
                              Created
                           </TableHead>
                           <TableHead className="min-w-24 hidden md:table-cell bg-yellow-50">
                              Reviews
                           </TableHead>
                           <TableHead className="min-w-24 hidden md:table-cell bg-yellow-50">
                              Visible
                           </TableHead>
                           <TableHead className="min-w-24 bg-yellow-50">
                              Action
                           </TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {products?.length > 0 ? (
                           products?.map((product, index) => (
                              <TableRow
                                 key={product.id}
                                 className={
                                    index % 2 === 0
                                       ? "bg-gray-50"
                                       : "bg-muted/30"
                                 }
                              >
                                 <TableCell className="w-16 text-muted-foreground">
                                    {Number(index + 1) +
                                       (meta?.page - 1) * pageSize}
                                 </TableCell>
                                 <TableCell className="min-w-24 text-muted-foreground">
                                    {product.productImages &&
                                    product.productImages.length > 0 ? (
                                       <img
                                          src={product.productImages[0]}
                                          alt={product.productName}
                                          className="w-7 h-7 object-cover rounded-full"
                                       />
                                    ) : (
                                       <span className="text-xs text-gray-400">
                                          No Image
                                       </span>
                                    )}
                                 </TableCell>
                                 <TableCell className="min-w-48 text-muted-foreground">
                                    {product?.productName}
                                 </TableCell>
                                 <TableCell className="min-w-32 text-muted-foreground hidden sm:table-cell truncate">
                                    {product.price.toFixed(2)}
                                 </TableCell>
                                 <TableCell className="min-w-24 text-muted-foreground hidden sm:table-cell truncate">
                                    {product.discount}
                                 </TableCell>
                                 <TableCell className="min-w-32 text-muted-foreground hidden sm:table-cell truncate">
                                    {product?.stock}
                                 </TableCell>
                                 <TableCell className="min-w-48 text-muted-foreground hidden md:table-cell truncate max-w-xs">
                                    {product.description?.length > 50
                                       ? product.description.slice(0, 50) +
                                         "..."
                                       : product.description}
                                 </TableCell>
                                 <TableCell className="min-w-32 text-muted-foreground hidden md:table-cell">
                                    {new Date(
                                       product.createdAt
                                    ).toLocaleDateString()}
                                 </TableCell>
                                 <TableCell className="min-w-24 text-muted-foreground hidden md:table-cell">
                                    {product.reviewCount}
                                 </TableCell>
                                 <TableCell className="min-w-24 text-muted-foreground hidden md:table-cell">
                                    {product.isVisible ? (
                                       <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                                          Visible
                                       </span>
                                    ) : (
                                       <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                                          Hidden
                                       </span>
                                    )}
                                 </TableCell>
                                 <TableCell className="min-w-24">
                                    <div className="flex gap-2">
                                       <Button
                                          size="icon"
                                          variant="outline"
                                          onClick={() =>
                                             navigate(
                                                `/edit-product/${product.id}`
                                             )
                                          }
                                       >
                                          <Pencil className="h-4 w-4" />
                                       </Button>
                                       <Button
                                          size="icon"
                                          variant="destructive"
                                          onClick={() =>
                                             handleDeleteClick(product)
                                          }
                                       >
                                          <Trash2 className="h-4 w-4" />
                                       </Button>
                                    </div>
                                 </TableCell>
                              </TableRow>
                           ))
                        ) : (
                           <TableRow>
                              <TableCell
                                 colSpan={11}
                                 className="text-center py-8 text-muted-foreground"
                              >
                                 No products found matching your search.
                              </TableCell>
                           </TableRow>
                        )}
                     </TableBody>
                  </Table>
               </div>
            </div>
         </div>
         <div className="fixed bottom-0 flex left-0 w-full bg-white border-t py-3">
            <CustomPagination
               currentPage={currentPage}
               setCurrentPage={setCurrentPage}
               totalPages={meta?.totalPages}
            />
            {meta?.total > 50 && (
               <div className="flex flex-1 justify-end">
                  <Select
                     value={pageSize.toString()}
                     aria-label="Results per page"
                     onValueChange={(val) => {
                        setCurrentPage(1);
                        setPageSize(Number(val));
                     }}
                  >
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

         {selectedProduct && (
            <DeleteProductModal produdtId={selectedProduct.id} />
         )}
      </>
   );
};

export default ProductTable;
