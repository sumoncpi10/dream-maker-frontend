
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { SessionProvider } from "next-auth/react";
import { persistor, store } from "../redux/store";
// import "@/styles/antd.less";
import "@/styles/less.css";
import "../styles/styles.scss";
import Loading from "../components/other/Loading";
import withReduxStore from "../common/withReduxStore";

const App = ({ Component, pageProps, reduxStore }) => {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <SessionProvider >
      <Provider store={reduxStore}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          {
            getLayout(<Component {...pageProps} />)
          }
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
};

export default withReduxStore(App);
