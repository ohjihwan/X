import express from "express"
import * as authController from '../controller/auth.mjs'


const router = express.Router();

// 회원가입
router.post("/signup", authController.signup);

// 로그인
router.post("/login", authController.login);

// 로그인 유지 (세션 정보 확인)
router.get("/me", authController.getMe); // 이 부분이 있는지 확인!

// 로그아웃 (세션 삭제)
router.get("/logout", authController.logout);

export default router;