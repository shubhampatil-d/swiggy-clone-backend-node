const Cart = require("../models/cart")

exports.clearCart = async (req,res) => {
    try{
        await Cart.findOneAndDelete({user: req.user._id})
        res.json({message: 'cart deleted'})

    }catch(err){
        console.error(err)
        res.status(500).json({message: "Failed to delete cart"})
    }
}