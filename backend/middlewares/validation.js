import { body } from "express-validator";

export const loginValidation =[
    body('email').trim().isEmail().normalizeEmail().withMessage("Please provide a valid email address"),
    body('password').trim().exists().withMessage("Please is required"),
]

export const registerValidation= [
    body('username').trim().notEmpty().withMessage("Username is required"),
    body('email').trim().isEmail().normalizeEmail().withMessage("Please provide a valid email address"),
    body('password').trim().isLength({min:6}).withMessage("Please enter password with minimum length 6"),
]