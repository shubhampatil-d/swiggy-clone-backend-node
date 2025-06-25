const express = require('express')
const {getRestaurants,createRestaurant}= require('../controllers/restaurantController')
const protect =  require("../middleware/auth")
console.log("✅ restaurantRoutes loaded");
const router= express.Router()

router.get("/",getRestaurants)
router.post('/', protect,createRestaurant)
module.exports =router