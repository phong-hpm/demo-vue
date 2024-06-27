import jsonServer from 'json-server';
import jsonwebtoken from 'jsonwebtoken';
import bodyParser from 'body-parser';
import { nanoid } from 'nanoid';
import dotEnv from 'dotenv';

dotEnv.config();

const server = jsonServer.create({});
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({});

const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY;
const AUTH_EXPIRED_IN = process.env.AUTH_EXPIRED_IN;

// Create a token from a payload
function createToken(payload) {
  return jsonwebtoken.sign(payload, AUTH_SECRET_KEY, { expiresIn: AUTH_EXPIRED_IN });
}

// Verify the token
function verifyToken(token) {
  return jsonwebtoken.verify(token, AUTH_SECRET_KEY, (err, decode) => (decode !== undefined ? decode : err));
}

// Check if the user exists in database
function isAuthenticated({ email, password }) {
  const userdb = router.db.get('users').value();
  const user = userdb.find((user) => user.email === email && user.password === password);
  return !!user;
}

server.use(middlewares);
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Delay
server.use((req, res, next) => {
  setTimeout(() => next(), 1000);
});

// Login route
server.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (isAuthenticated({ email, password }) === false) {
    const status = 401;
    const message = 'Incorrect email or password';
    res.status(status).json({ status, message });
    return;
  }
  const access_token = createToken({ username: email, password });
  res.status(200).json({ access_token });
});

// Middleware to protect routes
server.use(/^(?!\/auth).*$/, (req, res, next) => {
  next();
  // if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
  //   const status = 401;
  //   const message = 'Bad authorization header';
  //   res.status(status).json({ status, message });
  //   return;
  // }
  // try {
  //   const verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

  //   if (verifyTokenResult instanceof Error) {
  //     const status = 401;
  //     const message = 'Error: access_token is not valid';
  //     res.status(status).json({ status, message });
  //     return;
  //   }
  //   next();
  // } catch (err) {
  //   const status = 401;
  //   const message = 'Token is not valid';
  //   res.status(status).json({ status, message });
  // }
});

server.post(/^(?!\/auth).*$/, (req, res, next) => {
  req.body = { id: nanoid(), ...req.body };
  next();
});

server.use(router);

server.listen(8888, () => {
  console.log('Run Auth API Server');
});
