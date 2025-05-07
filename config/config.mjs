import dotenv from 'dotenv';
dotenv.config();

function required(key, defaultValue = undefined) {
	const value = process.env[key] || defaultValue;
	if(value == null){
		throw new Error(`환경변수 ${key}가 설정되지 않았습니다.`);
	}
	return value;
}

export const config = {
	db : {
		host: required('DB_HOST'),
		user: required('DB_USER'),
		password: required('DB_PASSWORD'),
		database: required('DB_DATABASE')
	},
	jwt:{
		secretKey: required('JWT_SECRET', 'secret'),
		expiresInSec:parseInt(required('JWT_EXPIRES_SEC',86400))
	},
	bcrypt: {
		saltRounds:parseInt(required('BCRYPT_SALT_ROUNDS',10))
	}
}