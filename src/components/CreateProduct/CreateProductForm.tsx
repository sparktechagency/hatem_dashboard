/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import BasicInfoForm from "./BasicInfoForm"
import SectionManagerForm from "./SectionForm"
import ShippingManagerForm from "./ShippingForm"
import ReferenceForm from "./ReferenceForm"
import type { IProductFormData } from "@/types/product.type"



const MOCK_BRANDS = [
  { id: "68eb81dbf3e7ce80d2119818", name: "BMW" },
  { id: "2", name: "Mercedes" },
  { id: "3", name: "Audi" },
]

const MOCK_CATEGORIES = [
  { id: "68eb78992f6abbc2fd9f1932", name: "Bumpers" },
  { id: "2", name: "Lights" },
  { id: "3", name: "Mirrors" },
]

const MOCK_VEHICLES = [
  { id: "68ec9d7e5d5df4fdb737e5a5", name: "BMW 320i 2016-2020" },
  { id: "2", name: "BMW 330i 2016-2020" },
  { id: "3", name: "BMW M Sport 2016-2020" },
]


const CreateProductForm = () => {
  const [year, setYear] =  useState("");
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
  })

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
    )
  }

  const handleBasicInfoChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFitVehiclesChange = (vehicleId: string) => {
    setFormData((prev) => ({
      ...prev,
      fitVehicles: prev.fitVehicles.includes(vehicleId)
        ? prev.fitVehicles.filter((id) => id !== vehicleId)
        : [...prev.fitVehicles, vehicleId],
    }))
  }

  const handleSectionsChange = (sections: IProductFormData["sections"]) => {
    setFormData((prev) => ({
      ...prev,
      sections,
    }))
  }

  const handleReferencesChange = (references: IProductFormData["references"]) => {
    setFormData((prev) => ({
      ...prev,
      references,
    }))
  }

  const handleShippingChange = (shipping: IProductFormData["shipping"]) => {
    setFormData((prev) => ({
      ...prev,
      shipping,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isFormValid()) {
      console.log("Form submitted:", formData)
      alert("Form submitted successfully!")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <BasicInfoForm
        formData={formData}
        brands={MOCK_BRANDS}
        categories={MOCK_CATEGORIES}
        vehicles={MOCK_VEHICLES}
        onBasicInfoChange={handleBasicInfoChange}
        onFitVehiclesChange={handleFitVehiclesChange}
        year={year}
        setYear={setYear}
      />

      {/* Sections Manager */}
      <SectionManagerForm sections={formData.sections} onSectionsChange={handleSectionsChange} />

      {/* References Manager */}
      <ReferenceForm
        references={formData.references}
        brands={MOCK_BRANDS}
        onReferencesChange={handleReferencesChange}
      />

      {/* Shipping Manager */}
      <ShippingManagerForm shipping={formData.shipping} onShippingChange={handleShippingChange} />

      {/* Submit Button */}
      <Card className="border-primary/20">
        <CardContent className="pt-6">
          <Button type="submit" disabled={!isFormValid()} className="w-full h-12 text-lg font-semibold">
            {isFormValid() ? "Submit Product" : "Complete all fields to submit"}
          </Button>
          {!isFormValid() && (
            <p className="text-sm text-destructive mt-3 text-center">Please fill in all required fields</p>
          )}
        </CardContent>
      </Card>
    </form>
  )
}

export default CreateProductForm;
