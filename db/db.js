const mysql = require("mysql2/promise");

const db_config = {
  host: process.env.host,
  user: process.env.user,
  database: process.env.database_name,
  password: process.env.password,
  waitForConnections: true,
  connectionLimit: 1000,
  queueLimit: 0,
};

function correct_books(book_db) {
  const books = book_db.map((book) => {
    const isbn = "" + book.isbn;
    let correct_isbn = isbn;
    if (isbn.length < 10) {
      for (let i = 0; i < 10 - isbn.length; i++) {
        correct_isbn = "0" + correct_isbn;
      }
    }
    if (isbn.length > 10 && isbn.length < 13) {
      for (let i = 0; i < 10 - isbn.length; i++) {
        correct_isbn = "0" + correct_isbn;
      }
    }
    book.isbn = correct_isbn;
    return book;
  });
  return books;
}

export async function query(query_str) {
  const connection = await mysql.createConnection(db_config);
  const [rows] = await connection.query(query_str);
  return rows;
}

export async function fetch_all_books() {
  const query_str = `
  SELECT * FROM book_details_view;
  `;
  try {
    const rows = await query(query_str);
    const books = correct_books(rows);
    return books;
  } catch (err) {
    throw err;
  }
}

export async function fetch_book_by_isbn(book_isbn) {
  const query_str = `
    SELECT * from book_details_view
    where isbn = ${book_isbn};
  `;
  try {
    const rows = await query(query_str);
    const books = correct_books(rows);
    return books;
  } catch (err) {
    throw err;
  }
}

export async function search_books(search_query, limit = null) {
  const books = await fetch_all_books();
  let queries = search_query.split(",");
  const regexps = queries.map((q) => new RegExp(q, "i"));
  const results = books.filter((book) => {
    let match = false;
    for (let i = 0; i < regexps.length; i++) {
      if (regexps[i].test(book.title) || regexps[i].test(book.authors)) {
        match = true;
        break;
      }
    }
    return match;
  });
  return limit === null ? results : results.slice(0, limit);
}

export async function get_customer_orders() {
  const query_str = `
  SELECT * FROM customer_orders
  WHERE time < ${Date.now()} and time > ${Date.now() - 86400 * 1000}
  `;
  try {
    const orders = await query(query_str);
    return orders.map((order) => {
      const order_date = new Date(order.time);
      const order_time = `${
        order_date.getHours() < 10
          ? "0" + order_date.getHours()
          : order_date.getHours()
      } : 
  ${
    order_date.getMinutes() < 10
      ? "0" + order_date.getMinutes()
      : order_date.getMinutes()
  } `;
      order.time = order_time;
      return order;
    });
  } catch (err) {
    throw err;
  }
}

export async function get_customer_order(o_id) {
  const query_str = `
  SELECT * FROM customer_orders
  WHERE order_id = "${o_id}"
  `;
  try {
    const order = await query(query_str);
    const order_date = new Date(order[0].time);
    const order_time = `${
      order_date.getHours() < 10
        ? "0" + order_date.getHours()
        : order_date.getHours()
    } : 
  ${
    order_date.getMinutes() < 10
      ? "0" + order_date.getMinutes()
      : order_date.getMinutes()
  } `;
    order[0].time = order_time;
    return order[0];
  } catch (err) {
    throw err;
  }
}
