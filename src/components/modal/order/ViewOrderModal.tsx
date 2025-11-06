import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle2, Truck, Package } from "lucide-react"
import assets from "@/assets/assets";
import type { IOrder } from "@/types/order.type";

type TProps = {
    order: IOrder;
}


const ViewOrderModal = ({ order }: TProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "COMPLETED":
                return "bg-emerald-100 text-emerald-800 border-emerald-200"
            case "PROCESSING":
                return "bg-blue-100 text-blue-800 border-blue-200"
            case "PENDING":
                return "bg-amber-100 text-amber-800 border-amber-200"
            case "CANCELLED":
                return "bg-red-100 text-red-800 border-red-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }




    return (
        <>
            <Button
                onClick={() => setModalOpen(true)}
                size="icon"
                className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-full"
            >
                <Eye className="h-3 w-3" />
            </Button>

            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent
                    className="w-[95vw] max-w-2xl sm:max-w-3xl md:max-w-5xl max-h-[90vh]"
                    onInteractOutside={(e) => e.preventDefault()}
                >
                    <DialogHeader>
                        <DialogTitle className="sr-only">Order Details</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 overflow-y-auto max-h-[calc(90vh-80px)]">
                        <Card className="overflow-hidden border-0 shadow-lg">
                            <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-800 text-white pb-4 sm:pb-6">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-white flex-shrink-0">
                                            <AvatarImage src={order.customerImage || "/placeholder.svg"} alt={order.customerName} />
                                            <AvatarFallback>{order.customerName.charAt(0).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div className="min-w-0">
                                            <CardTitle className="text-white text-base sm:text-xl truncate">{order.customerName}</CardTitle>
                                            <CardDescription className="text-slate-300 text-xs sm:text-sm truncate">
                                                Order #{order.orderId.slice(-8)}
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-xl sm:text-2xl font-bold">${order.totalAmount.toFixed(2)}</p>
                                        <p className="text-xs text-slate-300">{formatDate(order.createdAt)}</p>
                                    </div>
                                </div>
                            </CardHeader>

                            {/* Status badges */}
                            <CardContent className="pt-4 pb-4 sm:pt-6 sm:pb-4">
                                <div className="flex gap-2 sm:gap-3 flex-wrap">
                                    <Badge
                                        variant="outline"
                                        className={`${getStatusColor(order.status)} font-semibold text-xs sm:text-sm`}
                                    >
                                        <Package className="w-3 h-3 mr-1 flex-shrink-0" />
                                        <span className="truncate">{order.status}</span>
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className={`${getStatusColor(order.paymentStatus)} font-semibold text-xs sm:text-sm`}
                                    >
                                        <CheckCircle2 className="w-3 h-3 mr-1 flex-shrink-0" />
                                        <span className="truncate">{order.paymentStatus}</span>
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-md">
                            <CardHeader>
                                <CardTitle className="text-base sm:text-lg">Order Items</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 px-4 sm:px-6">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex gap-3 sm:gap-4 pb-4 last:pb-0 border-b last:border-b-0">
                                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                            <img
                                                src={item.productImages[0] || assets.placeholder_img}
                                                alt={item.productName}
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-sm sm:text-base text-gray-900 truncate">{item.productName}</h4>
                                            <p className="text-xs sm:text-sm text-gray-600">Quantity: {1}</p>
                                            <div className="flex items-center justify-between gap-2 mt-2">
                                                <span className="text-base sm:text-lg font-bold text-gray-900">${item.price.toFixed(2)}</span>
                                                {item.discount > 0 && (
                                                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded flex-shrink-0">
                                                        -{item.discount}%
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Card className="border-0 shadow-md">
                                <CardHeader>
                                    <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                                        <Truck className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                                        <span className="truncate">Shipping Address</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-xs sm:text-sm text-gray-700 space-y-1">
                                    <p className="font-semibold text-gray-900 break-words">{order.invoice.Buyer}</p>
                                    <p className="break-words">{order?.invoice?.["Shipping Address"]}</p>
                                    <p className="text-gray-600 break-words">{order?.invoice?.["Buyer Contact Number"]}</p>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-md">
                                <CardHeader>
                                    <CardTitle className="text-sm sm:text-base">Billing Address</CardTitle>
                                </CardHeader>
                                <CardContent className="text-xs sm:text-sm text-gray-700 space-y-1">
                                    <p className="font-semibold text-gray-900 break-words">{order.invoice.Buyer}</p>
                                    <p className="break-words">{order?.invoice?.["Billing Address"]}</p>
                                    <p className="text-gray-600 break-words">{order?.invoice?.["Buyer Email"]}</p>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="border-0 shadow-md">
                            <CardHeader>
                                <CardTitle className="text-sm sm:text-base">Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between text-xs sm:text-sm">
                                    <span className="text-gray-600">Invoice #:</span>
                                    <span className="font-semibold break-words text-right">{order?.invoice?.["Invoice Number"]}</span>
                                </div>
                                <div className="flex justify-between text-xs sm:text-sm">
                                    <span className="text-gray-600">Invoice Date:</span>
                                    <span className="font-semibold break-words text-right">{order?.invoice?.["Invoice Date"]}</span>
                                </div>
                                <div className="flex justify-between text-xs sm:text-sm">
                                    <span className="text-gray-600">Payment Method:</span>
                                    <span className="font-semibold break-words text-right">{order?.invoice?.["Payment Method"]}</span>
                                </div>
                                <Separator className="my-3" />
                                <div className="flex justify-between text-base sm:text-lg font-bold">
                                    <span>Total Amount:</span>
                                    <span className="text-slate-900">${order.totalAmount.toFixed(2)}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}


export default ViewOrderModal;