import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import Order from '../models/Order';
import Cart from '../models/Cart';

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { items, total, shippingAddress, contactEmail } = req.body;

    if (!items || items.length === 0) {
      res.status(400).json({ message: 'No order items' });
      return;
    }

    const order = new Order({
      user: req.user?._id,
      items,
      total,
      shippingAddress,
      contactEmail,
      status: 'pending',
      paymentStatus: 'pending',
    });

    const createdOrder = await order.save();

    // Clear the cart after order
    await Cart.findOneAndUpdate({ user: req.user?._id }, { items: [] });

    res.status(201).json(createdOrder);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find({ user: req.user?._id })
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req: AuthRequest, res: Response) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    // Ensure user can only view their own orders (unless admin)
    if (order.user.toString() !== req.user?._id.toString() && req.user?.role !== 'admin') {
      res.status(403).json({ message: 'Not authorized to view this order' });
      return;
    }

    res.json(order);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
