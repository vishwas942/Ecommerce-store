const categoryModel = require('../Models/categoryModel');
const slugify = require('slugify')

const createCategoryController = async (req,res) => {
    try {
        
        const {cName} = req.body;
        if(!cName){
            res.send({message:"Name is required"})
        }

        const existingCategory = await categoryModel.findOne({cName});
        if(existingCategory){
            return res.status(200).send({
                success:true,
                message: "Category already exists"
            })
        }

        const Category = await new categoryModel({cName, slug:slugify(cName)}).save();
         res.status(200).send({
            success:true,
            message:"Category successfully added",
            Category
         })
        
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:'Error with controller function',
            error
        })
    }
} 



const updateCategoryController = async (req, res) => {

    try {
        const {cName} = req.body;
        const {id} = req.params;   // from URL

        const Category = await categoryModel.findByIdAndUpdate(
            id,
             {cName, slug:slugify(cName)},
              {new:true}
              );

        res.status(200).send({
            success:true,
            message:"Category updated successfully",
            Category
        })
        
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:'Error with update controller function',
            error
        })
    }

}


const getAllCategoriesController = async (req, res) =>{

    try {
        
        const Category = await categoryModel.find({});
        res.status(200).send({
            success:true,
            Category
        })

    } catch (error) {
        res.status(500).send({
            success:false,
            message:'Error with get function',
            error
        })
    }

}

const singleCategoryController = async (req, res)=>{

    try {

            const Category = await categoryModel.findOne({slug: req.params.slug})
            res.status(200).send({
                success:true,
                message:'category successfully fetched',
                Category
            })
            

    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"Error in single category function",
            error
        })
    }

}

const deleteCategoryController = async(req,res) =>{
    try {
        const {id} = req.params
        const Category = await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:'category successfully Deleted',
            Category})
        
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"Error in delete category function",
            error})
    }
}

module.exports = {createCategoryController, updateCategoryController, getAllCategoriesController, singleCategoryController, deleteCategoryController}
