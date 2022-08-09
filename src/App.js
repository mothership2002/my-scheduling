import logo from './logo.svg';
import './App.css';
import Calendar from './views/Calendar';
import { RecoilRoot } from 'recoil';
import {
  BrowserRouter,
  Routes,
  Route,
  HashRouter
} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import Login from './component/Login';


function App() {
  return (
    <RecoilRoot>
      {/* <BrowserRouter> */}
      <HashRouter> {/* 도메인#/주소 */}
        <Routes>
          <Route path="/application" element={<Calendar />}>
          </Route>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </HashRouter>
      {/* </BrowserRouter> */}
    </RecoilRoot>
  );

}

export default App;
