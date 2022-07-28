import { useRouter } from "next/router";
import BookMenu from "../components/book_menu";
import { search_books } from "../db/db";
import ErrorIcon from "@mui/icons-material/Error";

const EmptySearchResult = (props) => {
  return (
    <div style={{ textAlign: "center", width: 600, margin: "80px auto" }}>
      <ErrorIcon sx={{ fontSize: 250, fill: "rgba(0, 0, 0, 0.5)" }} />
      <div style={{ marginTop: 20 }}>
        Sorry, we couldn't find anything for "
        <i style={{ color: "grey" }}>{props.search_query}</i>"
      </div>
    </div>
  );
};

export default function SearchResults(props) {
  const books = props.search_results;
  return (
    <>
      <div
        style={{
          fontWeight: "bold",
          fontSize: 20,
          color: "gray",
          margin: "30px 0",
          marginLeft: 30,
        }}
      >
        {props.mode == "author" ? "Books by " : "Search results for "}
        <span style={{ color: "#65aa4e" }}>{`"${props.search_query}"`}</span>
      </div>
      {books.length === 0 ? (
        <EmptySearchResult search_query={props.search_query} />
      ) : (
        <BookMenu books={books} />
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const search_query = context.query.s;
  const mode = context.query.mode ?? "all";
  const search_results = await search_books(search_query);
  const props = { search_results, search_query, mode };
  return {
    props,
  };
}
