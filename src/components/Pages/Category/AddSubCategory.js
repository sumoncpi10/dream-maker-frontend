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
import { usePostSubCategoryMutation } from '@/redux/features/subCategory/subCategoryApi';
import { useGetCategorysQuery } from '@/redux/features/categroys/categroysApi';
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

const AddSubCategory = ({ categroys }) => {
    const [api, contextHolder] = notification.useNotification();
    const { data: session } = useSession();

    const [postSubCategory, { isSuccess, isError }] = usePostSubCategoryMutation();
    // console.log(isSuccess, isError)

    const onFinish = async (values) => {
        const options = {
            data: values
        }
        const result = await postSubCategory(options);
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

    return (<>
        <Form {...formItemLayout} style={{ maxWidth: 600, margin: '0 auto' }} onFinish={onFinish}>
            <Title level={2} style={{ paddingLeft: '30%' }}>Add Sub Category</Title>
            {contextHolder}
            <Form.Item label="Category" name="categoryId" hasFeedback rules={[
                {
                    required: true,
                    message: 'Please provide a Category name',
                },
            ]}>
                <Select placeholder="Select a Category" allowClear>
                    {categroys?.map((brand) => (
                        <Option value={brand.id} key={brand.id}>
                            {brand?.title}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label="Sub Category Name"
                name="title"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please provide a Sub Category name',
                    },
                ]}
            >
                <Input placeholder="Sub Category Name" />
            </Form.Item>
            {/* <Form.Item
                label="Item Code"
                name="itemCode"
                hasFeedback
                rules={[
                    {
                        // required: true,
                        message: 'Please provide a Item Code',
                    },
                ]}
            >
                <Input placeholder="Item Code" />
            </Form.Item> */}

            <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 14, offset: 6 } }}>
                <Button type="primary" htmlType="submit" block>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </>
    );
};

export default AddSubCategory;
