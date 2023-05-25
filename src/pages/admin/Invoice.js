import React, { useState, useEffect } from 'react'
import { Paging } from '../../utility/Paging'
import { GrPrevious, GrNext } from 'react-icons/gr'
import { AiFillDelete } from 'react-icons/ai'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'


export default function Invoices() {

    const userData = useSelector(state => state.user)
    const numItemPerPage = 5
    const [pages, setPages] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}getInvoice`, {
            headers: { Authorization: `Bearer ${userData.token}` }
        })
            .then(res => {
                setPages(Paging(res.data, numItemPerPage))
            })
            .catch()
    }, [userData.token])

    const [currentPage, setCurrentPage] = useState(0)

    const handleNext = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(prev => prev + 1)
        }
    }

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1)
        }
    }


    const handleDelete = (id) => {
        const data = { id }
        axios.put(`${process.env.REACT_APP_SERVER_DOMAIN}removeInvoice`, {
            data,
            headers: { Authorization: `Bearer ${userData.token}` }
        })
            .then(res => {
                toast(res.data.message)

                setTimeout(() => {
                    window.location.href = '/invoice'
                }, 1000);
            })
            .catch()
    }


    return (
        <div>
            {
                userData.email === process.env.REACT_APP_USER_ADMIN &&
                <div className="bg-white shadow-md rounded-lg overflow-hidden mt-10 mx-20 p-2">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-4 w-1/12 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                                <th className="py-4 w-1/12 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="py-4 w-2/12 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                <th className="py-4 w-2/12 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                <th className="py-4 w-4/12 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                                <th className="py-4 w-1/12 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="py-4 w-1/12 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {

                                pages[currentPage] &&
                                pages[currentPage].map((item, index) => (
                                    <tr key={index} id={item._id}>
                                        <td className="py-4 whitespace-nowrap">{index + 1 + numItemPerPage * currentPage}</td>
                                        <td className="py-4 whitespace-nowrap">{item.name}</td>
                                        <td className="py-4 whitespace-nowrap">{item.phone}</td>
                                        <td className="py-4 whitespace-nowrap">{item.address}</td>
                                        <td className="py-4 whitespace-nowrap">
                                            {
                                                item.itemList.map((el, idx) => (
                                                    <div className='flex items-center gap-4' key={idx}>
                                                        <img className='h-8 w-8' src={el.image} alt=''></img>
                                                        <span>{el.price}k{' '}x {el.amount}</span>
                                                    </div>
                                                ))

                                            }
                                        </td>
                                        <td className="py-4 whitespace-nowrap">
                                            <p className=" font-bold text-base">
                                                <span className="cartItemPrice">{item.totalPrice}</span>k{' '}
                                                <span className="text-red-500 ">VND</span>
                                            </p>
                                        </td>
                                        <td className="py-4 whitespace-nowrap cursor-pointer"><AiFillDelete onClick={() => handleDelete(item._id)} /></td>
                                    </tr>
                                ))

                            }
                        </tbody>
                    </table>
                    <h2 className='mt-5 text-center text-lg font-medium text-gray-500'>Currently viewing page {currentPage + 1} of {pages.length}.</h2>
                    <div className='flex my-10 gap-4 justify-center'>
                        <GrPrevious onClick={handlePrev} className='cursor-pointer' />
                        <GrNext onClick={handleNext} className='cursor-pointer' />
                    </div>
                </div>
            }
        </div>

    )
}
