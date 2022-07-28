import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useTheme } from "@emotion/react";
import { Rating } from "react-simple-star-rating";
import Link from "next/link";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/ShoppingCart";
import { addToCart } from "../redux/bookSlice";
import { useDispatch } from "react-redux";

const StyledPaper = styled(Paper)({
  width: 120,
  height: 180,
});

const FlexContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  padding: 10,
  gap: 5,
  width: 180,
});

export default function BookTile(props) {
  const book = props.book;
  const theme = useTheme();
  const dispatch = useDispatch();
  const addCart = () => {
    dispatch(addToCart(book));
  };
  return (
    <>
      <FlexContainer className="book_tile_container">
        <Link href={`/book/?isbn=${book.isbn}`}>
          <a>
            <StyledPaper elevation={5}>
              <img
                alt={`Buy ${book.title}`}
                className="book_tile_img"
                src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
              ></img>
            </StyledPaper>
          </a>
        </Link>
        <div style={{ fontSize: 14 }} className="book_tile_name">
          {book.title}
        </div>
        <div
          style={{ color: theme.palette.text.title, fontSize: 14 }}
          className="book_author"
        >
          {book.authors}
        </div>
        <div
          style={{ color: "darkgreen", fontSize: 12 }}
          className="book_tile_price"
        >
          Rs {book.price}
        </div>
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
      </FlexContainer>
    </>
  );
}
