import Item from "../models/itemModel.js";
import AppError from "../utils/error.util.js"
import cloudinary from "cloudinary";
import fs from "fs/promises";

const getAllCategory= async (req, res, next)=>{
    try {
        const category=await Item.find({});

        res.status(200).json({
            success:true,
            message:"All category of items have loaded",
            category
        })
    } catch (e) {
        return next(new AppError(e.message,500));
    }
}

const createCategory= async (req,res,next)=>{
    const {Category ,description}= req.body;

    if(!Category || !description){
        return next(new AppError("Category cannot be created, please try again ", 500));
    }

    const category= await Item.create({
        Category,
        description,
        thumbnail:{
            public_id:"Dummy",
            secure_url:"Dummy",
        }
    })
console.log("Category not created");

    if(!category){
        return next(new AppError("Category cannot be created, please try again",500));
    }

    if(req.file){
        try {
            const result= await cloudinary.v2.uploader.upload(req.file.path,{
                folder:"onlineShopping",
            });

            if(result){
                category.thumbnail.public_id= result.public_id;
                category.thumbnail.secure_url= result.secure_url;
            }
            console.log("Done");

            fs.rm(`uploads/${req.file.filename}`);
            console.log("Done");
            
        } catch (error) {
            return next(error.message , 500)
        }
    }

    await category.save();

    res.status(200).json({
        success: true,
        message: "Category created sucessfully",
        category
    })
}

const updateCategory= async (req,res,next)=>{
    try {
        const {id}= req.params;
        const updateData = req.body;

        const category = await Item.findByIdAndUpdate(id,{ $set : updateData}, { runValidators: true ,new: true});

        if(!category){
            return next(new AppError("Category with given id does not exist", 404));
        }

        res.status(200).json({
            success:true,
            message: "Category updated successfully",
            category,
        })
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
}

const removeCategory = async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await Item.findById(id);
  
      if (!category ) {
        return next(new AppError("Category with given id does not exist", 500));
      }
      await Item.findByIdAndDelete(id);
  
      res.status(200).json({
        success: true,
        message: " Category Deleted successfully",
      });
    } catch (e) {
      return next(new AppError(e.message, 500));
    }
};

const addItemsToCategoryById= async (req,res,next)=>{
    try {
        const {title , description , cost, createdBy  }= req.body;
        const {id}= req.params;

        const category = await Item.findById(id);

        if(!title || !description || !cost || !createdBy){
            return next(new AppError("All fields are mandatory", 500))
        }

        if(!category){
            return next(new AppError("Category with given id doesn't exist", 500))
        }

        let itemData={}

        if(req.file){
            try {
                const result= await cloudinary.v2.uploader.upload(req.file.path,{
                    folder: "onlineShopping",
                    chunk_size: 500000000000,
                    resource_type: 'image',
                });

                if(result){
                    itemData.public_id = result.public_id;
                    itemData.secure_url = result.secure_url;
                }

                fs.rm(`uploads/${req.file.filename}`);
                
            } catch (error) {
                for (const file of await fs.readdir('uploads/')){
                    await fs.unlink(path.join('uploads/', file))
                  }
    
                    return next(new AppError(error.message, 500));
            }
        }

        category.items.push({
            title,
            description,
            cost,
            itemImage: itemData,
            createdBy,
        });

        await category.save();

        res.status(200).json({
            success:true,
            message:"Item Successfully added to the category",
            category,
          })

    } catch (error) {
        return next(new AppError(error.message, 500))
    }
}

const removeItemFromCategory = async (req,res,next)=>{
    const {categoryId , itemId} = req.query;
    if (!categoryId) {
        return next(new AppError('Category ID is required', 400));
      }
    
      if (!itemId) {
        return next(new AppError('Item ID is required', 400));
      }

      Item.findById(categoryId).then(category=>{
        if(!category){
            return next(new AppError("Invalid ID or Category doesn't exist", 404));
        }

        const itemIndex= category.items.findIndex(
            (item)=>item._id.toString()== itemId.toString()
        );

        if (itemIndex === -1) {
            return next(new AppError('Item does not exist.', 404));
          }

        return cloudinary.v2.uploader.destroy(
            category.items[itemIndex].itemImage.public_id,
            {resource_type: 'image'}
        ).then(()=>{
            category.items.splice(itemIndex, 1);
            return category.save();
        })

      })
      .then(()=>{
        res.status(200).json({
            success: true,
            message: 'Category Item removed successfully',
          });
      })
      .catch(err => {
        next(err);
      })
};

const addToWishlist = async (req, res, next) => {
    try {
      const { itemId } = req.body;  // Get itemId from request body
  
      if (!itemId) {
        return next(new AppError("Item ID is required", 400));  // Validation check
      }
  
      const user = await User.findById(req.user.id);  // Get user from database
      if (!user) {
        return next(new AppError("User not found", 404));  // Handle user not found
      }
  
      const item = await Item.findById(itemId);  // Find the item
      if (!item) {
        return next(new AppError("Item not found", 404));  // Handle item not found
      }
  
      // Check if the item already exists in the wishlist
      const existingItem = user.wishlist.find(wishlistItem => wishlistItem.itemId.toString() === itemId);
      if (existingItem) {
        return next(new AppError("Item is already in the wishlist", 400));  // Item already in wishlist
      }
  
      // Add item to wishlist
      user.wishlist.push({
        itemId: item._id,
        itemName: item.title,
        itemImage: item.thumbnail,
        price: item.cost
      });
  
      await user.save();  // Save user with updated wishlist
  
      res.status(201).json({
        message: "Item added to wishlist",
        wishlist: user.wishlist
      });
    } catch (error) {
      next(new AppError("Server error", 500));  // Handle unexpected server errors
    }
  };

const removeFromWishlist = async (req, res, next) => {
    try {
      const { itemId } = req.params;  // Get itemId from URL parameter
  
      const user = await User.findById(req.user.id);  // Get user from database
      if (!user) {
        return next(new AppError("User not found", 404));  // Handle user not found
      }
  
      // Find the item in the wishlist
      const itemIndex = user.wishlist.findIndex(item => item.itemId.toString() === itemId);
      if (itemIndex === -1) {
        return next(new AppError("Item not found in wishlist", 404));  // Item not found in wishlist
      }
  
      // Remove the item from wishlist
      user.wishlist.splice(itemIndex, 1);
  
      await user.save();  // Save the user with updated wishlist
  
      res.status(200).json({
        message: "Item removed from wishlist",
        wishlist: user.wishlist
      });
    } catch (error) {
      next(new AppError("Server error", 500));  // Handle unexpected server errors
    }
  };

export {
    getAllCategory,
    createCategory,
    updateCategory,
    removeCategory,
    addItemsToCategoryById,
    removeItemFromCategory,
    addToWishlist, 
    removeFromWishlist,
}