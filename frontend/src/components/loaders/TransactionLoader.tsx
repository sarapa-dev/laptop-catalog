import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const TransactionLoader = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
      </div>

      {[1, 2].map((i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-5 w-[180px]" />
            <Skeleton className="h-4 w-[150px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[100px] w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
export default TransactionLoader;
