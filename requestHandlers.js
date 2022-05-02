const db = require('./db');
const jwt = require("jsonwebtoken");

const secret = 'bbbbb'

function generateToken(login) {
    return jwt.sign({ login }, secret, { expiresIn: "1800s", });
}

const signIn = async (req, res) => {
    console.log(1);
    const { login, pass } = req.body
    // Ideally search the user in a database and validate password, throw an error if not found.
    const users = await db.getUserFromDb(login, pass);

    if (users.length > 0) {
        const token = generateToken(login);
        res.json({
            token: `Bearer ${token}`,
        });
    } else {
        res.sendStatus(401);
    }
};

const signUp = async (req, res) => {
    console.log(2);
    const { login, pass } = req.body
    // Ideally search the user in a database and validate password, throw an error if not found.
    const query = await db.insertUserIntoDb(login, pass);

    const token = generateToken(login);
    res.json({
        token: `Bearer ${token}`,
    });
};

const private = async (req, res) => {
    console.log('decoded token data: ');
    console.log(req.tokenData);

    res.json({
        secret: secret,
    });
};

module.exports = {
    signIn,
    signUp,
    private
}