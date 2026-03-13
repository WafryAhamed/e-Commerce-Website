import { type Request, type Response } from 'express';
import Product from '../models/Product';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { q, category, brand, minPrice, maxPrice, sort, featured } = req.query;

    const filter: Record<string, any> = {};

    if (q && typeof q === 'string') {
      const regex = new RegExp(q, 'i');
      filter.$or = [{ name: regex }, { brand: regex }, { category: regex }];
    }

    if (category && typeof category === 'string') {
      filter.category = new RegExp(`^${category}$`, 'i');
    }

    if (brand && typeof brand === 'string') {
      const brands = brand.split(',').map((b) => b.trim());
      filter.brand = { $in: brands };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (featured === 'true') {
      filter.featured = true;
    }

    let sortOption: Record<string, 1 | -1> = { featured: -1, createdAt: -1 };

    if (sort && typeof sort === 'string') {
      switch (sort) {
        case 'price_asc':
          sortOption = { price: 1 };
          break;
        case 'price_desc':
          sortOption = { price: -1 };
          break;
        case 'newest':
          sortOption = { createdAt: -1 };
          break;
        case 'rating':
          sortOption = { rating: -1 };
          break;
        default:
          sortOption = { featured: -1, createdAt: -1 };
      }
    }

    const products = await Product.find(filter).sort(sortOption);
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};