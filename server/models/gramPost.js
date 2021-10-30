
import mongoose  from "mongoose";

const gramSchema = mongoose.Schema({
    title: String,
    selectedImage: String,
    likeCounter: {
        type: Number,
        default: 0
    },
    tags: [String],
    dateCrated: {
        type: Date,
        default: new Date()
    },
});



const postGram = mongoose.model("postGram", gramSchema);

export default postGram;