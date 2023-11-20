
import React, { useEffect } from 'react';
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
import { useChangePasswordMutation, useUpdateEmployeeMutation } from '@/redux/features/auth/authApi';
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

const ChangePassword = ({ employee }) => {
    //console.log(employee)
    const [api, contextHolder] = notification.useNotification();
    // const [dataSource, setDataSource] = useState(employee);
    const [form] = Form.useForm();
    const [changePassword, { isSuccess, isError, isLoading }] = useChangePasswordMutation();
    useEffect(() => {
        if (employee) {
            // const specificDate = moment(selectedCapitalItem.purchasedate, 'YYYY-MM-DD');
            form.setFieldsValue({
                mobileNo: employee.mobileNo,

            });
        }
    }, [employee, form]);
    const onFinish = async (values) => {
        console.log(values)
        const options = {
            data: {
                oldPassword: values?.oldPassword,
                newPassword: values?.newPassword,
            }
        }
        const result = await changePassword(options);
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
        <Form {...formItemLayout} style={{ maxWidth: 600 }} onFinish={onFinish} form={form}>
            {contextHolder}
            <Title level={2}>Change Password</Title>
            <Form.Item
                label="User ID"
                name="mobileNo"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please provide a User ID',
                    },
                ]}
            >
                <Input placeholder="User ID" disabled />
            </Form.Item>
            <Form.Item
                label="Current Password"
                name="oldPassword"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please provide Current Password',
                    },
                ]}
            >
                <Input placeholder="Current Password" />
            </Form.Item>
            <Form.Item
                name="newPassword"
                label="New Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm New Password"
                dependencies={['newPassword']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 14, offset: 6 } }}>
                <Button type="primary" htmlType="submit" block>
                    Change Password
                </Button>
            </Form.Item>

        </Form>
    );
};

export default ChangePassword;
