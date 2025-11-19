import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DeleteButton from "@/components/form/DeleteButton";
import { useEffect } from "react";
import { useDeleteProductMutation } from "@/redux/features/product/productApi";

type TProps = {
   productId: string;
   open: boolean;
   onOpenChange: (open: boolean) => void;
};

const DeleteProductModal = ({ productId, open, onOpenChange }: TProps) => {
   const [deleteProduct, { isLoading, isSuccess, reset }] =
      useDeleteProductMutation();

   // Close modal on success
   useEffect(() => {
      if (isSuccess) {
         onOpenChange(false);
         reset(); // Reset mutation state
      }
   }, [isSuccess, onOpenChange, reset]);

   // Reset on modal close
   useEffect(() => {
      if (!open) {
         reset();
      }
   }, [open, reset]);

   const handleDelete = async () => {
      try {
         await deleteProduct(productId).unwrap();
      } catch (error) {
         // Error is handled by onQueryStarted in the API slice
         console.error("Failed to delete product:", error);
      }
   };

   const handleOpenChange = (newOpen: boolean) => {
      // Prevent closing while loading
      if (!isLoading) {
         onOpenChange(newOpen);
      }
   };

   return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
         <DialogContent
            className="sm:max-w-md"
            onInteractOutside={(e) => {
               // Prevent closing on outside click while loading
               if (isLoading) {
                  e.preventDefault();
               }
            }}
            showCloseButton={!isLoading}
         >
            <DialogHeader>
               <DialogTitle>Delete Product</DialogTitle>
            </DialogHeader>

            <div className="py-4">
               <p className="text-sm text-muted-foreground">
                  Are you sure you want to delete this product? This action
                  cannot be undone.
               </p>
            </div>

            <div className="flex justify-end gap-2">
               <Button
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                  disabled={isLoading}
               >
                  Cancel
               </Button>
               <DeleteButton onClick={handleDelete} isLoading={isLoading} />
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default DeleteProductModal;
