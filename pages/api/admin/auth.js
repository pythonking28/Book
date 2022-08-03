import { query } from "../../../db/db";
const jwt = require("jsonwebtoken");
import { serialize } from "cookie";

function errorResponse(info) {
  const error = {
    error: true,
    info,
  };
  return error;
}

let secret = `this is a secret key which preferably should be kept in a file but I
know you're a neasly lazy-ass, and you aren't gonna do it are you?`;

export function isTokenValid(token) {
  if (!token) return false;
  try {
    let decoded = jwt.verify(token, secret);
    return true;
  } catch (err) {
    return false;
  }
}

export default async function handler(req, res) {
  const { username, password } = req.body;
  const user = await query(`
  SELECT * FROM admin_info
  WHERE username = "${username}"
  `);
  if (user.length === 0)
    return res.status(500).send(errorResponse("Invalid username"));
  if (user[0].password !== password)
    return res.status(500).send(errorResponse("Incorrect Password"));
  const token = jwt.sign({ username, password }, secret, {
    expiresIn: 60 * 60 * 1000,
  });
  res.setHeader(
    "Set-Cookie",
    serialize("token", token, { maxAge: 60 * 60, path: "/" })
  );
  res.status(200).send({
    error: false,
    info: "User has been logged in",
  });
}
