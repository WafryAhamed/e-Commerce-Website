import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, ChevronDown, Check } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { mockProducts } from '../data/mock';
import { Button } from '../components/ui/Button';
export function Shop() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const dealsParam = searchParams.get('deals');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  // Filter products based on URL params and local state
  const filteredProducts = mockProducts.filter((p) => {
    if (dealsParam === 'true' && !p.discountPrice) return false;
    if (
    categoryParam &&
    p.category.toLowerCase() !== categoryParam.toLowerCase())

    return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand))
    return false;
    const price = p.discountPrice || p.price;
    if (price < priceRange[0] || price > priceRange[1]) return false;
    return true;
  });
  const brands = Array.from(new Set(mockProducts.map((p) => p.brand)));
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
    prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4 capitalize">
          {dealsParam === 'true' ? 'Best Deals' : categoryParam ? `${categoryParam}` : 'All Products'}
        </h1>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-body">Showing {filteredProducts.length} results</p>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Button
              variant="outline"
              className="lg:hidden flex-1 sm:flex-none"
              onClick={() => setShowFilters(!showFilters)}
              leftIcon={<Filter className="w-4 h-4" />}>

              Filters
            </Button>

            <div className="relative flex-1 sm:flex-none">
              <select className="w-full appearance-none bg-surface border border-subtle/50 rounded-lg py-2 pl-4 pr-10 text-sm text-primary focus:outline-none focus:border-accent-blue">
                <option>Featured</option>
                <option>Newest Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Top Rated</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <motion.aside
          className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}
          initial={false}
          animate={{
            height: showFilters ? 'auto' : undefined
          }}>

          <div className="bg-surface border border-subtle/30 rounded-xl p-6 sticky top-24">
            <div className="mb-8">
              <h3 className="text-primary font-semibold mb-4">Categories</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/shop"
                    className={`text-sm ${!categoryParam ? 'text-accent-gold font-medium' : 'text-body hover:text-primary'}`}>

                    All Products
                  </a>
                </li>
                <li>
                  <a
                    href="/shop?category=laptops"
                    className={`text-sm ${categoryParam === 'laptops' ? 'text-accent-gold font-medium' : 'text-body hover:text-primary'}`}>

                    Laptops
                  </a>
                </li>
                <li>
                  <a
                    href="/shop?category=accessories"
                    className={`text-sm ${categoryParam === 'accessories' ? 'text-accent-gold font-medium' : 'text-body hover:text-primary'}`}>

                    Accessories
                  </a>
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-primary font-semibold mb-4">Brands</h3>
              <div className="space-y-3">
                {brands.map((brand) =>
                <label
                  key={brand}
                  className="flex items-center gap-3 cursor-pointer group">

                    <div
                    className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedBrands.includes(brand) ? 'bg-accent-blue border-accent-blue' : 'border-subtle group-hover:border-muted'}`}>

                      {selectedBrands.includes(brand) &&
                    <Check className="w-3 h-3 text-background" />
                    }
                    </div>
                    <span className="text-sm text-body group-hover:text-primary transition-colors">
                      {brand}
                    </span>
                  </label>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-primary font-semibold mb-4">Price Range</h3>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <span className="text-xs text-muted mb-1 block">Min</span>
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                    }
                    className="w-full bg-background border border-subtle/50 rounded-md py-1.5 px-3 text-sm text-primary focus:outline-none focus:border-accent-blue" />

                </div>
                <div className="flex-1">
                  <span className="text-xs text-muted mb-1 block">Max</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                    className="w-full bg-background border border-subtle/50 rounded-md py-1.5 px-3 text-sm text-primary focus:outline-none focus:border-accent-blue" />

                </div>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ?
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) =>
            <ProductCard key={product.id} product={product} />
            )}
            </div> :

          <div className="text-center py-20 bg-surface border border-subtle/30 rounded-xl">
              <h3 className="text-xl font-semibold text-primary mb-2">
                No products found
              </h3>
              <p className="text-body mb-6">
                Try adjusting your filters or search criteria.
              </p>
              <Button
              onClick={() => {
                setSelectedBrands([]);
                setPriceRange([0, 5000]);
              }}>

                Clear Filters
              </Button>
            </div>
          }
        </div>
      </div>
    </div>);

}