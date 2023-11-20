import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Mentions,
    Select,
    TimePicker,
    TreeSelect,
} from 'antd';
import { notification } from "antd";
import { useSession } from 'next-auth/react';
const { Option } = Select;
import { Typography } from 'antd';
import { useGetGetItemTypeQuery } from '@/redux/features/itemType/itemTypeApi';
import { usePostSuppliersMutation } from '@/redux/features/supplier/supplierApi';
import { usePostCategoryMutation } from '@/redux/features/categroys/categroysApi';
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

const AddCategory = ({ itemType }) => {
    const [api, contextHolder] = notification.useNotification();

    const [postCategory, { isSuccess, isError }] = usePostCategoryMutation();
    // console.log(isSuccess, isError)

    const onFinish = async (values) => {
        const options = {
            data: values
        }
        const result = await postCategory(options);
        console.log(result)
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
            <Title level={2} style={{ paddingLeft: '33%' }}>Add Category</Title>
            <Form.Item label="Product Type" name="productTypeId" hasFeedback rules={[
                {
                    required: true,
                    message: 'Please provide a Product Type name',
                },
            ]}>
                <Select placeholder="Select a Product Type" allowClear>
                    {itemType?.map((brand) => (
                        <Option value={brand.id} key={brand.id}>
                            {brand.title}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label="Category Name"
                name="title"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please provide a Category name',
                    },
                ]}
            >
                <Input placeholder="Category Name" />
            </Form.Item>

            <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 14, offset: 6 } }}>
                <Button type="primary" htmlType="submit" block>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddCategory;
