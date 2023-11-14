import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { Select } from "antd";

import { SHOP } from "../../common/defines";
import { setSubCategory } from "../../redux/actions/shopActions";

function ShopSidebar({ categories, itemType }) {
  console.log(itemType)
  const { Option } = Select;
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.globalReducer);
  const shopState = useSelector((state) => state.shopReducer);

  const subCategory = itemType?.itemType?.find(
    (item) => item.title.toLowerCase() === globalState.category.toLowerCase()
  );
  const onChooseSubCategory = (data) => {
    if (!data || data === "all") {
      return dispatch(setSubCategory(""));
    }
    return dispatch(setSubCategory(data));
  };
  const handleChange = (value) => {
    onChooseSubCategory(value);
  };
  console.log(shopState)
  return (
    <div className="shop-sidebar">
      <h5>{globalState.category}</h5>
      <div className="shop-sidebar__subcategory">
        <ul>
          <li
            className={classNames({
              active: shopState.subCategory === "",
            })}
          >
            <Link href="" onClick={(e) => {
              e.preventDefault();
              onChooseSubCategory("all");
            }}>

              <i className="icon_document_alt" />
              All Category
            </Link>
          </li>
          {subCategory &&
            subCategory.categories.slice(0, 7).map((item, index) => (
              <li
                key={index}
                className={classNames({
                  active: shopState.subCategory === item.title,
                })}
              >
                <Link href="#" onClick={(e) => {
                  e.preventDefault();
                  onChooseSubCategory(item.title);
                }}>

                  <i className={item.iconClass} />
                  {item.title}
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <div className="shop-sidebar__subcategory-mobile">
        <Select
          defaultValue="all"
          style={{ width: "100%" }}
          onChange={handleChange}
          value={shopState.subCategory === "" ? "all" : shopState.subCategory}
        >
          <Option value="all">
            <i className="icon_document_alt" />
            All Category
          </Option>
          {subCategory &&
            subCategory.categories.map((item, index) => (
              <Option key={index} value={item.title}>
                {" "}
                <i className={item.iconClass} />
                {item.title}
              </Option>
            ))}
        </Select>
      </div>
    </div>
  );
}

export default React.memo(ShopSidebar);
