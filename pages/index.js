import { useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import BookMenu from "../components/book_menu";

const SearchBar = (props) => {
  const router = useRouter();
  const input = useRef();
  const search = async () => {
    const searchText = input.current.value;
    if (searchText == "") return; //give user some message
    router.push(`/search/?s=${searchText}`);
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          search();
        }}
      >
        <input
          className="search_bar"
          ref={input}
          placeholder="A fantastic book awaits you"
          style={{ color: "rgb(50, 50, 50)" }}
        ></input>
        <IconButton
          style={{ position: "absolute", left: "100%" }}
          onClick={search}
        >
          <SearchIcon style={{ fill: "#8242b3", fontSize: 32 }} />
        </IconButton>
      </form>
    </>
  );
};

export default function Home(props) {
  return (
    <>
      <img
        src="/images/hero_page_banner (1).png"
        alt="One_more_chapter"
        className="hero_img"
      />
      <div className="hero_container">
        <div className="title_container">
          <div className="title">One More Chapter</div>
          <div className="subtitle">
            The right book will always keep you company
          </div>
          <div style={{ position: "relative" }}>
            <SearchBar />
          </div>
        </div>
        <div className="about"></div>
      </div>
      <div className="books_container">
        <div
          style={{
            fontWeight: "bold",
            fontSize: 23,
            color: "gray",
            padding: 30,
            paddingBottom: 0,
            marginLeft: 30,
          }}
        >
          Explore great books
        </div>
        <BookMenu books={props.books} />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const {fetch_all_books} = await import('../db/db');
  const books = await fetch_all_books();
  const props = { books };
  return {
    props,
  };
}
