/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { getYearOptions } from "@/data/options.data"
import { useEffect, useState } from "react"
import { useGetBrandDropDownByYearQuery, useGetModelDropDownByBrandIdQuery, useGetVehicleDropDownQuery } from "@/redux/features/brand/brandApi"
import type { ICardBrand } from "@/types/carBrand.type"
import type { TOption } from "@/types/global.type"
import type { IProductFormData } from "@/types/product.type"
import type { IModelOption, TEngine } from "@/types/model.type"
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi"
import { useAppSelector } from "@/redux/hooks/hooks"

interface BasicInfoSectionProps {
  formData: IProductFormData
  onBasicInfoChange: (field: string, value: any) => void
  onFitVehiclesChange: (vehicleId: string) => void;
}

const BasicInfoForm = ({
  formData,
  onBasicInfoChange,
  onFitVehiclesChange,
}: BasicInfoSectionProps) =>{

  const yearOptions = getYearOptions();
  const [year, setYear] =  useState("");
  const [modelId, setModelId] =  useState("");
  const [brandOptions, setBrandOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState<TEngine[]>([]);
  const { categoryOptions } = useAppSelector((state)=> state.category);



  useGetCategoriesQuery([
    { name: "page", value: 1 },
    { name: "limit", value: 500 }
  ]);

  /* brandDropDown part */
  const { data: brandData, isLoading: brandLoading } = useGetBrandDropDownByYearQuery(year, {
    skip: !year
  });

  useEffect(() => {
    if (brandData?.data) {
      setBrandOptions(brandData?.data?.map((cv: ICardBrand) => ({
        value: cv?.brandId,
        label: cv?.brandName
      })))
    }
  }, [brandData]);
  /* brandDropDown part ended */

  /* modelDropDown part */
  const { data: modelData, isLoading: modelLoading } = useGetModelDropDownByBrandIdQuery({ brandId:formData.brandId, year}, {
    skip: !formData.brandId || !year
  });

  useEffect(() => {
    if (modelData?.data) {
      setModelOptions(modelData?.data?.map((cv: IModelOption) => ({
        value: cv?.modelId,
        label: cv?.modelName
      })))
    }
  }, [modelData])
  /* modelDropDown part ended*/

  /* vehicleDropDown part */
  const { data: vehicleData } = useGetVehicleDropDownQuery(modelId, {
    skip: !modelId
  });

  useEffect(() => {
    if (vehicleData?.data) {
      setVehicleOptions(vehicleData.data)
    }
  }, [vehicleData])
  /* vehicleDropDown part ended*/

 

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
            <Select 
              value={year} 
              onValueChange={(value) => {
                setYear(value);
                onBasicInfoChange("brandId", "");
                setModelOptions([]);
                setModelId("");
              }}
            >
              <SelectTrigger id="year">
                <SelectValue placeholder="Select a year" />
              </SelectTrigger>
              <SelectContent>
                {yearOptions.map((year, index) => (
                  <SelectItem key={index} value={year}>
                    {year}
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
              onValueChange={(value) => {onBasicInfoChange("brandId", value); setModelId("")}} 
              disabled={brandLoading || brandOptions?.length===0} 
            >
              <SelectTrigger id="brand">
                <SelectValue placeholder="Select a brand" />
              </SelectTrigger>
              <SelectContent>
                {brandOptions.map((brand:TOption, index) => (
                  <SelectItem key={index} value={brand.value}>
                    {brand.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Model */}
          <div className="space-y-2">
            <Label htmlFor="model">Model *</Label>
            <Select value={modelId} onValueChange={(value) => setModelId(value)} disabled={modelLoading || modelOptions?.length===0} >
              <SelectTrigger id="model">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {modelOptions.map((model:TOption, index) => (
                  <SelectItem key={index} value={model.value}>
                    {model.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.categoryId} onValueChange={(value) => onBasicInfoChange("categoryId", value)} disabled={categoryOptions?.length===0} >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((category:TOption, index) => (
                  <SelectItem key={index} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
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
            onChange={(e) => onBasicInfoChange("productName", e.target.value)}
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
            onChange={(e) => onBasicInfoChange("description", e.target.value)}
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
              onChange={(e) => onBasicInfoChange("price", e.target.value ? Number.parseFloat(e.target.value) : "")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="discount">Discount (%)</Label>
            <Input
              id="discount"
              type="number"
              placeholder="15"
              step="0.01"
              value={formData.discount}
              onChange={(e) => onBasicInfoChange("discount", e.target.value ? Number.parseFloat(e.target.value) : "")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stock">Stock *</Label>
            <Input
              id="stock"
              type="number"
              placeholder="75"
              value={formData.stock}
              onChange={(e) => onBasicInfoChange("stock", e.target.value ? Number.parseInt(e.target.value) : "")}
            />
          </div>
        </div>
        {/* Fit Vehicles */}
        {vehicleOptions?.length > 0 && (
          <div className="space-y-3">
            <Label>Fit Vehicles * (Multi-select)</Label>
            <div className="space-y-2">
              {vehicleOptions?.map((vehicle, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`vehicle-${vehicle.engineId}`}
                    checked={formData.fitVehicles.includes(vehicle.engineId)}
                    onCheckedChange={() => onFitVehiclesChange(vehicle.engineId)}
                  />
                  <Label htmlFor={`vehicle-${vehicle.engineId}`} className="font-normal cursor-pointer">
                    {`${vehicle.engineCode} • ${vehicle.hp} HP • ${vehicle.ccm}cc • ${vehicle.fuelType}`}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default BasicInfoForm;