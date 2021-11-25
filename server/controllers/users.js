import pool from '../db.js';

// Create a User route
export const createUser = async(req, res) => {
    try {
        const { username } = req.body;
        const { pw } = req.body;
        const { firstName } = req.body;
        const { lastName } = req.body;
        const { email } = req.body;
        const { userAvatar } = req.body;

        const newUser = await pool.query(
            "INSERT INTO users (username, pw, firstName, lastName, email, userAvatar) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
            [username, pw, firstName, lastName, email, userAvatar]
        );
        res.json(newUser.rows[0]);
    } catch (error) {
        console.error(error.message);       
    }
}

// Get all users route (debating if still need this route)
export const getUsers = async(req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
    } catch (error) {
        console.error(error.message);
    }
}

// Get specific user
// export const getUser = async(req, res) => {
//     try {
//         const { userId } = req.params;
//         const selectUser = await pool.query(
//             "SELECT * FROM users WHERE users_id = $1",
//             [userId]
//         );
//         res.json(selectUser.rows[0]);
//     } catch (error) {
//         console.error(error.message);
//     }
// }

// Update user information
export const updateUser = async(req, res) => {
    try {
        const {id} = req.params;
        const { username } = req.body;
        const { pw } = req.body;
        const { firstName } = req.body;
        const { lastName } = req.body;
        const { email } = req.body;
        const { userAvatar } = req.body;

        const userUpdate = await pool.query(
            "UPDATE users SET username = $1, pw = $2, firstName = $3, lastName = $4, email = $5, userAvatar = $6 WHERE users_id = $7",
            [username, pw, firstName, lastName, email, userAvatar, id]
        );
        res.json("User was updated!");
    } catch (error) {
        console.error(error.message);
    }
}

// ROUTES TO BUILD //

//Create a user

// Get a user

// maybe update a user?

// Create a gram post

//  get a gram post

// update a gram post

// delete a gram post

// get all gram posts
