const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc Get Contacts
//@route Get /api/contact
//@access private

const getContacts  = asyncHandler( async (req,res)=>{
     const contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json({message : "Get all contacts",contacts})
    // 
});


// @desc Create Contact
//@route Post /api/contact
//@access private

const createContact =asyncHandler(async (req,res)=>{
    console.log("The request body is",req.body);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400).json({error: "All fields are mandatory"});
        // throw new Error("All fields are mandatory");
    }

    try{
        const contact = await Contact.create({
            name,
            email,
            phone,
            user_id:req.user.id
        });
        res.status(201).json(contact);
    }catch(error){
        console.error(error);
        return res.status(500).json({error:"Failed to create contact"});
    }
    
    
} ) 

// @desc Get Contact
//@route Get /api/contact/:id
//@accessprivate


const getContact =asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json({message : `Get  contact for `,contact});
}) 

// @desc update Contact
//@route Put /api/contact/:id
//@access private

const updateContact =asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true});

    res.status(200).json({message : `Update  contact  for `,updatedContact});
}) 


// @desc Delete Contact
//@route Delete  /api/contact/:id
//@access private

const deleteContact =asyncHandler(async (req,res)=>{
 
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json({message:`Delete contact for`,contact})
})




module.exports = {getContacts,createContact,getContact,updateContact,deleteContact};