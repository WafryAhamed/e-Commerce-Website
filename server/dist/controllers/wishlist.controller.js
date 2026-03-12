"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromWishlist = exports.addToWishlist = exports.getWishlist = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Product_1 = __importDefault(require("../models/Product"));
const Wishlist_1 = __importDefault(require("../models/Wishlist"));
const buildProductLookupQuery = (productId) => {
    const lookupConditions = [{ id: productId }];
    if (mongoose_1.default.Types.ObjectId.isValid(productId)) {
        lookupConditions.push({ _id: productId });
    }
    return { $or: lookupConditions };
};
const resolveProductId = async (productId) => {
    const product = await Product_1.default.findOne(buildProductLookupQuery(productId)).select('_id');
    return product?._id.toString() ?? null;
};
const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist_1.default.findOne({ user: req.user?._id }).populate('products');
        if (wishlist) {
            res.json(wishlist);
        }
        else {
            res.json({ products: [] });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getWishlist = getWishlist;
const addToWishlist = async (req, res) => {
    try {
        const productId = typeof req.body?.productId === 'string' ? req.body.productId : '';
        if (!productId) {
            res.status(400).json({ message: 'Product ID is required' });
            return;
        }
        const resolvedProductId = await resolveProductId(productId);
        if (!resolvedProductId) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        let wishlist = await Wishlist_1.default.findOne({ user: req.user?._id });
        if (!wishlist) {
            wishlist = await Wishlist_1.default.create({
                user: req.user?._id,
                products: [resolvedProductId],
            });
        }
        else if (!wishlist.products.some((id) => id.toString() === resolvedProductId)) {
            wishlist.products.push(new mongoose_1.default.Types.ObjectId(resolvedProductId));
            await wishlist.save();
        }
        const updatedWishlist = await Wishlist_1.default.findOne({ user: req.user?._id }).populate('products');
        res.status(201).json(updatedWishlist);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.addToWishlist = addToWishlist;
const removeFromWishlist = async (req, res) => {
    try {
        const productId = String(req.params.productId ?? '');
        const wishlist = await Wishlist_1.default.findOne({ user: req.user?._id });
        if (!wishlist) {
            res.status(404).json({ message: 'Wishlist not found' });
            return;
        }
        const resolvedProductId = await resolveProductId(productId);
        const targetProductId = resolvedProductId ?? productId;
        wishlist.products = wishlist.products.filter((productObjectId) => productObjectId.toString() !== targetProductId);
        await wishlist.save();
        const updatedWishlist = await Wishlist_1.default.findOne({ user: req.user?._id }).populate('products');
        res.json(updatedWishlist ?? { products: [] });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.removeFromWishlist = removeFromWishlist;
