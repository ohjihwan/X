import { db } from '../db/db.mjs';

// ✅ 할 일 추가
export async function createTodo(userId, title) {
  const sql = `INSERT INTO todos (user_id, title) VALUES (?, ?)`;
  const [result] = await db.query(sql, [userId, title]);
  return result.insertId;
}

// ✅ 내 할 일 전체 조회
export async function getTodosByUser(userId) {
  const sql = `SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC`;
  const [rows] = await db.query(sql, [userId]);
  return rows;
}

// ✅ 특정 할 일 조회
export async function getTodoById(id) {
  const sql = `SELECT * FROM todos WHERE id = ?`;
  const [rows] = await db.query(sql, [id]);
  return rows[0];
}

// ✅ 할 일 수정 (제목/완료 여부)
export async function updateTodo(id, title, completed) {
  const sql = `UPDATE todos SET title = ?, completed = ? WHERE id = ?`;
  const [result] = await db.query(sql, [title, completed, id]);
  return result.affectedRows;
}

// ✅ 할 일 삭제
export async function deleteTodo(id) {
  const sql = `DELETE FROM todos WHERE id = ?`;
  await db.query(sql, [id]);
}
