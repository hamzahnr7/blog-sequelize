import { body, param } from 'express-validator';
import { validationMw } from '../middlewares/validation.middleware';

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  birthdate?: Date;
}

export interface UpdateUserDTO {
  name: string;
  birthdate?: Date;
}

export class UserValidation {
  createUser = [
    body('name').isString().isLength({ max: 255 }),
    body('email').isEmail().normalizeEmail(),
    body('password').isString().isLength({ min: 8, max: 32 }),
    body('birthdate').isDate().optional(),
    validationMw,
  ];

  getUser = [param('userId'), validationMw];

  updateMe = [
    body('name').isString().isLength({ max: 255 }),
    body('birthdate').isDate().optional(),
    validationMw,
  ];
}

export default new UserValidation();
