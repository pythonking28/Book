import {query} from '../../../db/db';
export default async function handler(req, res) {
    if(req.method !== "POST") res.send("Not available");
    const { add_customer_query, add_order_query, add_to_order_book_query} = JSON.parse(req.body);
    await query(add_customer_query);
    await query(add_order_query);
    await query(add_to_order_book_query);
    res.send("Everything is ok")
  }