import "../styles/globals.css";
import Layout from "../components/layout";
import theme from "../styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import { store } from "../redux/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
