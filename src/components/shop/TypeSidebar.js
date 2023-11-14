import React from 'react';
import { Menu, Card } from 'antd';
import Link from 'next/link';

const TypeSidebar = ({ itemType }) => {
  // console.log(itemType)
  // Sample data for menu categories
  // const itemType = [
  //   {
  //     title: "Women's & Girls' Fashion",
  //     categories: [
  //       {
  //         title: 'Subcategory 1.1',
  //         subcategories: ['Item 1.1.1', 'Item 1.1.2', 'Item 1.1.3'],
  //       },
  //       {
  //         title: 'Subcategory 1.2',
  //         subcategories: ['Item 1.2.1', 'Item 1.2.2', 'Item 1.2.3'],
  //       },
  //       {
  //         title: 'Subcategory 1.3',
  //         subcategories: ['Item 1.3.1', 'Item 1.3.2', 'Item 1.3.3'],
  //       },
  //     ],
  //   },
  //   {
  //     title: 'Health & Beauty',
  //     categories: [
  //       {
  //         title: 'Subcategory 2.1',
  //         subcategories: ['Item 2.1.1', 'Item 2.1.2', 'Item 2.1.3'],
  //       },
  //       {
  //         title: 'Subcategory 2.2',
  //         subcategories: ['Item 2.2.1', 'Item 2.2.2', 'Item 2.2.3'],
  //       },
  //       {
  //         title: 'Subcategory 2.3',
  //         subcategories: ['Item 2.3.1', 'Item 2.3.2', 'Item 2.3.3'],
  //       },
  //     ],
  //   },
  //   {
  //     title: "Watches, Bags, Jewellery",
  //     categories: [
  //       {
  //         title: 'Subcategory 2.1',
  //         subcategories: ['Item 2.1.1', 'Item 2.1.2', 'Item 2.1.3'],
  //       },
  //       {
  //         title: 'Subcategory 2.2',
  //         subcategories: ['Item 2.2.1', 'Item 2.2.2', 'Item 2.2.3'],
  //       },
  //       {
  //         title: 'Subcategory 2.3',
  //         subcategories: ['Item 2.3.1', 'Item 2.3.2', 'Item 2.3.3'],
  //       },
  //     ],
  //   },
  //   {
  //     title: "Men's & Boys' Fashion",
  //     categories: [
  //       {
  //         title: 'Subcategory 2.1',
  //         subcategories: ['Item 2.1.1', 'Item 2.1.2', 'Item 2.1.3'],
  //       },
  //       {
  //         title: 'Subcategory 2.2',
  //         subcategories: ['Item 2.2.1', 'Item 2.2.2', 'Item 2.2.3'],
  //       },
  //       {
  //         title: 'Subcategory 2.3',
  //         subcategories: ['Item 2.3.1', 'Item 2.3.2', 'Item 2.3.3'],
  //       },
  //     ],
  //   },
  //   {
  //     title: "Mother & Baby",
  //     categories: [
  //       {
  //         title: 'Subcategory 2.1',
  //         subcategories: ['Item 2.1.1', 'Item 2.1.2', 'Item 2.1.3'],
  //       },
  //       {
  //         title: 'Subcategory 2.2',
  //         subcategories: ['Item 2.2.1', 'Item 2.2.2', 'Item 2.2.3'],
  //       },
  //       {
  //         title: 'Subcategory 2.3',
  //         subcategories: ['Item 2.3.1', 'Item 2.3.2', 'Item 2.3.3'],
  //       },
  //     ],
  //   },
  //   {
  //     title: "Electronics Devices",
  //     categories: [
  //       {
  //         title: 'Subcategory 2.1',
  //         subcategories: ['Item 2.1.1', 'Item 2.1.2', 'Item 2.1.3'],
  //       },
  //       {
  //         title: 'Subcategory 2.2',
  //         subcategories: ['Item 2.2.1', 'Item 2.2.2', 'Item 2.2.3'],
  //       },
  //       {
  //         title: 'Subcategory 2.3',
  //         subcategories: ['Item 2.3.1', 'Item 2.3.2', 'Item 2.3.3'],
  //       },
  //     ],
  //   },
  //   {
  //     title: "TV & Home Appliances",
  //     categories: [
  //       {
  //         title: 'Subcategory 2.1',
  //         subcategories: ['Item 2.1.1', 'Item 2.1.2', 'Item 2.1.3'],
  //       },
  //       {
  //         title: 'Subcategory 2.2',
  //         subcategories: ['Item 2.2.1', 'Item 2.2.2', 'Item 2.2.3'],
  //       },
  //       {
  //         title: 'Subcategory 2.3',
  //         subcategories: ['Item 2.3.1', 'Item 2.3.2', 'Item 2.3.3'],
  //       },
  //     ],
  //   },
  //   {
  //     title: "Electronic Accessories",
  //     categories: [
  //       {
  //         title: 'Subcategory 2.1',
  //         subcategories: ['Item 2.1.1', 'Item 2.1.2', 'Item 2.1.3'],
  //       },
  //       {
  //         title: 'Subcategory 2.2',
  //         subcategories: ['Item 2.2.1', 'Item 2.2.2', 'Item 2.2.3'],
  //       },
  //       {
  //         title: 'Subcategory 2.3',
  //         subcategories: ['Item 2.3.1', 'Item 2.3.2', 'Item 2.3.3'],
  //       },
  //     ],
  //   },
  //   {
  //     title: "Groceries",
  //     categories: [
  //       {
  //         title: 'Subcategory 2.1',
  //         subcategories: ['Item 2.1.1', 'Item 2.1.2', 'Item 2.1.3'],
  //       },
  //       {
  //         title: 'Subcategory 2.2',
  //         subcategories: ['Item 2.2.1', 'Item 2.2.2', 'Item 2.2.3'],
  //       },
  //       {
  //         title: 'Subcategory 2.3',
  //         subcategories: ['Item 2.3.1', 'Item 2.3.2', 'Item 2.3.3'],
  //       },
  //     ],
  //   },
  //   {
  //     title: "Home & Lifestyle",
  //     categories: [
  //       {
  //         title: 'Subcategory 2.1',
  //         subcategories: ['Item 2.1.1', 'Item 2.1.2', 'Item 2.1.3'],
  //       },
  //       {
  //         title: 'Subcategory 2.2',
  //         subcategories: ['Item 2.2.1', 'Item 2.2.2', 'Item 2.2.3'],
  //       },
  //       {
  //         title: 'Subcategory 2.3',
  //         subcategories: ['Item 2.3.1', 'Item 2.3.2', 'Item 2.3.3'],
  //       },
  //     ],
  //   },
  //   {
  //     title: "Sports & Outdoors",
  //     categories: [
  //       {
  //         title: 'Subcategory 2.1',
  //         subcategories: ['Item 2.1.1', 'Item 2.1.2', 'Item 2.1.3'],
  //       },
  //       {
  //         title: 'Subcategory 2.2',
  //         subcategories: ['Item 2.2.1', 'Item 2.2.2', 'Item 2.2.3'],
  //       },
  //       {
  //         title: 'Subcategory 2.3',
  //         subcategories: ['Item 2.3.1', 'Item 2.3.2', 'Item 2.3.3'],
  //       },
  //     ],
  //   },
  //   {
  //     title: "Automotive & Motorbike",
  //     categories: [
  //       {
  //         title: 'Subcategory 2.1',
  //         subcategories: ['Item 2.1.1', 'Item 2.1.2', 'Item 2.1.3'],
  //       },
  //       {
  //         title: 'Subcategory 2.2',
  //         subcategories: ['Item 2.2.1', 'Item 2.2.2', 'Item 2.2.3'],
  //       },
  //       {
  //         title: 'Subcategory 2.3',
  //         subcategories: ['Item 2.3.1', 'Item 2.3.2', 'Item 2.3.3'],
  //       },
  //     ],
  //   },
  //   // Add more categories as needed
  // ];

  return (
    <Card style={{ padding: '10px !important' }}>
      <Menu mode="vertical" style={{ width: '100%', padding: 0, margin: 0 }}>
        {itemType?.itemType?.map((category, index) => (
          <Menu.SubMenu key={index} title={category.title} style={{ height: 25, margin: 0, padding: 0, lineHeight: '20px' }}>
            {category.categories.map((subCategory, subIndex) => (
              <Menu.SubMenu key={`${index}-${subIndex}`} title={subCategory.title} style={{ margin: 0, padding: 0 }}>
                {subCategory.subcategories.map((item, itemIndex) => (
                  <Menu.Item key={`${index}-${subIndex}-${itemIndex}`} style={{ margin: 0, padding: 0 }}>
                    <Link href={`/products/${encodeURIComponent(item.toLowerCase())}`}>
                      {item}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ))}
          </Menu.SubMenu>
        ))}
      </Menu>
    </Card>


  );
};

export default TypeSidebar;
