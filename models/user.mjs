import { db } from '../db/db.mjs';

// 회원가입 (유저 추가)
export async function createUser(userid, password, name, email) {
  const sql = `INSERT INTO users (userid, password, name, email) VALUES (?, ?, ?, ?)`;
  const [result] = await db.query(sql, [userid, password, name, email]);
  return result.insertId; // 생성된 사용자 id 반환
}

// userid로 사용자 조회 (중복 확인용 / 로그인용)
export async function findByUserid(userid) {
  const sql = `SELECT * FROM users WHERE userid = ?`;
  const [rows] = await db.query(sql, [userid]);
  return rows[0]; // 없으면 undefined
}

// id로 사용자 조회 (JWT 인증 등에서 사용)
export async function findById(id) {
  const sql = `SELECT * FROM users WHERE id = ?`;
  const [rows] = await db.query(sql, [id]);
  return rows[0];
}
