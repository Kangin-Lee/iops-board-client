import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Board from "./Pages/Board";
import Detail from "./Pages/Detail";
import Update from "./Pages/Update";
import UserInfo from "./Pages/UserInfo";

/**
 * <pre>
 * 최초 작성자 : 이강인
 * 최초 작성일 : 2024-04-03
 * 용도 : 최상위 컴포넌트
 * </pre>
 */

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Board />} />
        <Route path="/board/:id" element={<Detail />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/userinfo" element={<UserInfo/>}/>
      </Routes>
    </>
  );
}

export default App;
