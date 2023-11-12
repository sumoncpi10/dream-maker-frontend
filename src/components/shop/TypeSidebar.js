import React from 'react';
import { Menu, Card } from 'antd';
import Link from 'next/link';

const SideMenu = () => {
  // Sample data for menu categories
  const categories = [
    // {
    //   title: "Women's & Girls' Fashion",
    //   subcategories: [
    //     {
    //       title: 'Subcategory 1.1',
    //       items: ['Item 1.1.1', 'Item 1.1.2', 'Item 1.1.3'],
    //     },
    //     {
    //       title: 'Subcategory 1.2',
    //       items: ['Item 1.2.1', 'Item 1.2.2', 'Item 1.2.3'],
    //     },
    //     {
    //       title: 'Subcategory 1.3',
    //       items: ['Item 1.3.1', 'Item 1.3.2', 'Item 1.3.3'],
    //     },
    //   ],
    // },
    {
      title: 'Health & Beauty',
      subcategories: [
        {
          title: 'Subcategory 2.1',
          items: ['Item 2.1.1', 'Item 2.1.2', 'Item 2.1.3'],
        },
        {
          title: 'Subcategory 2.2',
          items: ['Item 2.2.1', 'Item 2.2.2', 'Item 2.2.3'],
        },
        {
          title: 'Subcategory 2.3',
          items: ['Item 2.3.1', 'Item 2.3.2', 'Item 2.3.3'],
        },
      ],
    },
    {
      title: "Watches, Bags, Jewellery",
      subcategories: [
        {
          title: 'Subcategory 2.1',
          items: ['Item 2.1.1', 'Item 2.1.2', 'Item 2.1.3'],
        },
        {
          title: 'Subcategory 2.2',
          items: ['Item 2.2.1', 'Item 2.2.2', 'Item 2.2.3'],
        },
        {
          title: 'Subcategory 2.3',
          items: ['Item 2.3.1', 'Item 2.3.2', 'Item 2.3.3'],
        },
      ],
    },
    {
      title: "Men's & Boys' Fashion",
      subcategories: [
        {
          title: 'Subcategory 2.1',
          items: ['Item 2.1.1', 'Item 2.1.2', 'Item 2.1.3'],
        },
        {
          title: 'Subcategory 2.2',
          items: ['Item 2.2.1', 'Item 2.2.2', 'Item 2.2.3'],
        },
        {
          title: 'Subcategory 2.3',
          items: ['Item 2.3.1', 'Item 2.3.2', 'Item 2.3.3'],
        },
      ],
    },
    {
      title: "Mother & Baby",
      subcategories: [
        {
          title: 'Subcategory 2.1',
          items: ['Item 2.1.1', 'Item 2.1.2', 'Item 2.1.3'],
        },
        {
          title: 'Subcategory 2.2',
          items: ['Item 2.2.1', 'Item 2.2.2', 'Item 2.2.3'],
        },
        {
          title: 'Subcategory 2.3',
          items: ['Item 2.3.1', 'Item 2.3.2', 'Item 2.3.3'],
        },
      ],
    },
    {
      title: "Electronics Devices",
      subcategories: [
        {
          title: 'Subcategory 2.1',
          items: ['Item 2.1.1', 'Item 2.1.2', 'Item 2.1.3'],
        },
        {
          title: 'Subcategory 2.2',
          items: ['Item 2.2.1', 'Item 2.2.2', 'Item 2.2.3'],
        },
        {
          title: 'Subcategory 2.3',
          items: ['Item 2.3.1', 'Item 2.3.2', 'Item 2.3.3'],
        },
      ],
    },
    {
      title: "TV & Home Appliances",
      subcategories: [
        {
          title: 'Subcategory 2.1',
          items: ['Item 2.1.1', 'Item 2.1.2', 'Item 2.1.3'],
        },
        {
          title: 'Subcategory 2.2',
          items: ['Item 2.2.1', 'Item 2.2.2', 'Item 2.2.3'],
        },
        {
          title: 'Subcategory 2.3',
          items: ['Item 2.3.1', 'Item 2.3.2', 'Item 2.3.3'],
        },
      ],
    },
    {
      title: "Electronic Accessories",
      subcategories: [
        {
          title: 'Subcategory 2.1',
          items: ['Item 2.1.1', 'Item 2.1.2', 'Item 2.1.3'],
        },
        {
          title: 'Subcategory 2.2',
          items: ['Item 2.2.1', 'Item 2.2.2', 'Item 2.2.3'],
        },
        {
          title: 'Subcategory 2.3',
          items: ['Item 2.3.1', 'Item 2.3.2', 'Item 2.3.3'],
        },
      ],
    },
    {
      title: "Groceries",
      subcategories: [
        {
          title: 'Subcategory 2.1',
          items: ['Item 2.1.1', 'Item 2.1.2', 'Item 2.1.3'],
        },
        {
          title: 'Subcategory 2.2',
          items: ['Item 2.2.1', 'Item 2.2.2', 'Item 2.2.3'],
        },
        {
          title: 'Subcategory 2.3',
          items: ['Item 2.3.1', 'Item 2.3.2', 'Item 2.3.3'],
        },
      ],
    },
    {
      title: "Home & Lifestyle",
      subcategories: [
        {
          title: 'Subcategory 2.1',
          items: ['Item 2.1.1', 'Item 2.1.2', 'Item 2.1.3'],
        },
        {
          title: 'Subcategory 2.2',
          items: ['Item 2.2.1', 'Item 2.2.2', 'Item 2.2.3'],
        },
        {
          title: 'Subcategory 2.3',
          items: ['Item 2.3.1', 'Item 2.3.2', 'Item 2.3.3'],
        },
      ],
    },
    {
      title: "Sports & Outdoors",
      subcategories: [
        {
          title: 'Subcategory 2.1',
          items: ['Item 2.1.1', 'Item 2.1.2', 'Item 2.1.3'],
        },
        {
          title: 'Subcategory 2.2',
          items: ['Item 2.2.1', 'Item 2.2.2', 'Item 2.2.3'],
        },
        {
          title: 'Subcategory 2.3',
          items: ['Item 2.3.1', 'Item 2.3.2', 'Item 2.3.3'],
        },
      ],
    },
    {
      title: "Automotive & Motorbike",
      subcategories: [
        {
          title: 'Subcategory 2.1',
          items: ['Item 2.1.1', 'Item 2.1.2', 'Item 2.1.3'],
        },
        {
          title: 'Subcategory 2.2',
          items: ['Item 2.2.1', 'Item 2.2.2', 'Item 2.2.3'],
        },
        {
          title: 'Subcategory 2.3',
          items: ['Item 2.3.1', 'Item 2.3.2', 'Item 2.3.3'],
        },
      ],
    },
    // Add more categories as needed
  ];

  return (
    <Card>
      <Menu mode="vertical" style={{ width: '100%', padding: 0, margin: 0 }}>
        {categories.map((category, index) => (
          <Menu.SubMenu key={index} title={category.title} style={{ margin: 0, padding: 0 }}>
            {category.subcategories.map((subCategory, subIndex) => (
              <Menu.SubMenu key={`${index}-${subIndex}`} title={subCategory.title} style={{ margin: 0, padding: 0 }}>
                {subCategory.items.map((item, itemIndex) => (
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

export default SideMenu;
