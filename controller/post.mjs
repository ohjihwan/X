import * as postRepository from "../data/post.mjs"

// 모든 포스트를 가져오는 함수
export async function getPosts(req, res, next) {
	const userid = req.query.userid;
	const data = await(userid
		? postRepository.getAllByUserid(userid)
		: postRepository.getAll())
	res.status(200).json(data)
}

// id를 받아 하나의 포스트를 가져오는 함수
export async function getPost(req, res, next) {
	const id = req.params.id;
	const post = await postRepository.getById(id);
	if(post) {
		res.status(200).json(post);
	} else {
		res.status(404).json({ massage: `${id}의 포스트가 없습니다.`})
	}
}

// 포스트를 생성하는 함수
export async function createPost(req, res, next) {
	const {userid, name, text} = req.body;
	const post = await postRepository.create(userid, name, text);
	res.status(201).json(post);
}

// 포스트를 수정하는 함수
export async function editPost(req, res, next) {
	const id = req.params.id;
	const text = req.body.text;
	const post = await postRepository.update(id, text);
	if(post) {
		res.status(201).json(post);
	} else {
		res.status(404).json({message:`${id}의 포스트가 없습니다`})
	}
}

// 포스트를 삭제하는 함수
export async function deletePost(req, res, next) {
	const id = req.params.id;
	await postRepository.remove(id);
	res.sendStatus(204);
}
