export interface IProduct {
  id: string
  productName: string
  description: string
  price: number
  discount: number
  stock: number
  productImages: string[]
  isVisible: boolean
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
  reviewCount: number
}


export interface IProductFormData {
  brandId: string
  categoryId: string
  productName: string
  description: string
  price: number | ""
  discount: number | ""
  stock: number | ""
  isVisible: boolean
  fitVehicles: string[]
  sections: Array<{
    sectionName: string
    fields: Array<{
      fieldName: string
      valueString?: string
      valueFloat?: number
    }>
  }>
  references: Array<{
    type: string
    number: string
    brandId?: string
  }>
  shipping: Array<{
    countryCode: string
    countryName: string
    carrier: string
    cost: number | ""
    deliveryMin: number | ""
    deliveryMax: number | ""
    isDefault?: boolean
  }>
}