import React, { useState } from "react";
import { TbPlus, TbMinus } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from 'react-redux'
import axios from "axios";
import { toast } from 'react-hot-toast'


const CartProduct = ({ idProduct, name, image, category, price, onChangeAmount, onChangePrice }) => {

    const userData = useSelector(state => state.user)

    const [amount, setAmount] = useState(0)

    const handlePlus = (e) => {
        setAmount(amount => amount + 1)
        onChangeAmount(1)
        onChangePrice(parseFloat(price))
    }
    const handleAbstract = () => {
        if (amount > 0) {
            setAmount(amount => amount - 1)
            onChangeAmount(-1)
            onChangePrice(-parseFloat(price))

        }

    }

    const handleDelete = () => {
        const data = { email: userData.email, idProduct }
        axios.put(`${process.env.REACT_APP_SERVER_DOMAIN}removeToCart`, { data })
            .then(res => {
                toast(res.data.message)

                const cartItemElement = document.getElementById('cartItem' + idProduct)
                if (cartItemElement)
                    cartItemElement.remove()

                const cartNumberElement = document.getElementById("cartNumber");
                const currentValue = parseInt(cartNumberElement.innerHTML)
                cartNumberElement.innerHTML = (currentValue - 1);
                onChangeAmount(-amount)
                onChangePrice(-parseFloat(price) * amount)
            })
            .catch(() => toast("Please try remove again"))


    }

    return (
        <div id={`cartItem${idProduct}`} className="bg-slate-200 p-2 flex gap-4 rounded border border-slate-300 cartItem">
            <div className="p-3 bg-white rounded overflow-hidden">
                <img src={image} className="h-28 w-40 object-cover cartItemImage " alt='' />
            </div>
            <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-between">
                    <h3 className="font-semibold text-slate-600  capitalize text-lg md:text-xl">
                        {name}
                    </h3>
                    <div className="cursor-pointer text-slate-700 hover:text-red-500" onClick={handleDelete}>
                        <AiFillDelete />
                    </div>
                </div>
                <p className=" text-slate-500  font-medium ">{category}</p>
                <p className=" font-bold text-base">
                    <span className="cartItemPrice">{price}</span>k{' '}
                    <span className="text-red-500 ">VND</span>
                </p>
                <div className="flex justify-between ">
                    <div className="flex gap-3 items-center">
                        <button className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1 " onClick={handlePlus}>
                            <TbPlus />
                        </button>
                        <p className="font-semibold p-1 cartItemAmount">{amount}</p>
                        <button
                            onClick={handleAbstract}
                            className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1 "
                        >
                            <TbMinus />
                        </button>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-slate-700">
                        <p>Total :</p>
                        <p className='totalPrice'>{amount * parseFloat(price)}k{' '}<span className="text-red-500">VND</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartProduct;