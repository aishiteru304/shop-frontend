import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import HomeCard from '../../components/HomeCard'
import { GrPrevious, GrNext } from 'react-icons/gr'
import CardFeature from '../../components/CardFeature'
import AllProduct from '../../components/AllProduct'

export default function Home() {
    const userData = useSelector(state => state.user)

    const productData = useSelector((state) => state.product.productList)

    const homeProductCartList = productData.slice(0, 4);
    const loadingArray = new Array(4).fill(null);

    const homeProductCartListFruits = productData.filter((el) => el.category === "fruits");
    const loadingArrayFeature = new Array(10).fill(null);

    const slideProductRef = useRef();
    const [xDown, setXDown] = useState()

    const nextProduct = () => {
        slideProductRef.current.scrollLeft += 200;
    };
    const preveProduct = () => {
        slideProductRef.current.scrollLeft -= 200;
    };
    const handleDown = (e) => {
        setXDown(e.clientX)
    }
    const handleUp = (e) => {
        if (e.clientX < xDown) nextProduct()
        else preveProduct()
    }

    return (
        <div className="p-2 md:p-4">
            <div className="md:flex gap-4 py-2">
                <div className="md:w-1/2">
                    <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
                        <p className="text-sm font-medium text-slate-900">Bike Delivery</p>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
                            className="h-7"
                            alt=''
                        />
                    </div>
                    <h2 className="text-4xl md:text-7xl font-bold py-3">
                        The Fasted Delivery in{" "}
                        <span className="text-red-600 text-">Your Home</span>
                    </h2>
                    <p className="py-3 text-base ">
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text
                        ever since the 1500s, when an unknown printer took a galley of type
                        and scrambled it to make a type specimen book. It has survived not
                        only five centuries
                    </p>
                    <button className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md">
                        Order Now
                    </button>
                </div>
                <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
                    {homeProductCartList[0] ?
                        homeProductCartList.map((el) => {
                            return (
                                <HomeCard
                                    key={el._id}
                                    id={el._id}
                                    image={el.image}
                                    name={el.name}
                                    price={el.price}
                                    category={el.category}
                                />
                            );
                        })
                        :
                        loadingArray.map((el, index) => {
                            return <HomeCard key={index + "loading"} loading={"Loading..."} />;
                        })
                    }

                </div>
            </div>

            <div className="">
                <div className="flex w-full items-center">
                    <h2 className="font-bold text-2xl text-slate-800 mb-4">
                        Fresh Vegetables
                    </h2>
                    <div className="ml-auto flex gap-4">
                        <button
                            className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded"
                            onClick={preveProduct}
                        >
                            <GrPrevious />
                        </button>
                        <button
                            className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded "
                            onClick={nextProduct}
                        >
                            <GrNext />
                        </button>
                    </div>
                </div>

                <div
                    className="flex gap-5 scroll-smooth transition-all overflow-hidden "
                    ref={slideProductRef}
                    onMouseDown={(e) => handleDown(e)}
                    onMouseUp={(e) => handleUp(e)}
                >
                    {homeProductCartListFruits[0]
                        ? homeProductCartListFruits.map((el) => {
                            return (
                                <CardFeature
                                    key={el._id + "vegetable"}
                                    id={el._id}
                                    name={el.name}
                                    category={el.category}
                                    price={el.price}
                                    image={el.image}
                                    showButton={userData._id}
                                    showButtonClose={userData.email === process.env.REACT_APP_USER_ADMIN}
                                />
                            );
                        })
                        : loadingArrayFeature.map((el, index) => (
                            <CardFeature loading="Loading..." key={index + "cartLoading"} />
                        ))}
                </div>
            </div>

            <AllProduct heading={"Your Product"} />

        </div>

    )
}
