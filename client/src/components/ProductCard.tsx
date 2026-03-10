import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Product } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { toast } from 'sonner';
interface ProductCardProps {
  product: Product;
}
export function ProductCard({ product }: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.success(`${product.name} added to cart`);
  };
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toast('Added to wishlist', {
      icon: '❤️'
    });
  };
  return (
    <Link to={`/product/${product.slug}`}>
      <Card hoverable className="h-full flex flex-col group relative">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.discountPrice && <Badge variant="error">Sale</Badge>}
          {product.featured && <Badge variant="gold">Featured</Badge>}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-surface/80 backdrop-blur text-muted hover:text-status-error hover:bg-surface transition-colors"
          aria-label="Add to wishlist">

          <Heart className="w-4 h-4" />
        </button>

        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden bg-elevated">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="text-xs text-muted mb-2 font-medium tracking-wider uppercase">
            {product.brand}
          </div>
          <h3 className="text-primary font-semibold text-lg mb-2 line-clamp-2 group-hover:text-accent-blue transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mb-4">
            <Star className="w-4 h-4 fill-accent-gold text-accent-gold" />
            <span className="text-sm font-medium text-primary">
              {product.rating}
            </span>
            <span className="text-xs text-muted">({product.reviewsCount})</span>
          </div>

          <div className="mt-auto flex items-end justify-between">
            <div>
              {product.discountPrice ?
              <div className="flex flex-col">
                  <span className="text-xs text-muted line-through">
                    ${product.price.toLocaleString()}
                  </span>
                  <span className="text-xl font-bold text-primary">
                    ${product.discountPrice.toLocaleString()}
                  </span>
                </div> :

              <span className="text-xl font-bold text-primary">
                  ${product.price.toLocaleString()}
                </span>
              }
            </div>

            <Button
              size="icon"
              variant="secondary"
              onClick={handleAddToCart}
              className="rounded-full w-10 h-10 group-hover:bg-accent-gold group-hover:text-background group-hover:border-accent-gold transition-all">

              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </Link>);

}