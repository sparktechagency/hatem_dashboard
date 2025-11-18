/* eslint-disable @typescript-eslint/no-explicit-any */
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getYearOptions } from "@/data/options.data";
import { useEffect, useState } from "react";
import {
   useGetModelDropDownByBrandIdQuery,
   useGetVehicleDropDownQuery,
} from "@/redux/features/brand/brandApi";
import type { TOption } from "@/types/global.type";
import type { IProductFormData } from "@/types/product.type";
import type { IModelOption, TEngine } from "@/types/model.type";
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useAppSelector } from "@/redux/hooks/hooks";

interface BasicInfoSectionProps {
   formData: IProductFormData;
   onBasicInfoChange: (field: string, value: any) => void;
   onFitVehiclesChange: (vehicleId: string) => void;
   year: string;
   onYearChange: (value: string) => void;
   brandOptions: TOption[];
   brandLoading: boolean;
}

const BasicInfoForm = ({
   formData,
   onBasicInfoChange,
   onFitVehiclesChange,
   year,
   onYearChange,
   brandOptions,
   brandLoading,
}: BasicInfoSectionProps) => {
   const yearOptions = getYearOptions();

   const [modelOptions, setModelOptions] = useState<TOption[]>([]);
   const [vehicleOptions, setVehicleOptions] = useState<TEngine[]>([]);
   const { categoryOptions } = useAppSelector((state) => state.category);

   useGetCategoriesQuery([
      { name: "page", value: 1 },
      { name: "limit", value: 500 },
   ]);

   /* modelDropDown part */
   const { data: modelData, isLoading: modelLoading } =
      useGetModelDropDownByBrandIdQuery(
         { brandId: formData.brandId, year },
         {
            skip: !formData.brandId || !year,
         }
      );

   useEffect(() => {
      if (modelData?.data) {
         const models = modelData.data.map((cv: IModelOption) => ({
            value: cv?.modelId,
            label: cv?.modelName,
         }));
         console.log("🚗 Models loaded:", models.length);
         setModelOptions(models);
      }
   }, [modelData]);

   /* vehicleDropDown part */
   const { data: vehicleData } = useGetVehicleDropDownQuery(formData.modelId, {
      skip: !formData.modelId,
   });

   useEffect(() => {
      if (vehicleData?.data) {
         console.log("🚙 Vehicles loaded:", vehicleData.data.length);
         setVehicleOptions(vehicleData.data);
      }
   }, [vehicleData]);

   const handleBrandChange = (value: string) => {
      console.log("🏢 Brand changed to:", value);
      onBasicInfoChange("brandId", value);
      // Clear model and vehicles when brand changes
      onBasicInfoChange("modelId", "");
      onBasicInfoChange("fitVehicles", []);
      setModelOptions([]);
      setVehicleOptions([]);
   };

   const handleModelChange = (value: string) => {
      console.log("🚗 Model changed to:", value);
      onBasicInfoChange("modelId", value);
      // Clear vehicles when model changes
      onBasicInfoChange("fitVehicles", []);
      setVehicleOptions([]);
   };

   // Debug logs
   useEffect(() => {
      console.log("📊 Form State:", {
         year,
         brandId: formData.brandId,
         modelId: formData.modelId,
         categoryId: formData.categoryId,
         brandOptionsCount: brandOptions.length,
         modelOptionsCount: modelOptions.length,
         categoryOptionsCount: categoryOptions.length,
      });
   }, [
      year,
      formData.brandId,
      formData.modelId,
      formData.categoryId,
      brandOptions,
      modelOptions,
      categoryOptions,
   ]);

   return (
      <Card>
         <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Enter the basic product details</CardDescription>
         </CardHeader>
         <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {/* Year */}
               <div className="space-y-2">
                  <Label htmlFor="year">Year *</Label>
                  <Select value={year} onValueChange={onYearChange}>
                     <SelectTrigger id="year">
                        <SelectValue placeholder="Select a year" />
                     </SelectTrigger>
                     <SelectContent>
                        {yearOptions.map((yearOption, index) => (
                           <SelectItem key={index} value={yearOption}>
                              {yearOption}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
               </div>

               {/* Brand */}
               <div className="space-y-2">
                  <Label htmlFor="brand">Brand *</Label>
                  <Select
                     value={formData.brandId}
                     onValueChange={handleBrandChange}
                     disabled={brandLoading || !year}
                  >
                     <SelectTrigger id="brand">
                        <SelectValue placeholder="Select a brand" />
                     </SelectTrigger>
                     <SelectContent>
                        {brandOptions.length > 0 ? (
                           brandOptions.map((brand: TOption, index) => (
                              <SelectItem key={index} value={brand.value}>
                                 {brand.label}
                              </SelectItem>
                           ))
                        ) : (
                           <SelectItem value="no-options" disabled>
                              {brandLoading
                                 ? "Loading..."
                                 : "No brands available"}
                           </SelectItem>
                        )}
                     </SelectContent>
                  </Select>
               </div>

               {/* Model */}
               <div className="space-y-2">
                  <Label htmlFor="model">Model *</Label>
                  <Select
                     value={formData.modelId}
                     onValueChange={handleModelChange}
                     disabled={modelLoading || !formData.brandId}
                  >
                     <SelectTrigger id="model">
                        <SelectValue placeholder="Select a model" />
                     </SelectTrigger>
                     <SelectContent>
                        {modelOptions.length > 0 ? (
                           modelOptions.map((model: TOption, index) => (
                              <SelectItem key={index} value={model.value}>
                                 {model.label}
                              </SelectItem>
                           ))
                        ) : (
                           <SelectItem value="no-options" disabled>
                              {modelLoading
                                 ? "Loading..."
                                 : "No models available"}
                           </SelectItem>
                        )}
                     </SelectContent>
                  </Select>
               </div>

               {/* Category */}
               <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                     value={formData.categoryId}
                     onValueChange={(value) =>
                        onBasicInfoChange("categoryId", value)
                     }
                     disabled={categoryOptions?.length === 0}
                  >
                     <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                     </SelectTrigger>
                     <SelectContent>
                        {categoryOptions.length > 0 ? (
                           categoryOptions.map((category: TOption, index) => (
                              <SelectItem key={index} value={category.value}>
                                 {category.label}
                              </SelectItem>
                           ))
                        ) : (
                           <SelectItem value="no-options" disabled>
                              No categories available
                           </SelectItem>
                        )}
                     </SelectContent>
                  </Select>
               </div>
            </div>

            {/* Product Name */}
            <div className="space-y-2">
               <Label htmlFor="productName">Product Name *</Label>
               <Input
                  id="productName"
                  placeholder="e.g., Back Bumper Assembly"
                  value={formData.productName}
                  onChange={(e) =>
                     onBasicInfoChange("productName", e.target.value)
                  }
               />
            </div>

            {/* Description */}
            <div className="space-y-2">
               <Label htmlFor="description">Description *</Label>
               <textarea
                  id="description"
                  placeholder="Enter product description"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                     onBasicInfoChange("description", e.target.value)
                  }
               />
            </div>

            {/* Price, Discount, Stock */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <Input
                     id="price"
                     type="number"
                     placeholder="299.99"
                     step="0.01"
                     value={formData.price}
                     onChange={(e) =>
                        onBasicInfoChange(
                           "price",
                           e.target.value
                              ? Number.parseFloat(e.target.value)
                              : ""
                        )
                     }
                  />
               </div>

               <div className="space-y-2">
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input
                     id="discount"
                     type="number"
                     placeholder="15"
                     step="0.01"
                     min={0}
                     max={100}
                     value={formData.discount}
                     onChange={(e) => {
                        const raw = e.target.value
                           ? Number.parseFloat(e.target.value)
                           : "";
                        const value =
                           typeof raw === "number" && !Number.isNaN(raw)
                              ? Math.min(Math.max(raw, 0), 100)
                              : "";
                        onBasicInfoChange("discount", value);
                     }}
                  />
               </div>

               <div className="space-y-2">
                  <Label htmlFor="stock">Stock *</Label>
                  <Input
                     id="stock"
                     type="number"
                     placeholder="75"
                     value={formData.stock}
                     onChange={(e) =>
                        onBasicInfoChange(
                           "stock",
                           e.target.value ? Number.parseInt(e.target.value) : ""
                        )
                     }
                  />
               </div>
            </div>

            {/* Fit Vehicles */}
            {vehicleOptions?.length > 0 && (
               <div className="space-y-3">
                  <Label>Fit Vehicles * (Multi-select)</Label>
                  <div className="space-y-2">
                     {vehicleOptions?.map((vehicle, index) => (
                        <div
                           key={index}
                           className="flex items-center space-x-2"
                        >
                           <Checkbox
                              id={`vehicle-${vehicle.engineId}`}
                              checked={formData.fitVehicles.includes(
                                 vehicle.engineId
                              )}
                              onCheckedChange={() =>
                                 onFitVehiclesChange(vehicle.engineId)
                              }
                           />
                           <Label
                              htmlFor={`vehicle-${vehicle.engineId}`}
                              className="font-normal cursor-pointer"
                           >
                              {`${vehicle.engineCode} • ${vehicle.hp} HP • ${vehicle.ccm}cc • ${vehicle.fuelType}`}
                           </Label>
                        </div>
                     ))}
                  </div>
               </div>
            )}
         </CardContent>
      </Card>
   );
};

export default BasicInfoForm;
