import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Testimonials from './pages/Testimonials';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/testimonials" element={<Testimonials />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
