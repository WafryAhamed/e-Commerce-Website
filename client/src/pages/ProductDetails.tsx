import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star,
  ShoppingCart,
  Heart,
  ShieldCheck,
  Truck,
  ArrowLeft,
} from 'lucide-react';
import { toast } from 'sonner';
import { mockProducts } from '../data/mock';
import { useWishlist } from '../contexts/WishlistContext';
import { getProductRatingMeta, normalizeProduct } from '../utils/product';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const selectedProduct =
    mockProducts.find((item) => item.slug === slug) ?? mockProducts[0];

  if (!selectedProduct) {
    return <div className="p-20 text-center text-primary">Product not found</div>;
  }

  const product = normalizeProduct(selectedProduct);
  const { isFavorite, isMutating, toggleWishlist } = useWishlist();
  const { ratingLabel, reviewsCount } = getProductRatingMeta(product);
  const favorite = isFavorite(product.id);
  const wishlistPending = isMutating(product.id);

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} ${product.name} to cart`);
  };

  const handleBuyNow = () => {
    toast.success('Proceeding to checkout...');
  };

  const handleWishlist = async () => {
    await toggleWishlist(product);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/shop"
        className="inline-flex items-center text-sm text-muted hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Images */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square bg-elevated rounded-2xl overflow-hidden border border-subtle/20 relative"
          >
            {product.discountPrice && (
              <div className="absolute top-4 left-4 z-10">
                <Badge variant="error" className="px-3 py-1 text-sm">
                  Sale
                </Badge>
              </div>
            )}

            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-colors ${
                    activeImage === idx
                      ? 'border-accent-gold'
                      : 'border-transparent hover:border-subtle'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">

          <span className="text-sm font-medium tracking-wider uppercase text-accent-blue">
            {product.brand}
          </span>

          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4 leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-accent-gold text-accent-gold'
                      : 'text-subtle'
                  }`}
                />
              ))}
            </div>

            <span className="text-sm text-primary font-medium">
              {ratingLabel} Rating
            </span>

            <span className="text-sm text-muted">
              ({reviewsCount} Reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mb-8">
            {product.discountPrice ? (
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold text-primary">
                  ${product.discountPrice.toLocaleString()}
                </span>
                <span className="text-xl text-muted line-through mb-1">
                  ${product.price.toLocaleString()}
                </span>
              </div>
            ) : (
              <span className="text-4xl font-bold text-primary">
                ${product.price.toLocaleString()}
              </span>
            )}

            <p className="text-sm text-status-success mt-2 font-medium">
              {product.stock > 0
                ? `In Stock (${product.stock} available)`
                : 'Out of Stock'}
            </p>
          </div>

          <p className="text-body text-lg mb-8 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Quantity */}
          <div className="bg-surface border border-subtle/30 rounded-xl p-6 mb-8">

            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-primary">
                Quantity
              </span>

              <div className="flex items-center border border-subtle/50 rounded-lg bg-background">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-muted hover:text-primary"
                >
                  -
                </button>

                <span className="w-8 text-center text-primary font-medium">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="px-4 py-2 text-muted hover:text-primary"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">

              <Button size="lg" className="flex-1" onClick={handleBuyNow}>
                Buy Now
              </Button>

              <Button
                variant="secondary"
                size="lg"
                className="flex-1"
                leftIcon={<ShoppingCart className="w-5 h-5" />}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12"
                onClick={handleWishlist}
                disabled={wishlistPending}
              >
                <Heart
                  className={`w-5 h-5 ${
                    favorite ? 'fill-status-error text-status-error' : ''
                  }`}
                />
              </Button>
            </div>
          </div>

          {/* Extra Info */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="flex items-center gap-3 text-sm text-body">
              <ShieldCheck className="w-5 h-5 text-accent-blue" />
              <span>1 Year Warranty</span>
            </div>

            <div className="flex items-center gap-3 text-sm text-body">
              <Truck className="w-5 h-5 text-accent-blue" />
              <span>Free Fast Delivery</span>
            </div>
          </div>

          {/* Specifications */}
          <div className="border-t border-subtle/30 pt-8">

            <h3 className="text-xl font-bold text-primary mb-6">
              Technical Specifications
            </h3>

            <div className="space-y-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div
                  key={key}
                  className="grid grid-cols-3 gap-4 py-3 border-b border-subtle/20 last:border-0"
                >
                  <span className="text-muted font-medium">{key}</span>
                  <span className="col-span-2 text-primary">{value}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}