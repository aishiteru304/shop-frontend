import React, { useState } from 'react'
import axios from 'axios';
import { BiShow, BiHide } from 'react-icons/bi'
import { ImagetoBase64 } from "../../utility/ImagetoBase64";
import { toast } from 'react-hot-toast';
import avatarGif from '../../asset/login-animation.gif'
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from '../../redux/userSlice'



export default function UpdateUser() {

    const [showPassword, setShowPassword] = useState(false)

    const userData = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [data, setData] = useState({
        firstName: userData.firstName,
        lastName: userData.lastName,
        image: userData.image,
        email: userData.email,
        token: userData.token,
        password: "",
    });

    const handleUploadProfileImage = async (e) => {
        const data = await ImagetoBase64(e.target.files[0])
        setData((prev) => {
            return {
                ...prev,
                image: data
            }
        })

    }

    const handleOnchange = (e) => {
        const { name, value } = e.target
        setData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleUpdate = () => {
        if (data.firstName && data.lastName && data.password) {
            axios.put(`${process.env.REACT_APP_SERVER_DOMAIN}updateuser`,
                {
                    data,
                    headers: { Authorization: `Bearer ${userData.token}` }
                })
                .then((res) => {
                    toast(res.data.message)
                    localStorage.removeItem('user')
                    dispatch(logoutRedux())
                    setTimeout(() => {
                        window.location.href = '/home'
                    }, 1000)
                })
                .catch(() => toast("Please try update again"))
        }
        else {
            toast("Please enter required fields");
        }
    }

    return (
        <div className='p-4'>
            {userData._id &&
                <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4 rounded-lg'>
                    <div className='w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative'>
                        <img className='w-full' src={data.image ? data.image : avatarGif} alt='' />
                        <label htmlFor="profileImage">
                            <div className="absolute bottom-0 h-1/3  bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
                                <p className="text-sm p-1 text-white">Upload</p>
                            </div>
                            <input type="file" id="profileImage" accept="image/*" className="hidden" onChange={handleUploadProfileImage} />
                        </label>
                    </div>

                    <div className="w-full py-3 flex flex-col">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type={"text"}
                            id="firstName"
                            name="firstName"
                            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                            value={data.firstName}
                            onChange={handleOnchange}
                        />

                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type={"text"}
                            id="lastName"
                            name="lastName"
                            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                            value={data.lastName}
                            onChange={handleOnchange}
                        />

                        <label htmlFor="password">Password</label>
                        <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className=" w-full bg-slate-200 border-none outline-none "
                                value={data.password}
                                onChange={handleOnchange}
                            />
                            <span
                                className="flex text-xl cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <BiShow /> : <BiHide />}
                            </span>
                        </div>

                        <button onClick={handleUpdate} className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
                            Update
                        </button>




                    </div>
                </div>
            }
        </div>
    )
}
