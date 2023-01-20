import { check } from 'express-validator';

export const postReviewValidator = [
  check('ratingPercent')
    .not()
    .isEmpty()
    .withMessage('Rating Percent is required'),

  check('ratingPercent')
    .isNumeric({ gt: 0, ls: 101})
    .withMessage('Rating percent must be between 0 - 100')
];






































