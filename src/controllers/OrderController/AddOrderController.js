const Order = require('../../models/OrderModel/OrderModel');
const Product = require('../../models/ProductModel/Product');
const User = require('../../models/UserModel/User');
const Address = require('../../models/Address/AddressModel');

const PAYMENTSTATUS = {
    1: "Completed",
    2: "Pending",
  };
// Create a new order with payment
exports.createOrder = async (req, res) => {
  try {
    const { userId, addressId, productIds, totalAmount } = req.body;

    // Create a new order
    const newOrder = await Order.create({
      userId,
      addressId,
      productIds,
      totalAmount,
      paymentStatus: 'Pending', // You may adjust the initial payment status
    });

    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

exports.getAllOrder = async (req, res) => {
    try {
        const userId = req.params.id;
        const { status } = req.query;
        
        // Create a dynamic filter based on status
        const filter = status ? { userId, paymentStatus: PAYMENTSTATUS[status] } : { userId };

        // Fetch all orders for the user
        const orderList = await Order.find(filter);

        // Create an array to store promises for fetching product details
        const orderPromises = orderList.map(async (order) => {
            // Fetch address details
            const address = await Address.findById(order.addressId);

            // Fetch user details
            const user = await User.findById(order.userId);

            // Fetch product details for each order item
            const productPromises = order.productIds.map(async (productId) => {
                const product = await Product.findById(productId);
                return product;
            });

            // Wait for all promises to resolve
            const productsWithDetails = await Promise.all(productPromises);

            return { ...order._doc, address, user, products: productsWithDetails };
        });

        // Wait for all promises to resolve
        const ordersWithDetails = await Promise.all(orderPromises);

        res.status(200).json({ success: true, orders: ordersWithDetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
};

// Update a specific order by ID
exports.updateOrderById = async (req, res) => {
    try {
      const orderId = req.params.id;
      const { status } = req.body;
  
      // Check if the Order exists
      const existingOrder = await Order.findById(orderId);
  
      if (!existingOrder) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }
  
      // Update the Order fields
      existingOrder.paymentStatus = status; // Assuming 'status' is the field you want to update
  
      // Save the updated Order
      const updatedOrder = await existingOrder.save();
  
      res.status(200).json({ success: true, order: updatedOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  };
  
  // Delete a specific order by ID
  exports.deleteOrderById = async (req, res) => {
    try {
      const orderId = req.params.id;

  
      // Check if the Order exists
      const existingOrder = await Order.findById(orderId);
  
      if (!existingOrder) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }
  
      // Remove the Order from the database
      await Order.deleteOne({ _id: orderId });
  
      res.status(200).json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  };
