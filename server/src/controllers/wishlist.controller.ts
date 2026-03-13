import mongoose from 'mongoose';
import { type Response } from 'express';
import { type AuthRequest } from '../middlewares/auth.middleware';
import Product from '../models/Product';
import Wishlist from '../models/Wishlist';

const buildProductLookupQuery = (productId: string) => {
  const lookupConditions: Array<Record<string, string>> = [{ id: productId }];

  if (mongoose.Types.ObjectId.isValid(productId)) {
    lookupConditions.push({ _id: productId });
  }

  return { $or: lookupConditions };
};

const resolveProductId = async (productId: string) => {
  const product = await Product.findOne(buildProductLookupQuery(productId)).select('_id');
  return product?._id.toString() ?? null;
};

export const getWishlist = async (req: AuthRequest, res: Response) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user?._id }).populate('products');

    if (wishlist) {
      res.json(wishlist);
    } else {
      res.json({ products: [] });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addToWishlist = async (req: AuthRequest, res: Response) => {
  try {
    const productId =
      typeof req.body?.productId === 'string' ? req.body.productId : '';

    if (!productId) {
      res.status(400).json({ message: 'Product ID is required' });
      return;
    }

    const resolvedProductId = await resolveProductId(productId);

    if (!resolvedProductId) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    let wishlist = await Wishlist.findOne({ user: req.user?._id });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user?._id,
        products: [resolvedProductId],
      });
    } else if (!wishlist.products.some((id) => id.toString() === resolvedProductId)) {
      wishlist.products.push(new mongoose.Types.ObjectId(resolvedProductId));
      await wishlist.save();
    }

    const updatedWishlist = await Wishlist.findOne({ user: req.user?._id }).populate('products');
    res.status(201).json(updatedWishlist);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromWishlist = async (req: AuthRequest, res: Response) => {
  try {
    const productId = String(req.params.productId ?? '');
    const wishlist = await Wishlist.findOne({ user: req.user?._id });

    if (!wishlist) {
      res.status(404).json({ message: 'Wishlist not found' });
      return;
    }

    const resolvedProductId = await resolveProductId(productId);
    const targetProductId = resolvedProductId ?? productId;

    wishlist.products = wishlist.products.filter(
      (productObjectId) => productObjectId.toString() !== targetProductId
    );

    await wishlist.save();

    const updatedWishlist = await Wishlist.findOne({ user: req.user?._id }).populate('products');
    res.json(updatedWishlist ?? { products: [] });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};