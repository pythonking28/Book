import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/ExitToApp";
import { useRouter } from "next/router";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
//import { createOrder } from "../db/db";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

export default function CheckoutForm(props) {
  const router = useRouter();
  const cart = useSelector((state) => state.bookStore.cart);
  const submit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(document.forms.checkout);
    let customer_details = {};
    for (let key of formdata.keys()) {
      customer_details[key] = formdata.get(key);
    }
    const { full_name, phone_number, address } = customer_details;
  const customer_id = uuidv4();
  const order_id = uuidv4();
  const books = cart.books;
  const add_to_order_book_query = "INSERT into order_book values ";
  Object.values(books).forEach((order_book, key) => {
    add_to_order_book_query += `("${order_id}", ${order_book.book.isbn}, ${order_book.quantity})`;
    if(key == Object.keys(books).length -1) add_to_order_book_query += ";";
    else add_to_order_book_query += ",";
  });
    await fetch('/api/order/new', {
      method: 'POST',
      body: JSON.stringify({
        add_customer_query: `CALL add_customer("${customer_id}", "${full_name}", "${address}", ${phone_number})`,
        add_order_query: 
        `CALL add_order("${order_id}", "${customer_id}", ${new Date().getTime()}, "in progress")`,
        add_to_order_book_query
      }),
      headers: {
        'Content-Type': "appication/json"
      }
    });
  };
  const cancel = () => {
    props.setCheckoutFormShown(false);
  };
  return (
    <>
      <Paper elevation={4} className="checkout_form_container">
        <form method="POST" name="checkout" id="checkout" onSubmit={submit}>
          <label>
            Full Name
            <PersonIcon sx={{ position: "relative", left: 10, top: 6 }} />
          </label>
          <input
            type="text"
            required
            name="full_name"
            label="Full Name"
            aria-label="Full Name"
          ></input>
          <label>
            Phone Number{" "}
            <PhoneEnabledIcon sx={{ position: "relative", left: 10, top: 6 }} />
          </label>
          <input
            type="tel"
            required
            name="phone_number"
            label="Phone Number"
            aria-label="Phone Number"
          ></input>
          <label>
            Delivery Address{" "}
            <LocationOnIcon sx={{ position: "relative", left: 10, top: 6 }} />
          </label>
          <input
            type="text"
            required
            name="address"
            label="Delivery Address"
            aria-label="deliery address"
          />
          <div style={{ textAlign: "right" }}>
            <Button
              color="primary"
              variant="contained"
              sx={{
                background: "#db3d3d",
                marginRight: 1,
                "&:hover": { background: "#c53a3a" },
              }}
              endIcon={<CancelIcon />}
              onClick={cancel}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              sx={{
                background: "rgb(57 172 57)",
                "&:hover": { background: "rgb(47 138 47)" },
              }}
              type="submit"
              form="checkout"
              endIcon={<CheckIcon />}
            >
              Place order
            </Button>
          </div>
        </form>
      </Paper>
    </>
  );
}
