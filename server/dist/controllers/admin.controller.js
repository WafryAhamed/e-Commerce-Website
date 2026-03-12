"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.updateOrderStatus = exports.getOrders = exports.updateUser = exports.getUsers = exports.getStats = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const Order_1 = __importDefault(require("../models/Order"));
const User_1 = __importDefault(require("../models/User"));
// ── Dashboard Stats ──────────────────────────────────────────────
const getStats = async (req, res) => {
    try {
        const totalProducts = await Product_1.default.countDocuments();
        const totalOrders = await Order_1.default.countDocuments();
        const totalUsers = await User_1.default.countDocuments();
        const activeUsers = await User_1.default.countDocuments({ status: 'active' });
        const revenueResult = await Order_1.default.aggregate([
            { $match: { paymentStatus: 'paid' } },
            { $group: { _id: null, total: { $sum: '$total' } } },
        ]);
        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;
        res.json({
            totalRevenue,
            totalOrders,
            totalProducts,
            totalUsers,
            activeUsers,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getStats = getStats;
// ── Users ────────────────────────────────────────────────────────
const getUsers = async (req, res) => {
    try {
        const users = await User_1.default.find({}).select('-password');
        // Aggregate order count and total spent per user
        const userOrders = await Order_1.default.aggregate([
            {
                $group: {
                    _id: '$user',
                    orders: { $sum: 1 },
                    spent: { $sum: '$total' },
                },
            },
        ]);
        const orderMap = new Map(userOrders.map((u) => [u._id.toString(), { orders: u.orders, spent: u.spent }]));
        const enrichedUsers = users.map((user) => {
            const stats = orderMap.get(user._id.toString()) || { orders: 0, spent: 0 };
            return {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
                joined: user.createdAt,
                orders: stats.orders,
                spent: stats.spent,
            };
        });
        res.json(enrichedUsers);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getUsers = getUsers;
// ── Update User (role, status) ───────────────────────────────────
const updateUser = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.params.id);
        if (user) {
            if (req.body.role)
                user.role = req.body.role;
            if (req.body.status)
                user.status = req.body.status;
            const updatedUser = await user.save();
            res.json({
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                status: updatedUser.status,
            });
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateUser = updateUser;
// ── Orders ───────────────────────────────────────────────────────
const getOrders = async (req, res) => {
    try {
        const orders = await Order_1.default.find({}).populate('user', 'name email');
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getOrders = getOrders;
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order_1.default.findById(req.params.id);
        if (order) {
            order.status = req.body.status || order.status;
            order.paymentStatus = req.body.paymentStatus || order.paymentStatus;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        }
        else {
            res.status(404).json({ message: 'Order not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateOrderStatus = updateOrderStatus;
// ── Products ─────────────────────────────────────────────────────
const createProduct = async (req, res) => {
    try {
        const product = new Product_1.default(req.body);
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    try {
        const product = await Product_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (product) {
            res.json(product);
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const product = await Product_1.default.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteProduct = deleteProduct;
