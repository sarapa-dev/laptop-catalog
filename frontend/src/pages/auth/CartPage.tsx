import { useCartStore } from "@/store/cartStore";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { items, clearCart } = useCartStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
            {items.length > 0 && (
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
            )}
          </div>

          {items.length === 0 ? (
            <p className="text-muted-foreground">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.laptop_id} item={item} />
              ))}
            </div>
          )}
        </div>

        <div className="md:col-span-4">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
