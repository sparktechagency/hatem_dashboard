import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ChangeOrderStatusModal from "../modal/order/ChangeOrderStatusModal";
import ViewOrderModal from "../modal/order/ViewOrderModal";
import type { IOrder } from "@/types/order.type";

type TProps = {
    orders: IOrder[]
}

const RecentOrderTable = ( { orders }: TProps) => {
    return (
        <>
            <div className="overflow-auto max-h-[500px]">
                <Table className="min-w-[800px]">
                    <TableHeader className="sticky top-0 z-10 bg-yellow-50 border-b">
                        <TableRow className="hover:bg-yellow-50">
                            <TableHead className="w-16 bg-yellow-50">S.N.</TableHead>
                            <TableHead className="min-w-48 bg-yellow-50">Customer Name</TableHead>
                            <TableHead className="min-w-48 bg-yellow-50">Email</TableHead>
                            <TableHead className="min-w-32 bg-yellow-50">Amount</TableHead>
                            <TableHead className="min-w-24 bg-yellow-50">Status</TableHead>
                            <TableHead className="min-w-24 bg-yellow-50">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders?.length > 0 ? (
                            orders?.map((order, index) => (
                                <TableRow key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-muted/30"}>
                                    <TableCell className="w-16 text-muted-foreground">{Number(index + 1)}</TableCell>
                                    <TableCell className="min-w-48 text-muted-foreground">{order?.customerName}</TableCell>
                                    <TableCell className="min-w-48 text-muted-foreground">
                                        {order?.invoice?.["Buyer Email"] || "-"}
                                    </TableCell>
                                    <TableCell className="min-w-32 text-muted-foreground">
                                        {order?.totalAmount.toFixed(2) || "-"}
                                    </TableCell>
                                    <TableCell className="min-w-24">
                                        <ChangeOrderStatusModal status={order?.status} orderId={order?.orderId} key={Math.random()} />
                                    </TableCell>
                                    <TableCell className="min-w-24">
                                        <ViewOrderModal order={order} />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    No orders found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}

export default RecentOrderTable