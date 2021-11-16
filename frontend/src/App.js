import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CustomerHook from './Components/CustomerHook';
import CreateHook from './Components/CreateHook';
function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<CustomerHook/>}></Route>
            <Route path="/customers" element={<CustomerHook/>}></Route>
            <Route path="/add/:id" element={<CreateHook/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;