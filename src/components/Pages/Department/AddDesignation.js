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
import { useGetDepartmentsQuery } from '@/redux/features/department/departmentApi';
import { usePostDesignationMutation } from '@/redux/features/designation/designationApi';
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

const AddDesignation = () => {
    const [api, contextHolder] = notification.useNotification();
    const { data: session } = useSession();
    const { data, isLoading } = useGetDepartmentsQuery({ refetchOnMountOrArgChange: true });
    const departments = data?.data;
    console.log(departments);
    const [postDesignation, { isSuccess, isError }] = usePostDesignationMutation();
    // console.log(isSuccess, isError)

    const onFinish = async (values) => {
        const options = {
            data: values
        }
        const result = await postDesignation(options);
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
            <Title level={2} style={{ paddingLeft: '30%' }}>Add Designation</Title>
            <Form.Item label="Department" name="departmentId" hasFeedback rules={[
                {
                    required: true,
                    message: 'Please provide a Department name',
                },
            ]}>
                <Select placeholder="Select a Department" allowClear>
                    {departments?.map((brand) => (
                        <Option value={brand.id} key={brand.id}>
                            {brand.departmentName}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label="Designation Name"
                name="designationName"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please provide a Designation name',
                    },
                ]}
            >
                <Input placeholder="Designation Name" />
            </Form.Item>

            <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 14, offset: 6 } }}>
                <Button type="primary" htmlType="submit" block>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddDesignation;
