import books from "../db/books.json";
import Button from "@mui/material/Button";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckoutForm from "../components/checkout_form";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function MyCart(props) {
  const [checkoutFormShown, setCheckoutFormShown] = useState(false);
  const showCheckoutForm = () => {
    setCheckoutFormShown(true);
  };
  const cart = useSelector((state) => state.bookStore.cart);
  return (
    <>
      <div className="my_cart_container">
        <div
          style={{
            padding: 20,
            fontSize: 25,
            color: "grey",
            fontWeight: "bold",
          }}
        >
          In your cart <ShoppingCartIcon />
        </div>
        <div className="cart_row cart_row_head">
          <div>Book</div>
          <div>Details</div>
          <div>Quantity</div>
        </div>
        {Object.values(cart.books).map((book_in_cart, index) => {
          const { book, quantity } = book_in_cart;
          return (
            <div key={`cart_item${index}`} className="cart_row">
              <div className="book_pic">
                <img
                  width="40"
                  height="60"
                  src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
                  alt={book.title}
                />
              </div>
              <div className="book_details">
                <div className="title">{book.title}</div>
                <div className="author">{book.authors}</div>
                <div className="price">Rs {book.price}</div>
              </div>
              <div>{quantity}</div>
            </div>
          );
        })}
        <div style={{ padding: 10, textAlign: "right" }}>
          Total: Rs {cart.totalPrice}
        </div>
        <div style={{ textAlign: "right", marginTop: 10 }}>
          <Button
            color="primary"
            variant="contained"
            sx={{
              background: "rgb(57 172 57)",
              "&:hover": { background: "rgb(47 138 47)" },
            }}
            endIcon={<ShoppingCartCheckoutIcon />}
            onClick={showCheckoutForm}
          >
            Checkout
          </Button>
        </div>
        {checkoutFormShown && (
          <CheckoutForm setCheckoutFormShown={setCheckoutFormShown} />
        )}
      </div>
    </>
  );
}
