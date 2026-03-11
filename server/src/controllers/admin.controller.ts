import { Request, Response } from 'express';
import Product from '../models/Product';
import Order from '../models/Order';
import User from '../models/User';

// ── Dashboard Stats ──────────────────────────────────────────────
export const getStats = async (req: Request, res: Response) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: 'active' });

    const revenueResult = await Order.aggregate([
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
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ── Users ────────────────────────────────────────────────────────
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}).select('-password');

    // Aggregate order count and total spent per user
    const userOrders = await Order.aggregate([
      {
        $group: {
          _id: '$user',
          orders: { $sum: 1 },
          spent: { $sum: '$total' },
        },
      },
    ]);

    const orderMap = new Map(
      userOrders.map((u: any) => [u._id.toString(), { orders: u.orders, spent: u.spent }])
    );

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
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ── Update User (role, status) ───────────────────────────────────
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      if (req.body.role) user.role = req.body.role;
      if (req.body.status) user.status = req.body.status;
      const updatedUser = await user.save();
      res.json({
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        status: updatedUser.status,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ── Orders ───────────────────────────────────────────────────────
export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email');
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = req.body.status || order.status;
      order.paymentStatus = req.body.paymentStatus || order.paymentStatus;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ── Products ─────────────────────────────────────────────────────
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
