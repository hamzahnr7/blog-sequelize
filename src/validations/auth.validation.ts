import { body } from 'express-validator';
import { validationMw } from '../middlewares/validation.middleware';

export interface RegisterUserDTO {
  name: string;
  email: string;
  password: string;
  birthdate: Date;
}

export interface LoginUserDTO {
  email: string;
  password: string;
}

export class AuthValidation {
  register = [
    body('name').isString().isLength({ max: 255 }),
    body('email').isEmail().normalizeEmail(),
    body('password').isString().isLength({ min: 8, max: 32 }),
    body('birthdate').isDate().optional(),
    validationMw,
  ];

  login = [
    body('email').isEmail().normalizeEmail(),
    body('password').isString().isLength({ min: 8, max: 32 }),
    validationMw,
  ];
}

export default new AuthValidation();
