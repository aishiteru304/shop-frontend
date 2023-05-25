import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CartProduct from '../../components/CartProduct'
import emptyCartImage from "../../asset/empty.gif"
import { toast } from 'react-hot-toast'
import axios from 'axios'

export default function Cart() {
    const userData = useSelector(state => state.user)
    const cartData = useSelector(state => state.cart.cartItem)
    const userCart = cartData.filter((el) => el.email === userData.email);

    const [info, setInfo] = useState({
        phone: '',
        address: ''
    })

    const [totalAmount, setTotalAmount] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)


    const handleChangeAmount = (x) => {
        setTotalAmount(totalAmount => totalAmount + x)
    }

    const handleChangePrice = (x) => {
        setTotalPrice(totalPrice => totalPrice + x)
    }

    const handleOnchange = (e) => {
        const { name, value } = e.target
        setInfo(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handlePayment = () => {
        if (totalPrice) {
            if (info.phone && info.address) {
                // Lấy tất cả các phần tử có id bắt đầu bằng "cartItem"
                const divList = document.querySelectorAll('.cartItem');
                const itemList = [];

                divList.forEach((div) => {
                    const amountElement = div.querySelector('.cartItemAmount')
                    const amount = amountElement.textContent.trim()
                    if (parseInt(amount) > 0) {

                        const priceElement = div.querySelector('.cartItemPrice');
                        const imageElement = div.querySelector('.cartItemImage');

                        const price = priceElement.textContent.trim();
                        const image = imageElement.getAttribute('src');

                        itemList.push({ price, image, amount });
                    }

                })

                const data = { totalPrice, itemList, name: userData.firstName, address: info.address, phone: info.phone }
                axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}addInvoice`, { data })
                    .then(res => {

                        toast(res.data.message)
                    })
                    .catch()
            }
            else
                toast("Please enter required fields")


        }

        else toast('Please choose amount to want to buy.')
    }

    return (
        <>

            <div className="px-2 pb-8 md:p-4">
                <h2 className="text-lg md:text-2xl font-bold text-slate-600">
                    Your Cart Items
                </h2>

                {userCart[0] ?
                    <div className="my-4 flex gap-3 flex-wrap mb-8">
                        {/* display cart items  */}
                        <div className="w-full max-w-lg mx-auto mb-4">
                            {userCart.map((el) => {
                                return (
                                    <CartProduct
                                        key={el._id}
                                        idProduct={el.idProduct}
                                        name={el.name}
                                        image={el.image}
                                        category={el.category}
                                        price={el.price}
                                        onChangeAmount={handleChangeAmount}
                                        onChangePrice={handleChangePrice}
                                    />
                                );
                            })}
                        </div>

                        {/* total cart item  */}
                        <div className="w-full max-w-md  mx-auto mb-4">
                            <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
                            <div className="flex w-full py-2 text-lg border-b">
                                <p>Total Amount</p>
                                <p className="ml-auto w-32 font-bold">{totalAmount}</p>
                            </div>
                            <div className="flex w-full py-2 text-lg border-b mb-5">
                                <p>Total Price</p>
                                <p className="ml-auto w-32 font-bold">
                                    {totalPrice}k{' '}<span className="text-red-500">VND</span>
                                </p>
                            </div>

                            <label htmlFor="phone">Phone</label>
                            <input
                                type={"text"}
                                name="phone"
                                className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                                onChange={handleOnchange}
                                value={info.phone}
                            />

                            <label htmlFor="address">Address</label>
                            <input
                                type={"text"}
                                name="address"
                                className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                                onChange={handleOnchange}
                                value={info.address}
                            />



                            <button className="bg-red-500 w-full text-lg font-bold py-2 text-white" onClick={handlePayment}>
                                Payment
                            </button>
                        </div>
                    </div>

                    :
                    <>
                        <div className="flex w-full justify-center items-center flex-col">
                            <img src={emptyCartImage} className="w-full max-w-sm" alt='' />
                            <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
                        </div>
                    </>
                }
            </div>

        </>
    )
}


