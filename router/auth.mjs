import express from "express"
import * as authController from '../controller/auth.mjs'
import { body } from "express-validator";
import { validate } from "../middleware/validator.mjs";

const router = express.Router();

const validateLogin = [
	body('userid').trim()
		.isLength({min: 4})
		.withMessage('최소 4자 이상 입력')
		.matches(/^[a-zA-Z0-9]*$/)
		.withMessage('특수문자는 사용불가'),
	body('password').trim().isLength({min:8}).withMessage('최소 8자이상 입력'),
	validate
]

const validateSignup = [
	...validateLogin,
	body("name").trim().notEmpty().withMessage('name 입력'),
	body("email").trim().notEmpty().withMessage('이메일 형식 확인'),
	validate, 
]

// 회원가입
router.post("/signup", validateSignup, authController.signup);

// 로그인
router.post("/login", validateLogin, authController.login);

// 로그인 유지 (세션 정보 확인)
// router.get("/me", authController.getMe); // 이 부분이 있는지 확인!

// 로그아웃 (세션 삭제)
// router.get("/logout", authController.logout);

export default router;