/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from "react";

import { ErrorToast } from "@/helper/ValidationHelper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BasicInfoForm from "./BasicInfoForm";
import SectionManagerForm from "./SectionForm";
import ShippingManagerForm from "./ShippingForm";
import ReferenceForm from "./ReferenceForm";

import type { IProductFormData } from "@/types/product.type";
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import UploadSingleImage from "../form/UploadSingleImage";
import { useGetBrandDropDownByYearQuery } from "@/redux/features/brand/brandApi";
import type { TOption } from "@/types/global.type";
import { useNavigate } from "react-router-dom";

// placeholder - brands will be loaded by year

const CreateProductForm = () => {
   const [formData, setFormData] = useState<IProductFormData>({
      brandId: "",
      categoryId: "",
      productName: "",
      description: "",
      price: "",
      discount: "",
      stock: "",
      isVisible: true,
      fitVehicles: [],
      sections: [],
      references: [],
      shipping: [],
   });
   const navigate = useNavigate();

   const formRef = useRef<HTMLFormElement | null>(null);

   // single image selected via UploadSingleImage
   const [selectedFile, setSelectedFile] = useState<File | null>(null);

   // year selected in BasicInfoForm (lifted state)
   const [year, setYear] = useState<string>("");

   // brand options (for selects) and brand list (for ReferenceForm)
   const [brandOptions, setBrandOptions] = useState<TOption[]>([]);
   const [brandList, setBrandList] = useState<
      Array<{ id: string; name: string }>
   >([]);

   // fetch brands for selected year
   const { data: brandData, isLoading: brandLoading } =
      useGetBrandDropDownByYearQuery(year, {
         skip: !year,
      });

   // map fetched brand data into option/list shapes
   React.useEffect(() => {
      if (brandData?.data) {
         setBrandOptions(
            brandData.data.map((b: any) => ({
               value: b.brandId,
               label: b.brandName,
            }))
         );
         setBrandList(
            brandData.data.map((b: any) => ({
               id: b.brandId,
               name: b.brandName,
            }))
         );
      } else {
         setBrandOptions([]);
         setBrandList([]);
      }
   }, [brandData]);

   // product create mutation
   const [createProduct, { isLoading: isCreating }] =
      useCreateProductMutation();

   const isFormValid = () => {
      return (
         formData.brandId &&
         formData.categoryId &&
         formData.productName &&
         formData.description &&
         formData.price !== "" &&
         formData.stock !== "" &&
         formData.fitVehicles.length > 0 &&
         formData.sections.length > 0 &&
         formData.references.length > 0 &&
         formData.shipping.length > 0
      );
   };

   const handleBasicInfoChange = (field: string, value: any) => {
      setFormData((prev) => ({
         ...prev,
         [field]: value,
      }));
   };

   const handleFitVehiclesChange = (vehicleId: string) => {
      setFormData((prev) => ({
         ...prev,
         fitVehicles: prev.fitVehicles.includes(vehicleId)
            ? prev.fitVehicles.filter((id) => id !== vehicleId)
            : [...prev.fitVehicles, vehicleId],
      }));
   };

   const handleSectionsChange = (sections: IProductFormData["sections"]) => {
      setFormData((prev) => ({
         ...prev,
         sections,
      }));
   };

   const handleReferencesChange = (
      references: IProductFormData["references"]
   ) => {
      setFormData((prev) => ({
         ...prev,
         references,
      }));
   };

   const handleShippingChange = (shipping: IProductFormData["shipping"]) => {
      setFormData((prev) => ({
         ...prev,
         shipping,
      }));
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!isFormValid()) return;

      // Build FormData with required keys: `bodyData` and `productImages`
      const bodyForm = new FormData();
      bodyForm.append("bodyData", JSON.stringify(formData));

      // include single uploaded image (from UploadSingleImage) if present
      if (selectedFile) {
         bodyForm.append("productImages", selectedFile);
      }

      // Read file input from the MultipleImageField component (keeps that component unchanged)
      const fileInput = formRef.current?.querySelector(
         'input[type="file"][multiple]'
      ) as HTMLInputElement | null;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
         Array.from(fileInput.files).forEach((file) => {
            bodyForm.append("productImages", file);
         });
      }

      // call create product mutation with FormData
      createProduct(bodyForm as any)
         .unwrap()
         .then(() => {
            setFormData({
               brandId: "",
               categoryId: "",
               productName: "",
               description: "",
               price: "",
               discount: "",
               stock: "",
               isVisible: true,
               fitVehicles: [],
               sections: [],
               references: [],
               shipping: [],
            });
            // clear file input inside MultipleImageField (if present)
            if (formRef.current) {
               const fi = formRef.current.querySelector(
                  'input[type="file"][multiple]'
               ) as HTMLInputElement | null;
               if (fi) fi.value = "";

               // clear single file input inside UploadSingleImage (if present)
               const singleFi = formRef.current.querySelector(
                  'input[type="file"]:not([multiple])'
               ) as HTMLInputElement | null;
               if (singleFi) singleFi.value = "";
            }
            // clear selected file state
            setSelectedFile(null);
            navigate("/products");
         })
         .catch((err: any) => {
            const message =
               err?.data?.message || err?.error || "Something went wrong";
            ErrorToast(message);
         });
   };

   return (
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
         {/* Basic Information */}
         <BasicInfoForm
            formData={formData}
            onBasicInfoChange={handleBasicInfoChange}
            onFitVehiclesChange={handleFitVehiclesChange}
            year={year}
            onYearChange={setYear}
            brandOptions={brandOptions}
            brandLoading={brandLoading}
         />

         {/* Sections Manager */}
         <SectionManagerForm
            sections={formData.sections}
            onSectionsChange={handleSectionsChange}
         />

         {/* References Manager */}
         <ReferenceForm
            references={formData.references}
            brands={brandList}
            onReferencesChange={handleReferencesChange}
         />

         {/* Shipping Manager */}
         <ShippingManagerForm
            shipping={formData.shipping}
            onShippingChange={handleShippingChange}
         />

         {/* Multiple images uploader (component unchanged) */}
         <UploadSingleImage
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            label="Upload Product Image"
         />

         {/* Submit Button */}
         <Card className="border-primary/20">
            <CardContent className="pt-6">
               <Button
                  type="submit"
                  disabled={!isFormValid() || isCreating}
                  className="w-full h-12 text-lg font-semibold"
               >
                  {isFormValid()
                     ? "Submit Product"
                     : "Complete all fields to submit"}
               </Button>
               {!isFormValid() && (
                  <p className="text-sm text-destructive mt-3 text-center">
                     Please fill in all required fields
                  </p>
               )}
            </CardContent>
         </Card>
      </form>
   );
};

export default CreateProductForm;
