import { Route, Routes, useNavigate } from "react-router-dom";
import DevComponents from "../../components/DevComponents";
import MangerComponents from "../../components/MangerComponents";

export default function DevPage() {
  return (
      <>
      <Routes>
        <Route path='/' element={<DevComponents/>}/>
        <Route path='/manger' element={<MangerComponents/>}/>
      </Routes>
      </>
  );
}
