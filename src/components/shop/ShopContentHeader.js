import React from 'react'; // Add this import statement

import { Select } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { setSort } from "../../redux/actions/shopActions";

function ShopContentHeader({ typeSc, data, productPerPage }) {
  const { Option } = Select;
  const dispatch = useDispatch();
  const shopState = useSelector((state) => state.shopReducer);
  const { category: globalCategory } = useSelector((state) => state.globalReducer);
  const handleChange = (value) => {
    dispatch(setSort(value));
  };
  console.log(typeSc)
  return (
    <div className="shop-content__header">
      <div className="shop-content__header-showing">
        <h1>{typeSc}</h1>
        <h5>
          {/* Showing 1 - {productPerPage} of {data.length} Products */}
        </h5>
      </div>
      <div className="shop-content__header-filter">
        <p>Filter by:</p>
        <Select
          className="shop-content__header-filter__select"
          defaultValue={shopState.sort}
          style={{ width: 250 / 16 + "em" }}
          onChange={handleChange}
        >
          <Option value="default">Default</Option>
          <Option value="lowHigh">Price: Low to High</Option>
          <Option value="highLow">Price: High to Low</Option>
          <Option value="az">A to Z</Option>
          <Option value="za">Z to A</Option>
        </Select>
      </div>
    </div>
  );
}

export default React.memo(ShopContentHeader);
