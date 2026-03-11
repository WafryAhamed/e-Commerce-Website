import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User';
import Product from './models/Product';
import Order from './models/Order';
import Cart from './models/Cart';
import Wishlist from './models/Wishlist';
import fs from 'fs';
import path from 'path';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const extractMockData = () => {
  // Simple extraction of the mockProducts array from the mock.ts file (simplistic eval)
  const mockFilePath = path.join(__dirname, '../../client/src/data/mock.ts');
  const mockFileContent = fs.readFileSync(mockFilePath, 'utf-8');
  
  // A robust way would be to import if configured, or parse string. For simplicity:
  const arrayStart = mockFileContent.indexOf('const mockProducts: Product[] = [');
  const arrayEnd = mockFileContent.indexOf('export const mockBrands: Brand[] = [');
  const arrayString = mockFileContent.slice(arrayStart, arrayEnd)
    .replace('const mockProducts: Product[] = ', '')
    .trim()
    .slice(0, -1); // remove trailing semicolon

  // Remove comment lines and wrap unquoted keys to make it valid JSON just for seeding, or we can just evaluate it
  // Given we are running via ts-node, we can just import it directly!
  return require('../../client/src/data/mock.ts').mockProducts;
};

const importData = async () => {
  try {
    await connectDB();
    
    await Order.deleteMany();
    await Cart.deleteMany();
    await Wishlist.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const createdUsers = await User.create([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: await bcrypt.hash('user123', salt),
        role: 'user',
      }
    ]);

    const adminUser = createdUsers[0]._id;

    // We can simply import mock products if TS configured properly:
    // This script assumes we run it via ts-node which can parse the TS module.
    const { mockProducts } = require('../../client/src/data/mock');

    const sampleProducts = mockProducts.map((p: any) => {
      // Keep everything, map id to frontend id, but mongodb uses _id.
      // We stored id as unique string in Product schema.
      return { ...p };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error during import: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await Order.deleteMany();
    await Cart.deleteMany();
    await Wishlist.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error during destruction: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
