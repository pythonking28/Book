import { query } from "../../../db/db";
import { parse } from "cookie";
import { isTokenValid } from "./auth";

export default async function handler(req, res) {
  const { token } = parse(req.headers.cookie || "");
  const status = req.query.status;
  if (!isTokenValid(token)) return res.redirect("/admin/login");
  const query_str = `
        CALL set_order_status("${req.body.order_id}", "${status}");
    `;
  await query(query_str);
  res.send("Everything is ok");
}
