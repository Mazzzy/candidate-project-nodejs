const express = require('express');
const { checkSchema } = require('express-validator');

const authController = require('../controllers/auth');
const userController = require("../controllers/user");
const postController = require("../controllers/post");
const commentController = require("../controllers/comment");

const { createUserSchema } = require('../models/userModel');
const { validate } = require('../utils/helpers');

const userRouter = express.Router();

userRouter.route('/')
  .get(authController.protect, userController.getAllUsers)
  .post(authController.protect, validate(checkSchema(createUserSchema)), userController.createUser);

userRouter.route('/:id')
  .get(authController.protect, userController.getUserById)
  .patch(authController.protect, validate(checkSchema(createUserSchema)), userController.updateUser)
  .delete(authController.protect, userController.deleteUser);

userRouter.route('/:userId/posts')
  .get(authController.protect, postController.getPostsByUserId);

userRouter.route('/:userId/posts/:postId/comments')
  .get(authController.protect, commentController.getCommentsByPostId);

module.exports = userRouter;
