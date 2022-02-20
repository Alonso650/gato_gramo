// Used for the jsonWebToken to utilize 
// functions such as verify() or sign().
// Using this secret key to encode and decode token
module.exports = {
    secret: "turtles-penguins-secret-key",
    jwtExpiration: 3600, // 1 hour
    jwtRefreshExpiration: 86400 // 24 hours
};