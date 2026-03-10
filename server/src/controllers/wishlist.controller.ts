import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import Wishlist from '../models/Wishlist';

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
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ user: req.user?._id });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user?._id,
        products: [productId],
      });
    } else {
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
      }
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
    const { productId } = req.params;
    const wishlist = await Wishlist.findOne({ user: req.user?._id });

    if (wishlist) {
      wishlist.products = wishlist.products.filter((p) => p.toString() !== productId);
      await wishlist.save();
      const updatedWishlist = await Wishlist.findOne({ user: req.user?._id }).populate('products');
      res.json(updatedWishlist);
    } else {
      res.status(404).json({ message: 'Wishlist not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
