import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Invoice from './pages/admin/Invoice';
import NewProduct from './pages/admin/NewProduct'
import User from './pages/admin/User';
import Header from './components/Header';
import Home from './pages/user/Home'
import Menu from './pages/user/Menu'
import Login from './pages/user/Login'
import Signup from './pages/user/Signup'
import Cart from './pages/user/Cart';
import UpdateUser from './pages/user/UpdateUser'
import Footer from './components/Footer';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setDataProduct } from './redux/productSlice';
import { setDataCart } from './redux/cartSlice';
import { loginRedux } from './redux/userSlice';

function App() {

  const storageUser = JSON.parse(localStorage.getItem('user'))
  const dispatch = useDispatch()
  if (storageUser) dispatch(loginRedux(storageUser))

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}carts`)
      .then(res => {
        dispatch(setDataCart(res.data))
      })
      .catch()
  }, [dispatch])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}products`)
      .then(res => dispatch(setDataProduct(res.data)))
      .catch()
  }, [dispatch])


  return (
    <div className="App">
      <Toaster />
      <Header />
      <div className='pt-16 bg-slate-100 min-h-screen'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/menu/:id' element={<Menu />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/updateuser' element={<UpdateUser />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/newproduct' element={<NewProduct />} />
          <Route exact path='/invoice' element={<Invoice />} />
          <Route exact path='/user' element={<User />} />
          <Route exact path='*' element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
