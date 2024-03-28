
import { Route, Routes } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Board from './Pages/Board';
import { useState } from 'react';
import Detail from './Pages/Detail';
import Update from './Pages/Update';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
    <Routes>
      <Route path='/login' element={<Login setIsLogin={setIsLogin}/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/' element={<Board isLogin={isLogin} />}/>
      <Route path='/board/:id' element={<Detail isLogin={isLogin}/>}/>
      <Route path='/update/:id' element={<Update isLogin={isLogin}/>}/>
    </Routes>
    </>
  );
}

export default App;
