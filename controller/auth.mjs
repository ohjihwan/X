import * as userModel from '../models/user.model.mjs'
import * as bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { config } from "../config/config.mjs"

const secretKey = config.jwt.secretKey;
const bcryptSaltRounds = config.bcrypt.saltRounds;
const jwtExpiresInDays = config.jwt.expiresInSec;

async function createJwtToken(id) {
	return jwt.sign({ id }, secretKey, { expiresIn:jwtExpiresInDays });
}

export async function signup(req, res) {
	const { userid, password, name, email } = req.body;
  
	const found = await userModel.findByUserid(userid);
	if (found) {
	  return res.status(409).json({ message: `${userid}는 이미 존재합니다.` });
	}
  
	const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
	const userId = await userModel.createUser(userid, hashed, name, email);
	const token = createJwtToken(userId);
  
	res.status(201).json({ token, userid });
}
  

export async function login(req, res, next){
	const { userid, password } = req.body;

	const user = await userModel.findByUserid(userid);
	if (!user) {
		return res.status(401).json({ message: `${userid} 아이디를 찾을 수 없음` });
	}

	const isValidPassword = await bcrypt.compare(password, user.password);
	if (!isValidPassword) {
		return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
	}

	const token = createJwtToken(user.id);
	res.status(200).json({ token, userid });
}

// export async function getMe(req, res, next) {
// 	if (req.session.userId) {
// 	  const user = await authRepository.findByUserId(req.session.userId); // data/auth.mjs에 추가해야 하는 함수
// 	  if (user) {
// 		res.status(200).json(user);
// 	  } else {
// 		res.status(404).json({ message: '사용자 정보를 찾을 수 없습니다.' });
// 	  }
// 	} else {
// 	  res.status(401).json({ message: '로그인이 필요합니다.' });
// 	}
// }
  
// export async function logout(req, res, next) {
// 	req.session.destroy((err) => {
// 	  if (err) {
// 		console.error('세션 삭제 실패:', err);
// 		return res.status(500).json({ message: '로그아웃 실패' });
// 	  }
// 	  res.status(200).json({ message: '로그아웃 성공' });
// 	});
// }

export async function verify(req, res, next) {
	const id = req.id;
	if(id){
		res.status(200).json(id);
	} else {
		res.status(401).json({message:"사용자 인증 실패"});
	}
}

export async function me(req, res, next){
	const user = await userModel.findById(req.id);
	if(!user){
		return res.status(404).json({message:"일치하는 사용자가 없음"})
	}
	res.status(200).json({token: req.token, userid:user.userid});
}