import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Scooter from './../../icons/scooter';
import Backbtn from './../../icons/back';
import SearchIcon from './../../icons/search';

import { getDiscountedAmount } from '../../utils/commonUtils'
import { initSearch } from './../../redux/searchReducer';
import mockData from './../../mockJson/mockJson'

import './index.scss';

const Search = () => {
    const [searchResult, setSearchResult] = useState(null)
    const [dropDownVal, setDropDownVal] = useState([])
    const [searchKey, setSearchkey] = useState('')
    const dispatch = useDispatch();
    const searchData = useSelector((state) => state.search);
    const searchValues = ['chicken', 'seafood', 'combos', 'chicken keem', 'sliced chicken'] // dropdown values for available items
    let filteredValue = null

    useEffect(() => {
        dispatch(initSearch());
    }, [dispatch])

    useEffect(() => {
        setSearchResult(searchData.searchEntities)
    }, [searchData])


    const serachHandler = (e) => {
        setSearchkey(e.target.value)
        if(e.target.value.length > 2){
            document.getElementById("myDropdown") && document.getElementById("myDropdown").classList.toggle("show");
            filteredValue = searchValues.filter(idx => idx.includes(e.target.value))
            setDropDownVal(filteredValue)
        } else {
            setDropDownVal([])
            dispatch(initSearch())
        }
    }

    const applyFilter = (e, val) => {
        document.getElementById("myDropdown") && document.getElementById("myDropdown").classList.toggle("show")
        setSearchResult([])
        setSearchkey(val)
        let value = mockData.getResult()
        value.forEach((element, idx) => {
            if(element.hasOwnProperty(val)){
                setSearchResult([element[val]])
            }
        });
    }

    const resetAction = () => {
        setSearchkey('')
        dispatch(initSearch())
    }

    return (
        <React.Fragment>
            <div className="search">
                <section>
                    <div className="header">
                        <div className="back">
                            <Backbtn />
                        </div>
                        <div className="searchBox">
                            <input
                                className="searchText"
                                type="text"
                                value={searchKey || ''}
                                placeholder="Search by category, name, type"
                                onChange={e => { serachHandler(e) }}
                            />
                            <SearchIcon />
                        </div>
                        {searchKey !== '' && <button className="product_foot" onClick={e => resetAction(e)}>Reset</button>}
                        <div className="dropdown">
                        {dropDownVal &&  <div id="myDropdown" className="dropdown-content">
                            {
                                dropDownVal.map((el, index) => {
                                    return(
                                        <div key={`search_${index}`}>
                                        <p onClick={e => {applyFilter(e, el)}}>{el}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>}
                        </div>
                    </div>
                </section>
                {(searchResult && searchResult.length > 0) ? searchResult.map((ele, idx) => {
                    return (
                        <div className="results_tile" key={idx}>
                            <div className="item_name">
                                <div className="category_title">
                                    <p>
                                        {ele.categoryDetails && ele.categoryDetails.cat_name}

                                    </p>
                                </div>
                                <div>
                                    <p>{`${ele.productDetails.length} items`}
                                    </p>
                                </div>

                            </div>
                            <div className="wrapper">
                                {
                                    ele.productDetails.map((data, indx) => {
                                        return (
                                            <div className="product_tile" key={`product_${indx}`}>
                                                <div className="product_content">
                                                    <div className="product_img">
                                                        <img src={data.item_image} alt={data.item_name} />
                                                    </div>
                                                    <div>
                                                        <h2 title={data.item_name}>{data.item_name}</h2>
                                                        <p className="product_tags">Whole bird | with skin | gutted</p>
                                                        <p className="price">
                                                            <span className="price__off">{data.item_discount}% off</span>
                                                            <span className="price__full">MRP: <span>₹{data.item_price}</span></span>
                                                            <span className="price__final">₹ {getDiscountedAmount(data.item_discount, data.item_price)}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="product_info">
                                                    <p>Server 4-6</p>
                                                    <p>Net wt: {data.net}</p>
                                                    <span className="arrow"></span>
                                                </div>
                                                <div className="product_foot">
                                                    <div className="product_delivery">
                                                        <Scooter />
                                                    Available by 8-11pm
                                                </div>
                                                    <button>ADD</button>
                                                </div>
                                            </div>
                                        )

                                    })
                                }
                            </div>
                        </div>
                    )
                }) : (     
                <div><p className="no_result">No results found.</p></div>                    
                )
                }
            </div>
        </React.Fragment>
    )
}

export default Search;