import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signUp = async(req, res) => {
    const { name, email, password } = req.body;
    const users = await User.find({ email });

    //check if user already exist.
    if (users.length)
        return res
            .status(409)
            .json({ status: 409, error: "You've already registered, kindly login" });

    const hashedPassword = bcrypt.hashSync(password, 8);

    const data = await User.create({ name, email, password: hashedPassword });
    const user = await User.findOne({ _id: data.id }, { password: 0 });
    const access_token = jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
        expiresIn: 86400,
    });

    return res
        .status(201)
        .json({ access_token, user, message: "Sign Up successful!" });
};

export const signIn = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(404).json({ error: "Email address does not exist." });
    }

    if (!bcrypt.compareSync(`${password}`, user.password)) {
        return res.status(401).json({ error: "Email/Password do not match" });
    }

    user.password = null;
    const access_token = jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
        expiresIn: 86400,
    });
    return res
        .status(200)
        .json({ access_token, user, message: "Sign In successful!" });
};

export const requireSignIn = async(req, res, next) => {
    const bearerToken = req.headers["authorization"];
    if (!bearerToken) {
        return res.status(403).json({
            error: "No token Provided!",
        });
    }

    const token = bearerToken.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log("jwt verify token err", err);
            return res
                .status(401)
                .json({ error: "Invalid Token. Please sign in again" });
        }
        req.user = decoded.user;
        next();
    });
};