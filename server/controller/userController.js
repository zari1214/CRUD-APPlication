import User from "../model/userModel.js";

// Input validation function
const validateUserInput = (userData) => {
  const errors = [];
  
  // Validate name
  if (!userData.name || typeof userData.name !== 'string') {
    errors.push('Name is required and must be a string');
  } else if (userData.name.trim().length < 2 || userData.name.trim().length > 50) {
    errors.push('Name must be between 2 and 50 characters');
  }
  
  // Validate email
  if (!userData.email || typeof userData.email !== 'string') {
    errors.push('Email is required and must be a string');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email.trim())) {
      errors.push('Please provide a valid email address');
    }
  }
  
  // Validate address
  if (!userData.address || typeof userData.address !== 'string') {
    errors.push('Address is required and must be a string');
  } else if (userData.address.trim().length < 5 || userData.address.trim().length > 200) {
    errors.push('Address must be between 5 and 200 characters');
  }
  
  return errors;
};

// Sanitize user input
const sanitizeUserInput = (userData) => {
  return {
    name: userData.name ? userData.name.trim() : '',
    email: userData.email ? userData.email.trim().toLowerCase() : '',
    address: userData.address ? userData.address.trim() : ''
  };
};

export const create = async(req, res) =>{
    try{
         // Validate input
         const validationErrors = validateUserInput(req.body);
         if (validationErrors.length > 0) {
           return res.status(400).json({ 
             message: "Validation failed", 
             errors: validationErrors 
           });
         }
         
         // Sanitize input
         const sanitizedData = sanitizeUserInput(req.body);
         const newUser = new User(sanitizedData);
         const {email} = newUser;
          
         const userExist = await User.findOne({ email })
           if (userExist) {
             return res.status(400).json({ message: "User already exists."});
           }
           const saveData = await newUser.save();
            //   res.status(200).json(saveData);
            res.status(200).json({message:"User created successfully."});


    } catch (error) {
        res.status(500).json({errorMessage:error.message})
    }
};

export const getAllUsers = async(req, res) =>{
     try {
         const userData = await User.find();
         if (!userData || userData.length === 0) {
             return res.status(404).json({message: "User data not found." });
         }
         res.status(200).json(userData);
     } catch (error) {
      res.status(500).json({ errorMessage: error.message });
     }
};

 export const getUserById = async(req, res) => {
    try {
            const id = req.params.id;
            const userExist = await User.findById(id);
                if (!userExist) {
                    return res.status(404).json({ message: "User not found." });
                }     
                res.status(200).json(userExist); 

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
 };

 export const update = async (req, res) => {
        try {
          // Validate input
          const validationErrors = validateUserInput(req.body);
          if (validationErrors.length > 0) {
            return res.status(400).json({ 
              message: "Validation failed", 
              errors: validationErrors 
            });
          }
          
          const id = req.params.id;
          const userExist = await User.findById(id);
              if (!userExist) {
                  return res.status(404).json({ message: "User not found." });
              }
              
          // Sanitize input
          const sanitizedData = sanitizeUserInput(req.body);
          
          // Check for email uniqueness (excluding current user)
          if (sanitizedData.email !== userExist.email) {
            const emailExists = await User.findOne({ 
              email: sanitizedData.email,
              _id: { $ne: id } // Exclude current user from check
            });
            if (emailExists) {
              return res.status(400).json({ message: "Email already exists." });
            }
          }
             
           const UpdatedData =  await User.findByIdAndUpdate(id, sanitizedData, {
              new: true
            })
            // res.status(200).json(UpdatedData)
        res.status(200).json({message:"User Updated successfully."});

        } catch (error) {
        res.status(500).json({ errorMessage: error.message });

        }
 };

 export const deleteUser = async (req, res)=>{
       try {
        const id = req.params.id;
            const userExist = await User.findById(id);
                if (!userExist) {
                    return res.status(404).json({ message: "User not found." });
                }  
                await User.findByIdAndDelete(id);
                res.status(200).json({ message: "User deleted successfully." });
       } catch (error) {
        res.status(500).json({ errorMessage: error.message });
       }
 };
