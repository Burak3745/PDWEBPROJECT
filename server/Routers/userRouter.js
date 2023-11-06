import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Users from "../models/userModel.js";

const router = express.Router();

router.get("/get", async (req, res) => {
  try {
    const user = await Users.find();
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
});
/**
 * @swagger
 * /users/get:
 *   get:
 *    summary: Get All User
 *    description: Use to request all movie
 *    responses:
 *      200:
 *        description: A successful response
 *        
 */

/**
 * @swagger
 * definitions:
 *    User1:
 *      properties:
 *        fullname:
 *           type: string
 *        email:
 *           type: string
 *        password:
 *           type: string
 *        passwordAgain:
 *           type: string
 *        userType:
 *           type: string
 *        phoneNumber:
 *           type: string
 */




/**
 * @swagger
 * /users/signup:
 *   post:
 *    summary: Register
 *    description: this ap
 *    
 *    parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           $ref: '#/definitions/User1' 
 *    responses:
 *         200:
 *           description: added
 *          
 */
router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const { fullname, email, password, passwordAgain, phoneNumber } = req.body;

    const userExists = await Users.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists." });

    if (password !== passwordAgain)
      return res.status(400).json({ message: "Passwords do not match." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await Users.create({
      fullname,
      email,
      password: hashedPassword,
      phoneNumber,
    });
    return res.status(201).json(createdUser);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: `create user failed -> ${error.message}` });
  }
});


/**
 * @swagger
 * definitions:
 *    User2:
 *      properties:
 *        email:
 *           type: string
 *        password:
 *           type: string
 */




/**
 * @swagger
 * /users/signin:
 *   post:
 *    summary: Login
 *    description: this ap
 *    
 *    parameters:
 *       - in: body
 *         name: user
 *         description: The user to login.
 *         schema:
 *           $ref: '#/definitions/User2' 
 *    responses:
 *         200:
 *           description: added
 *          
 */

router.post("/signin", async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) return res.status(400).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Wrong password." });

    return res.status(200).json({ user, message: "Authentication successful" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * definitions:
 *    User3:
 *      properties:
 *        fullname:
 *           type: string
 *        email:
 *           type: string
 *        userType:
 *           type: string
 *        phoneNumber:
 *           type: string
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *    summary: Update User
 *    description: this ap
 *    
 *    parameters:
 *       - in: body
 *         name: user
 *         description: The user to update.
 *         schema:
 *           $ref: '#/definitions/User3' 
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID please
 *         schema:
 *           type: string
 *    responses:
 *         200:
 *           description: added
 *          
 */

router.put('/:id', async (req, res) => {
  try {

  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id))
  res.status(404).json({message: 'User is not valid'})
  const {fullname, email, password,userType,phoneNumber} = req.body

  const updatedUser = await Users.findByIdAndUpdate(id,
      { fullname, email, password, userType,phoneNumber, _id: id },
      { new: true })
  res.status(200).json(updatedUser)

  } catch (error) {
      console.log(error.message)
      res.json({ message: 'Update failed' })
  }
  
})


router.post("/profile/update", async (req, res) => {
  try {
    console.log(req.body);
    const { email, fullname, phoneNumber } = req.body;

    const userExists = await Users.findOne({ email });
    if (!userExists)
      return res.status(400).json({ message: "User doesn't exists." });

    const updatedUser = await Users.findOneAndUpdate(
      { email },
      {
        fullname,
        phoneNumber
      }
    );
    return res.status(201).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: `update user profile failed -> ${error.message}` });
  }
});

router.get("/profile/get/:email", async (req, res) => {
  try {
    console.log(req.params);
    const { email } = req.params;
    const user = await Users.findOne({ email });
    if (!user) return res.status(400).json({ message: "User doesn't exist." });
    const { fullname, phoneNumber } = user;
    return res.status(200).json( {email, fullname, phoneNumber, message: "Profile get successful" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
});





export default router;
