import { useSearchParams, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { mockProducts } from '../data/mock';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/Button';
export function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = mockProducts.filter(
    (p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.brand.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Search Results</h1>
        <p className="text-body">
          Showing results for{' '}
          <span className="text-primary font-semibold">"{query}"</span>
        </p>
      </div>

      {results.length > 0 ?
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((product) =>
        <ProductCard key={product.id} product={product} />
        )}
        </div> :

      <div className="text-center py-24 bg-surface border border-subtle/30 rounded-xl">
          <div className="w-20 h-20 bg-elevated rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-8 h-8 text-muted" />
          </div>
          <h3 className="text-2xl font-bold text-primary mb-4">
            No results found
          </h3>
          <p className="text-body mb-8 max-w-md mx-auto">
            We couldn't find any products matching "{query}". Try checking your
            spelling or using more general terms.
          </p>
          <Link to="/shop">
            <Button size="lg">Browse All Products</Button>
          </Link>
        </div>
      }
    </div>);

}
