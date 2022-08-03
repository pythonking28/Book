import { search_books } from "../../db/db";
export default async function (req, res) {
  const books = await search_books(req.query.q, 10);
  res.json(books);
}
