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
