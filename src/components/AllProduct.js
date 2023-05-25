import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import CardFeature from "./CardFeature";
import FilterProduct from "./FilterProduct";


const AllProduct = ({ heading }) => {

    //Set show button add card
    const userData = useSelector(state => state.user)


    const productData = useSelector((state) => state.product.productList);
    const categoryList = [...new Set(productData.map((el) => el.category))];

    //filter data display
    const [filterby, setFilterBy] = useState("");
    const [dataFilter, setDataFilter] = useState([]);

    useEffect(() => {
        setDataFilter(productData);
    }, [productData]);

    const handleFilterProduct = (category) => {
        setFilterBy(category)
        const filter = productData.filter(
            (el) => el.category.toLowerCase() === category.toLowerCase()
        );
        setDataFilter(() => {
            return [...filter];
        });
    };

    const loadingArrayFeature = new Array(10).fill(null);

    //Phần slide catelogy
    const slideCatelogyRef = useRef();
    const [xDown, setXDown] = useState()

    const nextCatelogy = () => {
        slideCatelogyRef.current.scrollLeft += 200;
    };
    const preveCatelogy = () => {
        slideCatelogyRef.current.scrollLeft -= 200;
    };
    const handleDown = (e) => {
        setXDown(e.clientX)
    }
    const handleUp = (e) => {
        if (e.clientX < xDown) nextCatelogy()
        else preveCatelogy()
    }

    return (
        <div className="my-5">
            <h2 className="font-bold text-2xl text-slate-800 mb-4">{heading}</h2>

            <div className="flex gap-4 justify-center scroll-smooth transition-all overflow-hidden select-none" ref={slideCatelogyRef}
                onMouseDown={e => handleDown(e)}
                onMouseUp={e => handleUp(e)}
            >
                {categoryList[0] ? (
                    categoryList.map((el) => {
                        return (
                            <FilterProduct
                                category={el}
                                key={el}
                                isActive={el.toLowerCase() === filterby.toLowerCase()}
                                onClick={() => handleFilterProduct(el)}
                            />
                        );
                    })
                ) : (
                    <div className="min-h-[150px] flex justify-center items-center">
                        <p>Loading...</p>
                    </div>
                )}
            </div>

            <div className="flex flex-wrap justify-center gap-4 my-4">
                {dataFilter[0]
                    ? dataFilter.map((el) => {
                        return (
                            <CardFeature
                                key={el._id}
                                id={el._id}
                                image={el.image}
                                name={el.name}
                                category={el.category}
                                price={el.price}
                                showButton={userData._id}
                                showButtonClose={userData.email === process.env.REACT_APP_USER_ADMIN}
                            />
                        );
                    })
                    :
                    loadingArrayFeature.map((el, index) => (
                        <CardFeature loading="Loading..." key={index + "allProduct"} />
                    ))}
            </div>
        </div>
    );
};

export default AllProduct;