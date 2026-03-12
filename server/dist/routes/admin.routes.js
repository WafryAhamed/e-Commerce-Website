"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const admin_middleware_1 = require("../middlewares/admin.middleware");
const router = express_1.default.Router();
router.get('/stats', auth_middleware_1.protect, admin_middleware_1.admin, admin_controller_1.getStats);
router.get('/users', auth_middleware_1.protect, admin_middleware_1.admin, admin_controller_1.getUsers);
router.put('/users/:id', auth_middleware_1.protect, admin_middleware_1.admin, admin_controller_1.updateUser);
router.get('/orders', auth_middleware_1.protect, admin_middleware_1.admin, admin_controller_1.getOrders);
router.put('/orders/:id', auth_middleware_1.protect, admin_middleware_1.admin, admin_controller_1.updateOrderStatus);
router.post('/products', auth_middleware_1.protect, admin_middleware_1.admin, admin_controller_1.createProduct);
router.put('/products/:id', auth_middleware_1.protect, admin_middleware_1.admin, admin_controller_1.updateProduct);
router.delete('/products/:id', auth_middleware_1.protect, admin_middleware_1.admin, admin_controller_1.deleteProduct);
exports.default = router;
