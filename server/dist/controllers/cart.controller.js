"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCart = exports.removeFromCart = exports.updateCartItem = exports.addToCart = exports.getCart = void 0;
const Cart_1 = __importDefault(require("../models/Cart"));
const getCart = async (req, res) => {
    try {
        const cart = await Cart_1.default.findOne({ user: req.user?._id }).populate('items.product');
        if (cart) {
            res.json(cart);
        }
        else {
            res.json({ items: [] });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getCart = getCart;
const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        let cart = await Cart_1.default.findOne({ user: req.user?._id });
        if (!cart) {
            cart = await Cart_1.default.create({
                user: req.user?._id,
                items: [{ product: productId, quantity }],
            });
        }
        else {
            const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            }
            else {
                cart.items.push({ product: productId, quantity });
            }
            await cart.save();
        }
        const updatedCart = await Cart_1.default.findOne({ user: req.user?._id }).populate('items.product');
        res.status(201).json(updatedCart);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.addToCart = addToCart;
const updateCartItem = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;
        const cart = await Cart_1.default.findOne({ user: req.user?._id });
        if (!cart) {
            res.status(404).json({ message: 'Cart not found' });
            return;
        }
        const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
        if (itemIndex === -1) {
            res.status(404).json({ message: 'Item not found in cart' });
            return;
        }
        if (quantity <= 0) {
            cart.items.splice(itemIndex, 1);
        }
        else {
            cart.items[itemIndex].quantity = quantity;
        }
        await cart.save();
        const updatedCart = await Cart_1.default.findOne({ user: req.user?._id }).populate('items.product');
        res.json(updatedCart);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateCartItem = updateCartItem;
const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const cart = await Cart_1.default.findOne({ user: req.user?._id });
        if (cart) {
            cart.items = cart.items.filter((item) => item.product.toString() !== productId);
            await cart.save();
            const updatedCart = await Cart_1.default.findOne({ user: req.user?._id }).populate('items.product');
            res.json(updatedCart);
        }
        else {
            res.status(404).json({ message: 'Cart not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.removeFromCart = removeFromCart;
const clearCart = async (req, res) => {
    try {
        const cart = await Cart_1.default.findOne({ user: req.user?._id });
        if (cart) {
            cart.items = [];
            await cart.save();
            res.json({ message: 'Cart cleared' });
        }
        else {
            res.status(404).json({ message: 'Cart not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.clearCart = clearCart;
