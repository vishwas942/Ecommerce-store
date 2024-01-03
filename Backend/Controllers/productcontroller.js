const { default: slugify } = require('slugify');
const productModel = require('../Models/productModel')
const categoryModel = require('../Models/categoryModel');
const fs = require('fs')
const braintree = require('braintree') ;
const orderModel = require('../Models/orderModel')
const createProductController = async (req,res)=>{


//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});


    try {
        const {Name,slug, Description, Price, Category, Quantity, Shipping } = req.fields;
         const {Image} = req.files;
        if(!Name){
            res.send({message:"Name is required"})
        }
        if(!Description){
            res.send({message:"Description is required"})
        }
        if(!Price){
            res.send({message:"Price is required"})
        }
        if(!Category){
            res.send({message:"Category is required"})
        }
        if(!Quantity){
            res.send({message:"Quantity is required"})
        }
        if(!Image && Image.size > 1000000){
            res.send({message:"Shipping is required"})
        }

        const Product = new productModel( {...req.fields, slug:slugify(Name)});
        if(Image){
            Product.Image.data = fs.readFileSync(Image.path);
            Product.Image.contentType = Image.Type;
        }

        await Product.save()
        return res.status(200).send({
            success:true,
            message:"Product added successfully",
            Product
        })


        
    } catch (error) {
        console.log(error);
        return res.status(500).send({

            status:false,
            message:"Error in create product function",
            error
        })
    }

}



const getAllProductController = async (req,res) =>{

    try {
        const Products = await productModel.find({}).populate('Category').select("-Image").limit(12).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            counTotal:Products.length,
            Products
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({

            status:false,
            message:"Error in create product function",
            error
        })
    }

}


const getSingleProductController = async (req,res) =>{

    try {
        
        const Product = await productModel.findOne({slug:req.params.slug}).select(("-Image")).populate('Category')
        res.status(200).send({
            success:true,
            message:"Single product fetched",
            Product
        })



    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status:false,
            message:"Error in Get product function",
            error
        })
    }

}


const getProductImageController = async (req, res) =>{

    try {
        const Product = await productModel.findById(req.params.pid).select('Image');
        if(Product.Image.data){
            res.set("Content-type", Product.Image.contentType)
            return res.status(200).send(Product.Image.data)
        }

        
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status:false,
            message:"Error in Get product function",
            error
        })
    }

}

const deleteProductController = async (req,res) =>{
    try {
        
        await productModel.findByIdAndDelete(req.params.pid).select("-Image");
        res.status(200).send({
            success:true,
            message:"Product deleted Successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status:false,
            message:"Error in Get product function",
            error
        })
    }
}


const updateProductController = async (req,res) =>{
    try {
        const {Name,slug, Description, Price, Category, Quantity, Shipping } = req.fields;
         const {Image} = req.files;
        if(!Name){
            res.send({message:"Name is required"})
        }
        if(!Description){
            res.send({message:"Description is required"})
        }
        if(!Price){
            res.send({message:"Price is required"})
        }
        if(!Category){
            res.send({message:"Category is required"})
        }
        if(!Quantity){
            res.send({message:"Quantity is required"})
        }
        if(!Image && Image.size > 1000000){
            res.send({message:"Shipping is required"})
        }

        const Product = await productModel.findByIdAndUpdate(req.params.pid, {...req.fields, slug:slugify(Name)}, {new:true});
        if(Image){
            Product.Image.data = fs.readFileSync(Image.path);
            Product.Image.contentType = Image.Type;
        }

        await Product.save()
        return res.status(200).send({
            success:true,
            message:"Product updated successfully",
            Product
        })


        
    } catch (error) {
        console.log(error);
        return res.status(500).send({

            status:false,
            message:"Error in update product function",
            error
        })
    }
}


// filters
 const productFiltersController = async (req, res) => {
    try {
      const { checked, radio } = req.body;
      let args = {};
      if (checked.length > 0) args.Category = checked;
      if (radio.length) args.Price = { $gte: radio[0], $lte: radio[1] };
      const products = await productModel.find(args);
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Filtering Products",
        error,
      });
    }
  };
  
  // product count
   const productCountController = async (req, res) => {
    try {
      const total = await productModel.find({}).estimatedDocumentCount();
      res.status(200).send({
        success: true,
        total,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Error in product count",
        error,
        success: false,
      });
    }
  };
  
  // product list base on page
   const productListController = async (req, res) => {
    try {
      const perPage = 6;
      const page = req.params.page ? req.params.page : 1;
      const products = await productModel.find({})
        .select("-photo")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "error in per page ctrl",
        error,
      });
    }
  };
  
  // search product
   const searchProductController = async (req, res) => {
    try { 
      const { keyword } = req.params;
      const resutls = await productModel
        .find({
          $or: [
            { Name: { $regex: keyword, $options: "i" } },
            { Description: { $regex: keyword, $options: "i" } },
          ],
        })
        .select("-photo");
      res.json(resutls);
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error In Search Product API",
        error,
      });
    }
  };
  
  // similar products
   const realtedProductController = async (req, res) => {
    try {
      const { pid, cid } = req.params;
      const products = await productModel
        .find({
          Category: cid,
          _id: { $ne: pid },
        })
        .select("-photo")
        .limit(3)
        .populate("category");
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "error while geting related product",
        error,
      });
    }
  };
  
  // get prdocyst by catgory
  const productCategoryController = async (req, res) => {
    try {
      const Category = await categoryModel.findOne({ slug: req.params.slug });
      const products = await productModel.find({ Category }).select(("-Image")).populate("Category");
      res.status(200).send({
        success: true,
        Category,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        error,
        message: "Error While Getting products",
      });
    }
  };


  //payment gateway api
//token
 const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
 const brainTreePaymentController = async (req, res) => {
  try {
    const {
      //  nonce,
        cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    // let newTransaction = gateway.transaction.sale(
    //   {
    //     amount: total,
    //     paymentMethodNonce: nonce,
    //     options: {
    //       submitForSettlement: true,
    //     },
    //   },
      // function (error, result) {
      //   if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        }
        //  else {
        //   res.status(500).send(error);
        // }

   catch (error) {
    console.log(error);
  }
};

 
module.exports =  {createProductController, brainTreePaymentController,braintreeTokenController,getAllProductController, getSingleProductController, getProductImageController, deleteProductController, updateProductController, productFiltersController, productCountController,productListController,searchProductController,realtedProductController, productCategoryController} 