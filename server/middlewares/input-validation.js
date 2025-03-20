import joi from 'joi';

// Login Validation Schema
const loginValidationSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
});

// Signup Validation Schema
const signupValidationSchema = loginValidationSchema.keys({
    name: joi.string().min(3).required(),
    status: joi.string().required(),
});

// Login Validation Middleware
export const validateLogin = async (req, res, next) => {
    const { error } = loginValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error });
    }
    next();
};

// Signup Validation Middleware
export const validateSignup = async (req, res, next) => {
    const { error } = signupValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error });
    }
    next();
};