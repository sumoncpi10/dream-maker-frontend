import React, { useEffect, useState } from 'react';
import {
    Button,
    Form,
    Input,
    Select,
} from 'antd';
import { notification } from "antd";
import { useSession } from 'next-auth/react';
const { Option } = Select;
import { Typography } from 'antd';
import { useGetBrandsQuery } from '@/redux/features/brand/brandApi';
import { useGetModelsQuery } from '@/redux/features/model/modelApi';
import { useGetSuppliersQuery } from '@/redux/features/supplier/supplierApi';
import { useGetProductTypeQuery } from '@/redux/features/itemType/itemTypeApi';
import { useGetCategorysQuery } from '@/redux/features/categroys/categroysApi';
import { usePostProductMutation } from '@/redux/features/product/productApi';
import { getUserInfo } from '@/services/user-info';
const { Title } = Typography;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 6,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 14,
        },
    },
};
const config = {
    rules: [
        {
            type: 'object',
            required: true,
            message: 'Please select time!',
        },
    ],
};

const AddProduct = ({ subcategroys }) => {
    //console.log(itemType)
    // cole.log(models)
    const [api, contextHolder] = notification.useNotification();
    const { data: session } = useSession();
    // console.log(session)
    const { pbsCode: pbs_code } = getUserInfo();
    const { data: dataItemType, isLoading } = useGetProductTypeQuery();
    const productType = dataItemType?.data;
    const { data: dataCategroys } = useGetCategorysQuery();
    const categroys = dataCategroys?.data;
    // const { data: dataSubCategroys } = useGetSubCategorysQuery();
    // const subcategroys = dataSubCategroys?.data;
    const { data: dataBarnds } = useGetBrandsQuery();
    const brands = dataBarnds?.data;
    const { data: dataModels } = useGetModelsQuery();
    const models = dataModels?.data;
    const { data: dataSuppliers } = useGetSuppliersQuery({ id: pbs_code });
    const suppliers = dataSuppliers?.data;
    console.log(suppliers)
    const [filteredCategory, setFilteredCategory] = useState([]);
    const [filteredSubCategory, setFilteredSubCategory] = useState([]);
    const [filteredModel, setModel] = useState([]);

    const handleCategory = (key) => {
        const newData = categroys.filter((item) => item.productTypeId == key);
        setFilteredCategory(newData);
    };
    const handleSubCategory = (key) => {
        const newData = subcategroys.filter((item) => item.categoryId == key);
        setFilteredSubCategory(newData);
    };

    const handleModel = (key) => {
        const newData = models?.filter((item) => item.brandId === key); // Use strict equality (===)
        setModel(newData);
    };
    const [postProduct, { isSuccess, isError }] = usePostProductMutation()

    const onFinish = async (values) => {
        console.log('Received values:', values);
        // const pbsCode = session?.pbs_code?.pbs_code;
        const email = session?.user?.email;
        const { thmb1, thmb2, img1, img2, img3, img4, ...remainingValues } = values;
        const withvalues = {
            ...remainingValues,
            thumbImage: [thmb1, thmb2],
            images: [img1, img2, img3, img4]
        };
        console.log(withvalues)
        const options = {
            data: withvalues
        }
        const result = await postProduct(options);
        console.log(result?.statusCode);
        if (result?.data?.statusCode == 200) {
            const openNotificationWithIcon = (type) => {
                api[type]({
                    message: result?.data?.message,
                });
            };
            openNotificationWithIcon('success')
        } else {
            const openNotificationWithIcon = (type) => {
                api[type]({
                    message: result?.error?.data?.message,
                });
            };
            openNotificationWithIcon('error')
        }
    };

    return (
        <Form {...formItemLayout} style={{ maxWidth: 600, margin: '0 auto' }} onFinish={onFinish}>
            {contextHolder}
            <Title level={2} style={{ paddingLeft: '30%' }}>Add Product</Title>
            <Form.Item
                label="Name"
                name="name"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please provide a Name',
                    },
                ]}
            >
                <Input placeholder="Name" />
            </Form.Item>

            <Form.Item
                label="Price"
                name="price"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please provide Price',
                    },
                ]}
            >
                <Input placeholder="Price" />
            </Form.Item>
            <Form.Item
                label="quantity"
                name="quantity"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please provide quantity',
                    },
                ]}
            >
                <Input placeholder="quantity" />
            </Form.Item>
            <Form.Item
                label="Discount"
                name="discount"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please provide Discount',
                    },
                ]}
            >
                <Input placeholder="Discount" />
            </Form.Item>
            <Form.Item
                label="Ratings"
                name="rate"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please provide Ratings',
                    },
                ]}
            >
                <Input placeholder="Ratings" />
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please provide a Description',
                    },
                ]}
            >
                <Input placeholder="Description" />
            </Form.Item>


            <Form.Item label="Warranty" name="warranty" hasFeedback rules={[
                {
                    required: true,
                    message: 'Please provide a Warranty',
                },
            ]}>
                <Select placeholder="Select a Warranty" allowClear>
                    <Option value='none'>None</Option>
                    <Option value='1 years'>1 Years</Option>
                    <Option value='2 years'>2 Years</Option>
                    <Option value='3 years'>3 Years</Option>
                    <Option value='4 years'>4 Years</Option>
                    <Option value='5 years'>5 Years</Option>
                    <Option value='6 years'>6 Years</Option>
                    <Option value='7 years'>7 Years</Option>
                    <Option value='8 years'>8 Years</Option>
                    <Option value='9 years'>9 Years</Option>
                    <Option value='10 years'>10 Years</Option>
                </Select>
            </Form.Item>

            <Form.Item label="Item Type" name="productTypeId" hasFeedback rules={[
                {
                    required: true,
                    message: 'Please provide a Item Type name',
                },
            ]}>
                <Select placeholder="Select a Item Type" allowClear onChange={(value) => handleCategory(value)}>
                    {productType?.map((brand) => (
                        <Option value={brand.id} key={brand.id}>
                            {brand.title}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label="Category" name="categoryId" hasFeedback rules={[
                {
                    required: true,
                    message: 'Please provide a Category name',
                },
            ]}>
                <Select placeholder="Select a Category" allowClear onChange={(value) => handleSubCategory(value)}>
                    {filteredCategory.map((category) => (
                        <Option value={category.id} key={category.id}>
                            {category.title}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label="Sub Category" name="subCategoryId" hasFeedback rules={[
                {
                    required: true,
                    message: 'Please provide a Sub Category name',
                },
            ]}>
                <Select placeholder="Select a Sub Category" allowClear>
                    {filteredSubCategory.map((subcategroy) => (
                        <Option value={subcategroy.id} key={subcategroy.id}>
                            {subcategroy.title}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label="Brand" name="brandId" hasFeedback rules={[
                {
                    required: true,
                    message: 'Please provide a Brand name',
                },
            ]}>
                <Select placeholder="Select a Brand" allowClear onChange={(value) => handleModel(value)}>
                    {brands?.map((brand) => (
                        <Option value={brand.id} key={brand.id}>
                            {brand.title}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label="Supplier" name="supplierId" hasFeedback rules={[
                {
                    required: true,
                    message: 'Please provide a Supplier name',
                },
            ]}>
                <Select placeholder="Select a Supplier" allowClear >
                    {suppliers?.map((brand) => (
                        <Option value={brand.id} key={brand.id}>
                            {brand.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            {/* <Form.Item
                label="Model"
                name="modelId"
                hasFeedback
                rules={[
                    {
                        // required: true,
                        message: 'Please provide a Model name',
                    },
                ]}
            >
                <Select placeholder="Select a Model" allowClear >
                    {filteredModel?.map((model) => (
                        <Select.Option value={model.id} key={model.id}>
                            {model.modelName}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label="Supplier" name="supplierId" hasFeedback rules={[
                {
                    // required: true,
                    message: 'Please provide a Supplier name',
                },
            ]}>
                <Select placeholder="Select a Supplier" allowClear>
                    {suppliers?.map((brand) => (
                        <Option value={brand.id} key={brand.id}>
                            {brand.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item> */}
            <Form.Item
                label="Thumb Image URL1"
                name="thmb1"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please provide a Thumb Image URL1',
                    },
                ]}
            >
                <Input placeholder="Thumb Image URL1" />
            </Form.Item>
            <Form.Item
                label="Thumb Image URL2"
                name="thmb2"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please provide a Thumb Image URL2',
                    },
                ]}
            >
                <Input placeholder="Thumb Image URL2" />
            </Form.Item>
            <Form.Item
                label="Image URL1"
                name="img1"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please provide a Image1',
                    },
                ]}
            >
                <Input placeholder="Image1" />
            </Form.Item>
            <Form.Item
                label="Image URL2"
                name="img2"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please provide a Image2',
                    },
                ]}
            >
                <Input placeholder="Image2" />
            </Form.Item>
            <Form.Item
                label="Image URL3"
                name="img3"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please provide a Image3',
                    },
                ]}
            >
                <Input placeholder="Image3" />
            </Form.Item>
            <Form.Item
                label="Image URL4"
                name="img4"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please provide a Image4',
                    },
                ]}
            >
                <Input placeholder="Image4" />
            </Form.Item>
            <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 14, offset: 6 } }}>
                <Button type="primary" htmlType="submit" block>
                    Submit
                </Button>
            </Form.Item>
        </Form >
    );
};

export default AddProduct;
