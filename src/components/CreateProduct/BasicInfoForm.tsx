import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface BasicInfoSectionProps {
  formData: any
  brands: Array<{ id: string; name: string }>
  categories: Array<{ id: string; name: string }>
  vehicles: Array<{ id: string; name: string }>
  onBasicInfoChange: (field: string, value: any) => void
  onFitVehiclesChange: (vehicleId: string) => void
}

const BasicInfoForm = ({
  formData,
  brands,
  categories,
  vehicles,
  onBasicInfoChange,
  onFitVehiclesChange,
}: BasicInfoSectionProps) =>{
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>Enter the basic product details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Brand and Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="brand">Brand *</Label>
            <Select value={formData.brandId} onValueChange={(value) => onBasicInfoChange("brandId", value)}>
              <SelectTrigger id="brand">
                <SelectValue placeholder="Select a brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.categoryId} onValueChange={(value) => onBasicInfoChange("categoryId", value)}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
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

        {/* Visibility */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isVisible"
            checked={formData.isVisible}
            onCheckedChange={(checked) => onBasicInfoChange("isVisible", checked)}
          />
          <Label htmlFor="isVisible" className="font-normal cursor-pointer">
            Product is visible
          </Label>
        </div>

        {/* Fit Vehicles */}
        <div className="space-y-3">
          <Label>Fit Vehicles * (Multi-select)</Label>
          <div className="space-y-2">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`vehicle-${vehicle.id}`}
                  checked={formData.fitVehicles.includes(vehicle.id)}
                  onCheckedChange={() => onFitVehiclesChange(vehicle.id)}
                />
                <Label htmlFor={`vehicle-${vehicle.id}`} className="font-normal cursor-pointer">
                  {vehicle.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default BasicInfoForm;