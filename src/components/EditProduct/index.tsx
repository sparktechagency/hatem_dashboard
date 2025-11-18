/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { ErrorToast } from "@/helper/ValidationHelper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BasicInfoForm from "./BasicForm";
import SectionManagerForm from "./SectionForm";
import ShippingManagerForm from "./ShipingForm";
import ReferenceForm from "./ReferenceForm";

import type { IProductFormData } from "@/types/product.type";
import {
   useGetProductByIdQuery,
   useUpdateProductMutation,
} from "@/redux/features/product/productApi";
import { useGetBrandDropDownByYearQuery } from "@/redux/features/brand/brandApi";
import type { TOption } from "@/types/global.type";
import { Loader2 } from "lucide-react";
import UploadSingleImage from "./UploadImage";

const EditProductForm = () => {
   const { id } = useParams<{ id: string }>();
   const navigate = useNavigate();
   const formRef = useRef<HTMLFormElement | null>(null);

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

   const [selectedFile, setSelectedFile] = useState<File | null>(null);
   const [year, setYear] = useState<string>("");
   const [initialProductImageUrl, setInitialProductImageUrl] = useState<
      string | undefined
   >(undefined);
   const [brandOptions, setBrandOptions] = useState<TOption[]>([]);
   const [brandList, setBrandList] = useState<
      Array<{ id: string; name: string }>
   >([]);
   const [isDataLoaded, setIsDataLoaded] = useState(false);

   // Fetch product data by ID
   const {
      data: productData,
      isLoading: isProductLoading,
      isError: isProductError,
   } = useGetProductByIdQuery(id!, {
      skip: !id,
   });

   // Fetch brands for selected year
   const { data: brandData, isLoading: brandLoading } =
      useGetBrandDropDownByYearQuery(year, {
         skip: !year,
      });

   // Product update mutation
   const [updateProduct, { isLoading: isUpdating }] =
      useUpdateProductMutation();

   // Step 1: Load product data and set year first
   useEffect(() => {
      if (productData?.data && !isDataLoaded) {
         const product = productData.data;

         // Extract year from nested fitVehicles
         const productionStart =
            product.fitVehicles?.[0]?.engine?.generation?.productionStart;
         const yearFromProduct = productionStart
            ? new Date(productionStart).getFullYear().toString()
            : "";

         console.log("🔄 Loading product data...");
         console.log("📅 Year extracted:", yearFromProduct);

         // Set year first to trigger brand loading
         if (yearFromProduct) {
            setYear(yearFromProduct);
         }
      }
   }, [productData, isDataLoaded]);

   // Step 2: Map fetched brand data into option/list shapes (do this BEFORE setting form data)
   useEffect(() => {
      if (brandData?.data) {
         const brands = brandData.data.map((b: any) => ({
            value: b.brandId,
            label: b.brandName,
         }));

         const brandListData = brandData.data.map((b: any) => ({
            id: b.brandId,
            name: b.brandName,
         }));

         console.log("🏢 Brands loaded:", brands.length);
         console.log("🏢 Brand list for references:", brandListData);

         setBrandOptions(brands);
         setBrandList(brandListData);
      }
   }, [brandData]);

   // Step 3: Once brands are loaded, set all form data
   useEffect(() => {
      if (productData?.data && brandData?.data && !isDataLoaded) {
         const product = productData.data;

         // Extract modelId from nested fitVehicles
         const modelId =
            product.fitVehicles?.[0]?.engine?.generation?.modelId || "";

         // Transform sections data
         const transformedSections =
            product.sections?.map((section: any) => ({
               sectionName: section.sectionName || "",
               fields:
                  section.fields?.map((field: any) => ({
                     fieldName: field.fieldName || "",
                     valueString: field.valueString || "",
                     valueFloat: field.valueFloat || undefined,
                  })) || [],
            })) || [];

         // Transform references data - ensure brandId is properly extracted
         const transformedReferences =
            product.references?.map((ref: any) => {
               const brandId = ref.brandId || ref.brand?.id || undefined;
               console.log("📎 Reference:", {
                  type: ref.type,
                  number: ref.number,
                  brandId: brandId,
                  rawRef: ref,
               });

               return {
                  type: ref.type || "OE",
                  number: ref.number || "",
                  brandId: brandId, // Will be undefined if no brand
               };
            }) || [];

         // Transform shipping data
         const transformedShipping =
            product.shippings?.map((ship: any) => ({
               countryCode: ship.countryCode || "",
               countryName: ship.countryName || "",
               carrier: ship.carrier || "",
               cost: ship.cost ?? "",
               deliveryMin: ship.deliveryMin ?? "",
               deliveryMax: ship.deliveryMax ?? "",
               isDefault: ship.isDefault || false,
            })) || [];

         console.log("📦 Setting form data...");
         console.log("🏷️ Brand ID:", product.brandId);
         console.log("🚗 Model ID:", modelId);
         console.log("📂 Category ID:", product.categoryId);
         console.log("📋 References:", transformedReferences);

         // Set all form data
         setFormData({
            brandId: product.brandId || "",
            modelId: modelId,
            categoryId: product.categoryId || "",
            productName: product.productName || "",
            description: product.description || "",
            price: product.price ?? "",
            discount: product.discount ?? "",
            stock: product.stock ?? "",
            isVisible: product.isVisible ?? true,
            fitVehicles: product.fitVehicles?.map((v: any) => v.engineId) || [],
            sections: transformedSections,
            references: transformedReferences,
            shipping: transformedShipping,
         });

         // Set product image
         if (product.productImages && product.productImages.length > 0) {
            setInitialProductImageUrl(product.productImages[0]);
         }

         // Mark data as loaded
         setIsDataLoaded(true);
         console.log("✅ Product data loaded successfully");
      }
   }, [productData, brandData, isDataLoaded]);

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

   const handleYearChange = (value: string) => {
      console.log("📅 Year changed to:", value);
      setYear(value);
      // Clear dependent fields when year changes
      setFormData((prev) => ({
         ...prev,
         brandId: "",
         modelId: "",
         fitVehicles: [],
      }));
      setBrandOptions([]);
      setBrandList([]);
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
      console.log("📋 References updated:", references);
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
   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!isFormValid()) return;

      // Clean up references - remove "none" values and convert to proper format
      const cleanedReferences = formData.references.map((ref) => ({
         type: ref.type,
         number: ref.number,
         ...(ref.brandId && ref.brandId !== "none"
            ? { brandId: ref.brandId }
            : {}),
      }));

      const submissionData = {
         ...formData,
         references: cleanedReferences,
      };

      const bodyForm = new FormData();
      bodyForm.append("bodyData", JSON.stringify(submissionData));

      if (selectedFile) {
         bodyForm.append("productImages", selectedFile);
      }

      try {
         await updateProduct({ id: id!, data: bodyForm as any }).unwrap();
         navigate("/products");
      } catch (err: any) {
         const message =
            err?.data?.message || err?.error || "Something went wrong";
         ErrorToast(message);
      }
   };

   if (isProductLoading || !isDataLoaded) {
      return (
         <div className="flex justify-center items-center h-48">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="ml-3 text-muted-foreground">
               Loading product data...
            </p>
         </div>
      );
   }

   if (isProductError) {
      return (
         <div className="text-center text-destructive">
            Failed to load product details.
         </div>
      );
   }

   return (
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
         {/* Basic Information */}
         <BasicInfoForm
            formData={formData}
            onBasicInfoChange={handleBasicInfoChange}
            onFitVehiclesChange={handleFitVehiclesChange}
            year={year}
            onYearChange={handleYearChange}
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

         {/* Product Image Uploader */}
         <UploadSingleImage
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            label="Upload Product Image"
            initialImage={initialProductImageUrl}
         />

         {/* Submit Button */}
         <Card className="border-primary/20">
            <CardContent className="pt-6">
               <Button
                  type="submit"
                  disabled={!isFormValid() || isUpdating}
                  className="w-full h-12 text-lg font-semibold"
               >
                  {isUpdating
                     ? "Updating..."
                     : isFormValid()
                     ? "Update Product"
                     : "Complete all fields to update"}
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

export default EditProductForm;
