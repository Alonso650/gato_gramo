import pool from '../db.js';

// Route to gather all gram posts
export const getAllGrams = async(req, res) => {
    try {
        const allGrams = pool.query("SELECT * FROM gram_posts");
        res.json(allGrams.rows);
    } catch(error) {
        console.error(error.message);
    }
}

// Route for getting specific gram post
export const getGram = async(req, res) => {
    try {
        const { id } = req.params;
        const gramId = pool.query("SELECT * FROM gram_posts WHERE gram_id = $1", [id]);
        res.json(gramId.rows[0])
    } catch(error) {
        console.error(error.message);
    }
}

// Route for updating gram post
export const updateGram = async(req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const { gram_image } = req.body;

        const gramUpdate = pool.query(
            "UPDATE gram_posts SET title = $1, gram_image = $2 WHERE gram_id = $3",
            [title, gram_image, id]
        );
        res.json("Gram has been updated!");
    } catch(error) {
        console.error(error.message);
    }
}

export const createGram = async(req, res) => {
    try {
        const { title } = req.body;
        const { gram_image} = req.body;

        const newGram = pool.query(
            "INSERT INTO gram_posts (title, gram_image) VALUES($1, $2)",
            [title, gram_image]
         )
        res.json(newGram.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
}


export const deleteGram = async(req, res) => {
    try {
        const { id } = req.params;
        const gramDeleted = pool.query(
            "DELETE FROM gram_posts WHERE gram_id = $1", [id]
        );
        res.json("Gram has been deleted!");
    } catch (error) {
        console.error(error.message);
    }
}