import BookTile from "./book_tile";

export default function BookMenu(props) {
  const { books } = props;
  return (
    <>
      <div style={props.sx} className="books_menu_container">
        <div className="books_menu">
          {books.map((book, index) => (
            <BookTile key={`book_tile${index}`} book={book}></BookTile>
          ))}
        </div>
      </div>
    </>
  );
}
