import express from 'express';
import { getComments, addComment, deleteComment } from '../controllers/comments.js';
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/:id', getComments);
router.patch('/addComment/:id', addComment);
router.patch('/deleteComment/', deleteComment);

export default router;