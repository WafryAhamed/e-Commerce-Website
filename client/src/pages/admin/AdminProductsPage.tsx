import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, MoreVertical, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockProducts } from '../../data/mock';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
export function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredProducts = mockProducts.filter(
    (p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalProducts = mockProducts.length;
  const lowStock = mockProducts.filter(
    (p) => p.stock > 0 && p.stock < 10
  ).length;
  const outOfStock = mockProducts.filter((p) => p.stock === 0).length;
  const inStock = totalProducts - outOfStock;
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">
            Products Management
          </h1>
          <p className="text-body text-sm mt-1">
            Manage your catalog, inventory, and pricing.
          </p>
        </div>
        <Button leftIcon={<Plus className="w-4 h-4" />}>Add Product</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted font-medium">Total Products</p>
          <p className="text-2xl font-bold text-primary mt-1">
            {totalProducts}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted font-medium">In Stock</p>
          <p className="text-2xl font-bold text-status-success mt-1">
            {inStock}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted font-medium">Low Stock</p>
          <p className="text-2xl font-bold text-status-warning mt-1">
            {lowStock}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted font-medium">Out of Stock</p>
          <p className="text-2xl font-bold text-status-error mt-1">
            {outOfStock}
          </p>
        </Card>
      </div>

      {/* Actions Bar */}
      <Card className="p-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="w-full sm:w-96 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search products by name or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-background border border-subtle/50 rounded-lg py-2 pl-9 pr-4 text-sm text-primary focus:outline-none focus:border-accent-blue transition-colors" />

        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            leftIcon={<Filter className="w-4 h-4" />}
            className="flex-1 sm:flex-none">

            Filter
          </Button>
          <select className="bg-background border border-subtle/50 rounded-lg py-2 px-4 text-sm text-primary focus:outline-none focus:border-accent-blue transition-colors flex-1 sm:flex-none">
            <option>All Categories</option>
            <option>Laptops</option>
            <option>Accessories</option>
          </select>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-elevated/50 text-muted text-xs uppercase tracking-wider border-b border-subtle/30">
                <th className="p-4 w-12 text-center">
                  <input
                    type="checkbox"
                    className="rounded border-subtle bg-background text-accent-blue focus:ring-accent-blue" />

                </th>
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Stock</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-subtle/20">
              {filteredProducts.map((product) =>
              <motion.tr
                initial={{
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
                key={product.id}
                className="hover:bg-elevated/30 transition-colors group">

                  <td className="p-4 text-center">
                    <input
                    type="checkbox"
                    className="rounded border-subtle bg-background text-accent-blue focus:ring-accent-blue" />

                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-background border border-subtle/30 overflow-hidden flex-shrink-0">
                        <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover" />

                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary line-clamp-1">
                          {product.name}
                        </p>
                        <p className="text-xs text-muted">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-body">
                      {product.category}
                    </span>
                    {product.subcategory &&
                  <span className="text-xs text-muted block mt-0.5">
                        {product.subcategory}
                      </span>
                  }
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      {product.discountPrice ?
                    <>
                          <span className="text-sm font-medium text-primary">
                            ${product.discountPrice.toLocaleString()}
                          </span>
                          <span className="text-xs text-muted line-through">
                            ${product.price.toLocaleString()}
                          </span>
                        </> :

                    <span className="text-sm font-medium text-primary">
                          ${product.price.toLocaleString()}
                        </span>
                    }
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                    className={`text-sm font-medium ${product.stock === 0 ? 'text-status-error' : product.stock < 10 ? 'text-status-warning' : 'text-primary'}`}>

                      {product.stock}
                    </span>
                  </td>
                  <td className="p-4">
                    <Badge variant={product.stock > 0 ? 'success' : 'error'}>
                      {product.stock > 0 ? 'Active' : 'Out of Stock'}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-muted hover:text-accent-blue hover:bg-accent-blue/10 rounded transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-muted hover:text-status-error hover:bg-status-error/10 rounded transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              )}
            </tbody>
          </table>
        </div>
        {filteredProducts.length === 0 &&
        <div className="p-8 text-center text-muted">
            No products found matching your search.
          </div>
        }
        <div className="p-4 border-t border-subtle/30 flex items-center justify-between text-sm text-muted">
          <span>
            Showing {filteredProducts.length} of {totalProducts} products
          </span>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded border border-subtle/30 hover:bg-elevated disabled:opacity-50">
              Prev
            </button>
            <button className="px-3 py-1 rounded bg-accent-blue text-background font-medium">
              1
            </button>
            <button className="px-3 py-1 rounded border border-subtle/30 hover:bg-elevated">
              2
            </button>
            <button className="px-3 py-1 rounded border border-subtle/30 hover:bg-elevated">
              Next
            </button>
          </div>
        </div>
      </Card>
    </div>);

}