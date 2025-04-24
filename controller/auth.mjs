import * as authRepository from '../data/auth.mjs'

export async function signup(req, res, next){
	const {userid, password, name, email} = req.body;
	const users = await authRepository.createIser(userid, password, name, email);
	if(users) {
		res.status(201).json(users)
	}
}

export async function login(req, res, next){
	const {userid, password} = req.body;
	const user = await authRepository.login(userid, password);
	if(user) {
		res.status(200).json(`${userid}님 로그인 완료`)
	} else {
		res
		.status(404)
		.json({message: `${userid}님 아이디 또는 비밀번호를 확인하세요`})
	}
}