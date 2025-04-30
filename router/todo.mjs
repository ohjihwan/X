import express from 'express';
import * as todoController from '../controllers/todo.mjs';
import { isAuth } from '../middleware/auth.mjs';

const router = express.Router();

// ✅ 내 할 일 전체 조회
router.get('/', isAuth, todoController.getTodos);

// ✅ 새 할 일 추가
router.post('/', isAuth, todoController.createTodo);

// ✅ 특정 할 일 조회
router.get('/:id', isAuth, todoController.getTodo);

// ✅ 할 일 수정
router.put('/:id', isAuth, todoController.updateTodo);

// ✅ 할 일 삭제
router.delete('/:id', isAuth, todoController.deleteTodo);

export default router;
