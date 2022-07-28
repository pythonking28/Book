import {search_books, fetch_book_by_isbn} from '../db/db';
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/ShoppingCart";
import { Rating } from "react-simple-star-rating";
import BookMenu from "../components/book_menu";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/bookSlice";

export default function Book(props) {
  const { book } = props;
  const dispatch = useDispatch();
  const addCart = () => {
    dispatch(addToCart(book));
  };
  return (
    <>
      <div className="book_wrapper">
        <div className="book_img">
          <img
            src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
            alt={book.title}
          />
        </div>
        <div className="book_details">
          <div className="book_title">{book.title}</div>
          <div className="book_author">
            {book.authors.split(",").map((author) => (
              <Link href={`/search?s=${author}&mode=author`}>
                <a>{author} </a>
              </Link>
            ))}
          </div>
          <div className="book_genre">
            <span>{book.genre}</span>
          </div>
          <div className="book_price">{book.price}</div>
          <div className="book_tile_rating">
            <Rating
              ratingValue={(book.rating / 5) * 100}
              readonly
              fillColor="gold"
              size="20px"
            />
          </div>
          <Button
            color="primary"
            variant="outlined"
            sx={{ maxWidth: 100 }}
            endIcon={<AddIcon />}
            onClick={addCart}
          >
            Add
          </Button>
        </div>
      </div>
      <div className="book_summary_container">
        <div>
          <div className="title">Published By</div>
          <div className="book_publisher">{book.publisher_name}</div>
        </div>
        <div>
          <div className="title">Year</div>
          <div className="book_published_year">{book.year}</div>
        </div>
        <div>
          <div className="title">Ratings</div>
          <div className="book_rating">{book.rating}</div>
        </div>
      </div>
      <div className="book_description">{book.description}</div>
      {props.books_by_same_author.length && (
        <div className="books_from_same_author">
          <div className="title">More books from the same author/s</div>
          <BookMenu
            sx={{ background: "none", padding: 30 }}
            books={props.books_by_same_author}
          />
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const isbn = context.query.isbn;
  const book = await fetch_book_by_isbn(isbn);
  const books_by_same_author = await search_books(book[0].authors);
  const props = {
    book: book[0],
    books_by_same_author: books_by_same_author.filter(b => b.isbn != book[0].isbn)
  };
  return {
    props,
  };
}
