import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { NotebookText, Pencil } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useUpdateCategoryMutation } from "@/redux/features/category/categoryApi";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SetCategoryUpdateError } from "@/redux/features/category/categorySlice";
import type z from "zod";
import type { ICategory } from "@/types/category.type";
import CustomIconInput from "@/components/form/CustomIconInput";
import ErrorAlert from "@/components/validation/ErrorAlert";
import FormButton from "@/components/form/FormButton";
import { useEffect, useState } from "react";
import { updateCategorySchema } from "@/schema/category.schema";
import { WarningToast } from "@/helper/ValidationHelper";
import CustomUpdateImageField from "@/components/form/CustomUpdateImageField";
import assets from "@/assets/assets";

type TCategoryFormValues = z.infer<typeof updateCategorySchema>;

type TProps = {
    category: ICategory
}

const UpdateCategoryModal = ({ category } : TProps) => {
    const [open, setOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(category.iconUrl || assets.placeholder_img || null);
    const dispatch = useAppDispatch();
    const { CategoryUpdateError } = useAppSelector((state) => state.category);
    const [updateCategory, { isLoading, isSuccess }] = useUpdateCategoryMutation();
    const { handleSubmit, control, setValue } = useForm({
        resolver: zodResolver(updateCategorySchema),
        defaultValues: {
            name: category?.name
        }
    });


    //if success
    useEffect(() => {
      if (!isLoading && isSuccess) {
        setOpen(false)
      }
    }, [isLoading, isSuccess, dispatch])


    const onSubmit: SubmitHandler<TCategoryFormValues> = (data) => {
        dispatch(SetCategoryUpdateError(""));
        const formData = new FormData();

        if (!previewUrl) {
            WarningToast("Upload an image or discard to keep the previous one.");
            return;
        }

        //if no changes
        if(category.name === data.name && !data.categoryImage){
            WarningToast("No changes detected !");
            return; 
        }
        if(category.name !== data.name){
           formData.append("bodyData", JSON.stringify({ name: data.name }))
        }
        if(data.categoryImage){
            formData.append("categoryImage", data.categoryImage);
        }

        updateCategory({
            id: category?.id,
            data: formData
        })
    }


    const handleClose = () => {
        setValue("name", category.name);
        setPreviewUrl(category.iconUrl)
        setOpen(false)
    }

    return (
        <>
            <Button
                onClick={()=>setOpen(true)}
                size="icon"
                className="bg-green-600 hover:bg-green-700 text-white rounded-md"
            >
                <Pencil className="h-3 w-3" />
            </Button>

            <Dialog open={open} onOpenChange={handleClose}>
                <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()} onOpenAutoFocus={(e)=>e.preventDefault()}>
                    <DialogHeader>
                        <DialogTitle>Update Category</DialogTitle>
                    </DialogHeader>
                    {CategoryUpdateError && <ErrorAlert message={CategoryUpdateError} />}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <CustomIconInput control={control} name="name" label="Name" placeholder="Enter name" icon={NotebookText} />
                        <CustomUpdateImageField
                            label="Upload Image"
                            name="categoryImage"
                            control={control}
                            placeholder="Click or drag image here"
                            defaultPreviewUrl={category.iconUrl}
                            previewUrl={previewUrl}
                            setPreviewUrl={setPreviewUrl}
                        />
                        <FormButton isLoading={isLoading}>Save Changes</FormButton>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}


export default UpdateCategoryModal