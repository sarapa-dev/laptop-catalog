import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Laptop, ShoppingCart } from "lucide-react";
import TransactionLoader from "@/components/loaders/TransactionLoader";
import { TransactionResponse } from "@/types/transaction";

const TransactionPage = () => {
  const { data: transactions, isLoading } = useQuery<TransactionResponse>({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await axiosInstance.get("transaction");
      return response.data;
    },
  });

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy 'at' h:mm a");
  };

  if (isLoading) {
    return <TransactionLoader />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">Transaction History</h1>

      {transactions?.data.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg">No transactions found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {transactions?.data.map((transaction) => (
            <Card key={transaction.transaction_id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Order #{transaction.transaction_id}</CardTitle>
                    <CardDescription>{formatDate(transaction.created_at)}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-base">
                    {formatPrice(transaction.total_amount)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="px-0 md:px-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transaction.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <Laptop className="h-4 w-4 mr-2 text-muted-foreground" />
                            {item.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.category}</Badge>
                        </TableCell>
                        <TableCell className="text-right">{formatPrice(item.price)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={2} className="text-right font-medium">
                        Total
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        {formatPrice(transaction.total_amount)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionPage;
