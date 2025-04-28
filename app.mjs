import express from "express";
import cors from "cors";
import session from "express-session";
import postsRouter from "./router/posts.mjs"
import authRouter from "./router/auth.mjs"
import { config } from "./config.mjs"

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use(session({
  secret: '!@#$%^&*()',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

app.use('/posts', postsRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
})

const PORT = process.env.PORT || config.host.port
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));