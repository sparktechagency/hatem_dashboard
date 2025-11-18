import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import DeleteButton from "@/components/form/DeleteButton";
import { useEffect, useState } from "react";
import { useDeleteProductMutation } from "@/redux/features/product/productApi";

type TProps = {
   produdtId: string;
};

const DeleteProductModal = ({ produdtId }: TProps) => {
   const [open, setOpen] = useState(false);
   const [deleteProduct, { isLoading, isSuccess }] = useDeleteProductMutation();

   useEffect(() => {
      if (!isLoading) {
         setOpen(false);
      }
   }, [isLoading, isSuccess]);

   const handleClick = () => {
      deleteProduct(produdtId);
   };

   return (
      <>
         <Button
            onClick={() => setOpen(true)}
            size="icon"
            className="bg-red-600 hover:bg-red-700 text-white rounded-md"
         >
            <Trash2 className="h-3 w-3" />
         </Button>

         <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
               className="sm:max-w-md"
               onInteractOutside={(e) => e.preventDefault()}
               showCloseButton={false}
            >
               <DialogHeader>
                  <DialogTitle>Are you sure, you want to delete?</DialogTitle>
               </DialogHeader>

               <div className="flex justify-end gap-2">
                  <Button
                     variant="default"
                     className="bg-black hover:bg-black/80"
                     onClick={() => setOpen(false)}
                  >
                     No
                  </Button>
                  <DeleteButton onClick={handleClick} isLoading={isLoading} />
               </div>
            </DialogContent>
         </Dialog>
      </>
   );
};

export default DeleteProductModal;
