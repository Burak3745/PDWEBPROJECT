import mongoose from 'mongoose'

const movieSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    score: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    actors: {
        type: String,
        required: true
    },
    catagory: {
        type: String,
        enum: ['Action & Advanture', 'Animation','Comedy', 'Crime','Documentary', 
        'Drama','Family', 'Kids','Mystery', 'News','Reality',
        'Sci-Fi & Fantasy','Soap', 'Talk','War & Politics', 'Western'],
    },
    image: {
        type: String,
    },
})

export default mongoose.model('Movie', movieSchema)