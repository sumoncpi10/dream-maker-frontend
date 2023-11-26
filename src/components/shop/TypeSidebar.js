import React from 'react';
import { Menu, Card } from 'antd';
import Link from 'next/link';

const TypeSidebar = ({ itemType }) => {
  // console.log(itemType)


  return (
    <Card style={{ padding: '10px !important' }}>
      <Menu mode="vertical" style={{ width: '100%', padding: 0, margin: 0 }}>
        {itemType?.itemType?.map((category, index) => (
          <Menu.SubMenu key={index} title={category.title} style={{ height: 25, margin: 0, padding: 0, lineHeight: '20px' }}>
            {category.categories.map((subCategory, subIndex) => (
              <Menu.SubMenu key={`${index}-${subIndex}`} title={subCategory.title} style={{ height: 40, margin: 0, padding: 0, lineHeight: '20px' }}>
                {subCategory.subcategories.map((item, itemIndex) => (
                  <Menu.Item key={`${index}-${subIndex}-${itemIndex}`} style={{ height: 40, margin: 0, padding: 0, lineHeight: '20px' }}>
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
