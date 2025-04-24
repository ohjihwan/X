import express from "express"
import * as authControllenr from '../controller/auth.mjs'

const router = express.Router();

// 회원가입
router.post("/signup", authControllenr.signup);

// 로그인
router.post("/login", authControllenr.login);

// 로그인 유지

export default router;
