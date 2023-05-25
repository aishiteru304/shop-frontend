import React from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { BsCartFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { logoutRedux } from '../redux/userSlice'
import logo from "../asset/logo.png";
import { toast } from 'react-hot-toast'

export default function Header() {

    const dispatch = useDispatch()

    // const storageLogin = JSON.parse(localStorage.getItem('token'))
    // const [isLogged, setIsLogged] = useState(storageLogin ? true : false)

    const userData = useSelector(state => state.user)

    const handleLogout = () => {
        localStorage.removeItem('user')
        dispatch(logoutRedux())
        toast('Logout successfully.')
        setTimeout(() => {
            window.location.href = '/'
        }, 1000)
    }

    const cartData = useSelector(state => state.cart.cartItem)
    const userCart = cartData.filter((el) => el.email === userData.email);




    return (
        <header className='fixed shadow-md w-full h-16 lg:px-2 z-50 bg-white md:px-16 md:4'>
            <div className='flex items-center h-full justify-between'>
                <div className='h-10'>
                    <img className='h-full cursor-pointer' src={logo} alt='' onClick={() => window.location.href = '/'} />
                </div>
                <div className='flex gap-4 items-center text-lg relative'>
                    <nav className='flex gap-4'>
                        {userData.email === process.env.REACT_APP_USER_ADMIN && <Link to='/newproduct'>NewProduct</Link>}
                        {userData.email === process.env.REACT_APP_USER_ADMIN && <span className='cursor-pointer' onClick={() => window.location.href = '/invoice'}>Invoice</span>}
                        {userData.email === process.env.REACT_APP_USER_ADMIN && <span className='cursor-pointer' onClick={() => window.location.href = '/user'}>User</span>}
                    </nav>



                    <div className='relative text-slate-600'>
                        <div onClick={() => window.location.href = '/cart'} className='cursor-pointer'>
                            <BsCartFill />
                            {
                                userData._id &&
                                <div id='cartNumber' className="absolute -top-2 -right-2 text-white bg-red-500 h-4 w-4 rounded-full text-sm flex items-center justify-center">
                                    {userCart.length}
                                </div>
                            }
                        </div>
                    </div>

                    <div className='text-slate-600'>
                        <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
                            {!userData._id && <Link to='/login'><HiOutlineUserCircle /></Link>}
                            {userData._id &&
                                userData.image ? <img src={userData.image} alt='' className="h-full w-full" onClick={handleLogout} /> : <HiOutlineUserCircle onClick={handleLogout} />
                            }
                        </div>
                    </div>

                    <div className='text-slate-600'>
                        {userData._id && <Link to='/updateuser' className='cursor-pointer mr-2 -ml-4 capitalize'>{`${userData.lastName} ${userData.firstName}`} </Link>}
                    </div>

                </div>
            </div>
        </header>
    )
}
