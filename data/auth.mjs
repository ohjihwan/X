let users = [
	{
		id: "1",
		name: "김사과",
		userid: "apple",
		text: "auth!! Node.js 배우는 중인데 Express 진짜 편하다! :로켓:",
		createdAt: Date.now().toString(),
		url: "https://randomuser.me/api/portraits/women/32.jpg",
	},
	{
		id: "2",
		name: "반하나",
		userid: "banana",
		text: "오늘의 커피 :커피:️ + 코딩 = 최고의 조합!",
		createdAt: Date.now().toString(),
		url: "https://randomuser.me/api/portraits/women/44.jpg",
	},
	{
		id: "3",
		name: "오렌지",
		userid: "orange",
		text: "Elasticsearch 연동 완료! 실시간 검색 API 짜릿해 :돋보기:",
		createdAt: Date.now().toString(),
		url: "https://randomuser.me/api/portraits/men/11.jpg",
	},
	{
		id: "4",
		name: "배애리",
		userid: "berry",
		text: "JavaScript 비동기 너무 어렵다... Promises, async/await, 뭐가 뭔지 :울음:",
		createdAt: Date.now().toString(),
		url: "https://randomuser.me/api/portraits/women/52.jpg",
	},
	{
		id: "5",
		name: "이메론",
		userid: "melon",
		text: "새 프로젝트 시작! Express + MongoDB + EJS 조합 좋아요 :전구:",
		createdAt: Date.now().toString(),
		url: "https://randomuser.me/api/portraits/men/29.jpg",
	},
];

export async function createUser(userid, password, name, email) {
	const user = {
		id: Date.now().toString(),
		userid,
		password,
		name,
		email,
		url: 'https://randomuser/api/portraits/men/29.jpg'
	};
	users = [user, ...users]
	return users;
}

export async function login(userid, password) {
	const user = users.find(
		(user) => user.userid === userid && user.password === password
	)
	return user;
}

export async function findByUserId(userid) {
	return users.find((user) => user.userid === userid);
}

export async function findById(id) {
	return users.find((user) => user.id === id);
}