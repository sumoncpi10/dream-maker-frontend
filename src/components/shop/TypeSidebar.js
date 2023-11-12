import React from 'react';
import { Menu, Card } from 'antd';
import Link from 'next/link';

const SideMenu = () => {
  // Sample data for menu categories
  const categories = [
    {
      title: 'Category 1',
      subcategories: [
        {
          title: 'Subcategory 1.1',
          items: ['Item 1.1.1', 'Item 1.1.2', 'Item 1.1.3'],
        },
        {
          title: 'Subcategory 1.2',
          items: ['Item 1.2.1', 'Item 1.2.2', 'Item 1.2.3'],
        },
        {
          title: 'Subcategory 1.3',
          items: ['Item 1.3.1', 'Item 1.3.2', 'Item 1.3.3'],
        },
      ],
    },
    {
      title: 'Category 2',
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
      <Menu mode="vertical" style={{ width: '100%' }}>
        {categories.map((category, index) => (
          <Menu.SubMenu key={index} title={category.title}>
            {category.subcategories.map((subCategory, subIndex) => (
              <Menu.SubMenu key={`${index}-${subIndex}`} title={subCategory.title}>
                {subCategory.items.map((item, itemIndex) => (
                  <Menu.Item key={`${index}-${subIndex}-${itemIndex}`}>
                    <Link href={`/products/${encodeURIComponent(item.toLowerCase())}`}>
                      {item}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ))}
          </Menu.SubMenu>
        ))}
        {/* Add more menu items as needed */}
        <Menu.Item key="special-offers">
          <Link href="/special-offers">Special Offers</Link>
        </Menu.Item>
        <Menu.Item key="new-arrivals">
          <Link href="/new-arrivals">New Arrivals</Link>
        </Menu.Item>
        <Menu.Item key="new-arrivals">
          <Link href="/new-arrivals">New Arrivals</Link>
        </Menu.Item>
        <Menu.Item key="new-arrivals">
          <Link href="/new-arrivals">New Arrivals</Link>
        </Menu.Item>
        <Menu.Item key="new-arrivals">
          <Link href="/new-arrivals">New Arrivals</Link>
        </Menu.Item>
        <Menu.Item key="new-arrivals">
          <Link href="/new-arrivals">New Arrivals</Link>
        </Menu.Item>
      </Menu>
    </Card>
  );
};

export default SideMenu;
