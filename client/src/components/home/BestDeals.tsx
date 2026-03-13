import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Product } from '../../types';
import { ProductCard } from '../ProductCard';

interface BestDealsProps {
  products: Product[];
}

export function BestDeals({ products }: BestDealsProps) {
  const deals = useMemo(
    () => products.filter((product) => product.discountPrice).slice(0, 4),
    [products]
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold text-primary mb-2">Best Deals</h2>
          <p className="text-body">Unbeatable prices on premium tech.</p>
        </div>
        <Link
          to="/shop?deals=true"
          className="hidden sm:flex items-center text-accent-gold hover:text-accent-goldHover font-medium transition-colors">

          View All Deals <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {deals.map((product, i) =>
        <motion.div
          key={product.id}
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            delay: i * 0.1
          }}>

            <ProductCard product={product} />
          </motion.div>
        )}
      </div>
    </section>);

}
