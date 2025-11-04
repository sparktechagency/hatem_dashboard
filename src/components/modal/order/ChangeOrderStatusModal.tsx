import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAppDispatch } from "@/redux/hooks/hooks";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import FormButton from "@/components/form/FormButton";
import { useEffect, useState } from "react";
import type { TOrderStatus } from "@/types/order.type";
import CustomSelect from "@/components/form/CustomSelect";
import { orderStatusOptions } from "@/data/order.data";
import OrderStatusButton from "@/components/order/OrderStatusButton";
import { useUpdateOrderMutation } from "@/redux/features/order/orderApi";
import { orderStatusSchema } from "@/schema/order.schema";

type TCategoryFormValues = z.infer<typeof orderStatusSchema>;

type TProps = {
    orderId: string;
    status: TOrderStatus;
}

const ChangeOrderStatusModal = ( { orderId, status }: TProps) => {
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch();
  const [updateOrder, { isLoading, isSuccess }] = useUpdateOrderMutation();
  const { handleSubmit, control, reset, setValue } = useForm({
    resolver: zodResolver(orderStatusSchema),
    defaultValues: {
      status
    }
  });


  useEffect(()=> {
    if(!isLoading && isSuccess){
      setOpen(false)
      reset()
    }
  }, [isLoading, isSuccess, dispatch, reset])

  const onSubmit: SubmitHandler<TCategoryFormValues> = (data) => {
    updateOrder({
      id: orderId,
      data
    })
  }


 const handleClose = (nextStatus:boolean) => {
   setValue("status", status);
   setOpen(nextStatus) //setOpen(false)
 }


  return (
    <>
      <OrderStatusButton onClick={()=>setOpen(true)} status={status} />

      <Dialog open={open} onOpenChange={handleClose}>
        {/* Modal Content */}
        <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Change Order Status</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <CustomSelect label="Status" name="status" control={control} options={orderStatusOptions}/>
            <FormButton isLoading={isLoading}>Save Change</FormButton>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}


export default ChangeOrderStatusModal;