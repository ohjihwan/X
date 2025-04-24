import * as authRepository from '../data/auth.mjs'

export async function signup(req, res, next){
	const {userid, password, name, email} = req.body;
	const users = await authRepository.createUser(userid, password, name, email);
	if(users) {
		res.status(201).json(users)
	}
}

export async function login(req, res, next){
	const {userid, password} = req.body;
	const user = await authRepository.login(userid, password);
	if(user) {
	  req.session.userId = user.userid;
	  res.status(200).json({ message: `${userid}님 로그인 완료` });
	} else {
	  res
		.status(404).json({ message: `${userid}님 아이디 또는 비밀번호를 확인하세요` });
	}
}

export async function getMe(req, res, next) {
	if (req.session.userId) {
	  const user = await authRepository.findUserById(req.session.userId); // data/auth.mjs에 추가해야 하는 함수
	  if (user) {
		res.status(200).json(user);
	  } else {
		res.status(404).json({ message: '사용자 정보를 찾을 수 없습니다.' });
	  }
	} else {
	  res.status(401).json({ message: '로그인이 필요합니다.' });
	}
}
  
export async function logout(req, res, next) {
	req.session.destroy((err) => {
	  if (err) {
		console.error('세션 삭제 실패:', err);
		return res.status(500).json({ message: '로그아웃 실패' });
	  }
	  res.status(200).json({ message: '로그아웃 성공' });
	});
}
  