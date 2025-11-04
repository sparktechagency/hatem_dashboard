export interface IOrder {
  orderId: string;
  userId: string;
  totalAmount: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | string;
  paymentStatus: "CASH" | "PAID" | "UNPAID" | string;
  notes: string | null;
  invoice: TInvoice;
  createdAt: string; // ISO date string
  items: IOrderItem[];
  quantity: number;
  customerName: string;
  customerImage: string;
}

export interface TInvoice {
  Seller: string;
  Email: string;
  "Contact Number": string | null;
  Address: string | null;
  Buyer: string;
  "Buyer Email": string;
  "Buyer Contact Number": string;
  "Buyer Address": string;
  "Invoice Number": string;
  "Invoice Date": string;
  "Product(s) Purchased": string;
  "Product ID(s)": string;
  "Product Price(s)": string;
  "Total Amount": string;
  "Payment Method": string;
  "Shipping Address": string;
  "Billing Address": string;
}

export interface IOrderItem {
  id: string;
  productName: string;
  price: number;
  discount: number;
  productImages: string[];
}
