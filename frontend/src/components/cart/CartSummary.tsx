import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useCartStore } from "@/store/cartStore";

const CartSummary = () => {
  const { items, checkout, clearCart } = useCartStore();
  const totalItems = useCartStore((state) => state.totalItems());
  const totalPrice = useCartStore((state) => state.totalPrice());

  const handleCheckout = async () => {
    await checkout();
    clearCart();
  };

  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Items ({totalItems})</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>
      <Button
        className="w-full mt-6 cursor-pointer"
        onClick={handleCheckout}
        disabled={items.length === 0}
      >
        Checkout
      </Button>
    </Card>
  );
};

export default CartSummary;
