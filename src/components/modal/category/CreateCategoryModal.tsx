import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import CustomIconInput from "@/components/form/CustomIconInput"
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useCreateCategoryMutation } from "@/redux/features/category/categoryApi";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategorySchema } from "@/schema/category.schema";
import type z from "zod";
import { SetCategoryCreateError } from "@/redux/features/category/categorySlice";
import { NotebookText } from "lucide-react";
import ErrorAlert from "@/components/validation/ErrorAlert";
import FormButton from "@/components/form/FormButton";
import { useEffect, useState } from "react";
import CustomImageUpload from "@/components/form/CustomImageField";

type TCategoryFormValues = z.infer<typeof createCategorySchema>;

const CreateCategoryModal = () => {
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch();
  const { CategoryCreateError } = useAppSelector((state) => state.category)
  const [createCategory, { isLoading, isSuccess }] = useCreateCategoryMutation();
  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(createCategorySchema)
  });


  useEffect(()=> {
    if(!isLoading && isSuccess){
      setOpen(false)
      reset()
    }
  }, [isLoading, isSuccess, dispatch, reset])

  const onSubmit: SubmitHandler<TCategoryFormValues> = (data) => {
    dispatch(SetCategoryCreateError(""))
    const formData = new FormData();
    formData.append("bodyData", JSON.stringify({ name: data.name }))
    formData.append("categoryImage", data.categoryImage);
    createCategory(formData)
  }

  return (
    <>
      <Button onClick={()=>setOpen(true)} className="bg-cyan-600 w-full sm:w-auto hover:bg-cyan-700 text-white">
        Add Category
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        {/* Modal Content */}
        <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>
          {CategoryCreateError && <ErrorAlert message={CategoryCreateError} />}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <CustomIconInput control={control} name="name" label="Name" placeholder="Enter name" icon={NotebookText} />
            <CustomImageUpload
              label="Upload Image"
              name="categoryImage"
              control={control}
              placeholder="Click or drag image here"
            />
            <FormButton isLoading={isLoading} loadingTitle="Adding...">Add</FormButton>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}


export default CreateCategoryModal