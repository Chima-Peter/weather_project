import { BrowserRouter, Route, Routes } from "react-router-dom"
import {Home} from "./components/pages/home"
import ErrorPage from "./components/pages/errorpage"
import { FetchData } from "./components/utils/fetchData"

function App() {
   return (
      <FetchData>
         <BrowserRouter
            basename={import.meta.env.DEV ? '/' : '/weather_project/'}
            >
               <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="*" element={<ErrorPage />} />
               </Routes>
            </BrowserRouter>
      </FetchData>
   )
}

export default App
