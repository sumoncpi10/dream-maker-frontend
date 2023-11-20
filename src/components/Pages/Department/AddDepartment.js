import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
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
import { usePostDepartmentMutation } from '@/redux/features/department/departmentApi';
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

const AddDepartment = () => {
    const [api, contextHolder] = notification.useNotification();
    const { data: session } = useSession();
    const [postDepartment, { isSuccess, isError }] = usePostDepartmentMutation();
    // console.log(isSuccess, isError)

    const onFinish = async (values) => {
        const options = {
            data: values
        }
        const result = await postDepartment(options);
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
            <Title level={2} style={{ paddingLeft: '30%' }}>Add Department</Title>
            <Form.Item
                label="Department Name"
                name="departmentName"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please provide a Department name',
                    },
                ]}
            >
                <Input placeholder="Department Name" />
            </Form.Item>

            <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 14, offset: 6 } }}>
                <Button type="primary" htmlType="submit" block>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddDepartment;
