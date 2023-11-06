import express from "express";
import mongoose from "mongoose";

import Movie from "../models/movieModel.js";
const router = express.Router();




/**
 * @swagger
 * /movie:
 *   get:
 *    summary: Get All Movie
 *    description: Use to request all movie
 *    responses:
 *      200:
 *        description: A successful response
 *        
 */

router.get("/", async (req, res) => {
    try {
        const getMovie = await Movie.find()

        res.status(200).json(getMovie)
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }
})

/**
 * @swagger
 * /movie/{id}:
 *   get:
 *    summary: Get ID Movie
 *    description: Use to request all movie
 *    parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID required
 *          schema:
 *            type: string
 *    responses:
 *      200:
 *        description: A successful response
 *        
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id))
            res.status(404).json({ message: 'Movie id is not valid' })

        const movie = await Movie.findById(id)
        if (!movie) return

        res.status(200).json(movie)
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Movie not found' })
    }
})

/**
 * @swagger
 * definitions:
 *    User:
 *      properties:
 *        name:
 *           type: string
 *        time:
 *           type: string
 *        link:
 *           type: string
 *        country:
 *           type: string
 *        year:
 *           type: string
 *        score:
 *           type: string
 *        description:
 *           type: string
 *        director:
 *           type: string
 *        company:
 *           type: string
 *        actors:
 *           type: string
 *        catagory:
 *           type: string
 */




/**
 * @swagger
 * /movie:
 *   post:
 *    summary: Add Movie
 *    description: this ap
 *    
 *    parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           $ref: '#/definitions/User' 
 *    responses:
 *         200:
 *           description: added
 *           schema:
 *              $ref: '#/definitions/User'
 *          
 */



router.post("/", async (req, res) => {
    try {
        const createdMovie = await Movie.create(req.body)
        res.status(201).json(createdMovie)
    } catch (error) {
        console.log(error);
        res.json({ message: 'Movie creation failed' })
    }


})

/**
 * @swagger
 * /movie/{id}:
 *   put:
 *    summary: Update Movie
 *    description: this ap
 *    
 *    parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           $ref: '#/definitions/User' 
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID please
 *         schema:
 *           type: string
 *    responses:
 *         200:
 *           description: added
 *           schema:
 *              $ref: '#/definitions/User'
 *          
 */

router.put('/:id', async (req, res) => {
    try {

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id))
            res.status(404).json({ message: 'This id does not belong to any movie' })

        const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(updatedMovie)

    } catch (error) {
        console.log(error.message)
        res.json({ message: 'An error occurred during the update process' })
    }

})

/**
 * @swagger
 * /movie/{id}:
 *   delete:
 *    summary: Delete Movie
 *    description: this ap
 *    
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID please
 *         schema:
 *           type: string
 *    responses:
 *         200:
 *           description: added
 *           schema:
 *              $ref: '#/definitions/User'
 *          
 */

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id))
            res.status(404).json({ message: 'This id does not belong to any movie' })

        await Movie.findByIdAndDelete(id)
        res.status(200).json({ message: 'Movie deletion successful' })
    } catch (error) {
        console.log(error.message)
        res.json({ message: 'An error occurred during the deletion process' })
    }

})

export default router;