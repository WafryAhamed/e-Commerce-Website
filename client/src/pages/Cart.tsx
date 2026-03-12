import { Link } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { mockProducts } from '../data/mock';
export function Cart() {
  // Mock cart data
  const cartItems = [
  {
    product: mockProducts[0],
    quantity: 1
  },
  {
    product: mockProducts[2],
    quantity: 2
  }];

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.product.discountPrice || item.product.price;
    return acc + price * item.quantity;
  }, 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;
  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10 text-muted" />
        </div>
        <h2 className="text-3xl font-bold text-primary mb-4">
          Your cart is empty
        </h2>
        <p className="text-body mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link to="/shop">
          <Button size="lg">Start Shopping</Button>
        </Link>
      </div>);

  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-primary mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="bg-surface border border-subtle/30 rounded-xl overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-subtle/30 text-sm font-medium text-muted uppercase tracking-wider">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            <div className="divide-y divide-subtle/20">
              {cartItems.map((item) => {
                const price = item.product.discountPrice || item.product.price;
                return (
                  <div
                    key={item.product.id}
                    className="p-4 sm:grid sm:grid-cols-12 gap-4 items-center flex flex-col">

                    {/* Product Info */}
                    <div className="col-span-6 flex items-center gap-4 w-full">
                      <div className="w-20 h-20 rounded-lg bg-elevated overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover" />

                      </div>
                      <div>
                        <Link
                          to={`/product/${item.product.slug}`}
                          className="text-primary font-medium hover:text-accent-blue transition-colors line-clamp-2">

                          {item.product.name}
                        </Link>
                        <span className="text-xs text-muted mt-1 block">
                          {item.product.brand}
                        </span>
                      </div>
                    </div>

                    {/* Price (Mobile & Desktop) */}
                    <div className="col-span-2 text-center w-full sm:w-auto flex justify-between sm:block mt-4 sm:mt-0">
                      <span className="sm:hidden text-muted text-sm">
                        Price:
                      </span>
                      <span className="text-primary font-medium">
                        ${price.toLocaleString()}
                      </span>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-2 flex justify-center w-full sm:w-auto mt-4 sm:mt-0">
                      <div className="flex items-center border border-subtle/50 rounded-lg bg-background">
                        <button className="px-3 py-1 text-muted hover:text-primary">
                          -
                        </button>
                        <span className="w-8 text-center text-primary text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button className="px-3 py-1 text-muted hover:text-primary">
                          +
                        </button>
                      </div>
                    </div>

                    {/* Total & Remove */}
                    <div className="col-span-2 flex items-center justify-between sm:justify-end w-full sm:w-auto mt-4 sm:mt-0">
                      <span className="sm:hidden text-muted text-sm">
                        Total:
                      </span>
                      <div className="flex items-center gap-4">
                        <span className="text-primary font-bold">
                          ${(price * item.quantity).toLocaleString()}
                        </span>
                        <button className="text-muted hover:text-status-error transition-colors p-2">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>);

              })}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-96 flex-shrink-0">
          <div className="bg-surface border border-subtle/30 rounded-xl p-6 sticky top-24">
            <h2 className="text-xl font-bold text-primary mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-body">
                <span>Subtotal</span>
                <span className="text-primary font-medium">
                  ${subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-body">
                <span>Shipping</span>
                <span className="text-primary font-medium">
                  {shipping === 0 ? 'Free' : `$${shipping}`}
                </span>
              </div>
              <div className="flex justify-between text-body">
                <span>Estimated Tax</span>
                <span className="text-primary font-medium">
                  ${tax.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="border-t border-subtle/30 pt-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-primary">Total</span>
                <span className="text-2xl font-bold text-accent-gold">
                  $
                  {total.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </span>
              </div>
            </div>

            <Link to="/checkout">
              <Button
                size="lg"
                className="w-full"
                rightIcon={<ArrowRight className="w-4 h-4" />}>

                Proceed to Checkout
              </Button>
            </Link>

            <div className="mt-4 text-center">
              <Link
                to="/shop"
                className="text-sm text-accent-blue hover:text-accent-blueHover transition-colors">

                or Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>);

}
