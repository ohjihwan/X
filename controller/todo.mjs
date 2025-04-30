import * as todoModel from '../models/todo.mjs';

// ✅ 내 할 일 목록 조회
export async function getTodos(req, res) {
	const userId = req.userId;
	const todos = await todoModel.getTodosByUser(userId);
	res.status(200).json(todos);
}

// ✅ 할 일 등록
export async function createTodo(req, res) {
	const userId = req.userId;
	const { title } = req.body;

	if (!title || title.trim() === '') {
		return res.status(400).json({ message: '할 일 내용을 입력하세요.' });
	}

	const todoId = await todoModel.createTodo(userId, title);
	const todo = await todoModel.getTodoById(todoId);
	res.status(201).json(todo);
}

// ✅ 특정 할 일 조회
export async function getTodo(req, res) {
	const id = req.params.id;
	const todo = await todoModel.getTodoById(id);

	if (!todo) {
		return res.status(404).json({ message: '해당 할 일을 찾을 수 없습니다.' });
	}

	res.status(200).json(todo);
}

// ✅ 할 일 수정
export async function updateTodo(req, res) {
	const id = req.params.id;
	const { title, completed } = req.body;

	const updated = await todoModel.updateTodo(id, title, completed);
	if (!updated) {
		return res.status(404).json({ message: '수정할 할 일을 찾을 수 없습니다.' });
	}

	const todo = await todoModel.getTodoById(id);
	res.status(200).json(todo);
}

// ✅ 할 일 삭제
export async function deleteTodo(req, res) {
	const id = req.params.id;
	await todoModel.deleteTodo(id);
	res.sendStatus(204);
}
