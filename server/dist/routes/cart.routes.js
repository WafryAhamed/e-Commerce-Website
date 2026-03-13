"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("../controllers/cart.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.get('/', auth_middleware_1.protect, cart_controller_1.getCart);
router.post('/add', auth_middleware_1.protect, cart_controller_1.addToCart);
router.put('/update/:productId', auth_middleware_1.protect, cart_controller_1.updateCartItem);
router.delete('/remove/:productId', auth_middleware_1.protect, cart_controller_1.removeFromCart);
router.delete('/clear', auth_middleware_1.protect, cart_controller_1.clearCart);
exports.default = router;
