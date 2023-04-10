import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Layout from "./components/Layout";
import Login from "./components/login";
import NotifyPop from "./components/notifications/notify";
import Routers from "./routers";
import { useSelector } from "react-redux";
import "./styles/dark.scss";
import Background from "./components/background";
import ToastMessage from "./components/notifications/toastMessage";
import Loading from "./components/loading";
function App() {
  const { dark } = useSelector((state) => state.themeWeb);
  const { refreshLogin } = useSelector((state) => state.users);
  const [refreshToken, setRefreshToken] = useState(null);
  useEffect(() => {
    if (localStorage && localStorage.getItem("refreshToken")) {
      setRefreshToken(JSON.parse(localStorage.getItem("refreshToken")));
    } else setRefreshToken(null);
  }, [refreshLogin]);
  return (
    <div className={dark ? "app dark" : "app"}>
      <BrowserRouter>
        <ToastMessage />
        <Background />
        <NotifyPop />
        <Loading />
        {refreshToken ? (
          <Layout>
            <Routers />
          </Layout>
        ) : (
          <Login />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
