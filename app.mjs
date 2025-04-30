import path from 'path';
import { fileURLToPath } from 'url';
import express from "express";
import cors from "cors";
import session from "express-session";
import postsRouter from "./router/posts.mjs";
import authRouter from "./router/auth.mjs";
import todoRoutes from './routes/todo.mjs';
import { config } from "./config.mjs";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(express.json());

app.use(session({
	secret: '!@#$%^&*()',
	resave: false,
	saveUninitialized: false,
	cookie: {
		httpOnly: true,
		secure: false
	}
}));

app.use('/auth', authRouter);
app.use('/posts', postsRouter);
app.use('/todos', todoRoutes);

app.get('/', (req, res) => {
	res.send('Server is up and running!');
});

app.use((req, res) => {
	res.sendStatus(404);
});

const PORT = process.env.PORT || config.host.port;
app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});