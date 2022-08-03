import { useRef, useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import BookMenu from "../components/book_menu";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import Head from "next/head";

const SearchSuggestions = (props) => {
  const query = props.query;
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    if (query !== "" && query.length > 3)
      fetch(`/api/get_suggestions?q=${query}`)
        .then((res) => res.json())
        .then((books) => {
          setSuggestions(books);
        });
    if (query === "") setSuggestions([]);
  }, [props.query]);
  return (
    <>
      {suggestions.length !== 0 && (
        <Paper elevation={4} className="search_suggestion_container">
          {suggestions.map((book) => (
            <Link
              key={`suggestion_${book.isbn}`}
              href={`/book/?isbn=${book.isbn}`}
            >
              <a>
                <div className="suggestion">
                  <div className="suggestion_img">
                    <img
                      alt={`Buy ${book.title}`}
                      src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
                    />
                  </div>
                  <div className="suggestion_info">
                    <div style={{ color: "blue" }}>{book.title}</div>
                    <div
                      style={{
                        marginTop: 5,
                        textAlign: "center",
                        fontSize: 14,
                        color: "gray",
                      }}
                    >
                      {book.authors}
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </Paper>
      )}
    </>
  );
};

const SearchBar = (props) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const input = useRef();
  const search = async () => {
    if (query == "") return; //give user some message
    router.push(`/search/?s=${query}`);
  };
  const handleKeyStroke = () => {
    setQuery(input.current.value);
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          search();
        }}
      >
        <div>
          <input
            className="search_bar"
            ref={input}
            placeholder="A fantastic book awaits you"
            style={{ color: "rgb(50, 50, 50)" }}
            onChange={handleKeyStroke}
          ></input>
          <SearchSuggestions query={query} />
        </div>
        <IconButton
          style={{ position: "absolute", left: "100%", top: 0 }}
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
      <Head>
        <title>
          One More Chapter | The right book will always keep you company
        </title>
      </Head>
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
  const { fetch_all_books } = await import("../db/db");
  const books = await fetch_all_books();
  const props = { books };
  return {
    props,
  };
}
