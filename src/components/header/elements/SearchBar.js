import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Select, Button, AutoComplete } from "antd";
import { useRouter } from "next/router";
import { SearchOutlined } from "@ant-design/icons";

import { SHOP } from "../../../common/defines";
import { getProductsByCategory } from "../../../common/shopUtils";
import {
  setGlobalCategory,
  setGlobalSearch,
} from "../../../redux/actions/globalActions";
import { setSubCategory } from "../../../redux/actions/shopActions";
import useDebounce from "../../../common/useDebound";
function SearchBarMobile({ fillData, placeholder, itemType }) {
  const { Option } = Select;
  const router = useRouter();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [showDropdownOptions, setShowDropdownOptions] = useState(false);
  // console.log(itemType)
  const { category: globalCategory } = useSelector((state) => state.globalReducer);
  const debouncedValue = useDebounce(search, 300);

  useEffect(() => {
    dispatch(setGlobalSearch(debouncedValue));
  }, [debouncedValue]);

  const renderAutoFillItem = () => {
    const products = getProductsByCategory(fillData, globalCategory);
    return products.map((item) => ({
      value: item.name,
    }));
  };

  const onSelectCategory = (value) => {
    dispatch(setGlobalCategory(value));
    dispatch(setSubCategory(""));
  };

  const openDropdownOptions = (value) => {
    setShowDropdownOptions(true);
    setSearch(value);
  };

  const closeDropdownOptions = () => {
    setShowDropdownOptions(false);
  };

  const onSelectOption = (value) => {
    setSearch(value);
    closeDropdownOptions();
  };

  const onSearch = () => {
    if (!search || search === "") {
      router.push("/");
    } else {
      router.push({
        pathname: "/",
        query: { q: search },
      });
    }
  };

  return (
    <div className="menu-search">
      <div className="menu-search__form">
        <Select
          className="menu-search__form-select"
          defaultValue={globalCategory}
          style={{ width: 150, marginBottom: 8 }}
          onChange={onSelectCategory}
          value={globalCategory}
        ><Option key={999} value={'All'}>
            {"All"}
          </Option>
          {itemType?.itemType?.map((item, index) => (
            <Option key={index} value={item.title}>
              {item.title}
            </Option>
          ))}
        </Select>
        <div className="menu-search__form-input">
          <AutoComplete
            allowClear
            backfill={true}
            open={showDropdownOptions}
            onSearch={openDropdownOptions}
            onBlur={closeDropdownOptions}
            onSelect={onSelectOption}
            options={renderAutoFillItem()}
            placeholder={placeholder}
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
          />
          <Button onClick={onSearch}>
            <SearchOutlined />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SearchBarMobile);
