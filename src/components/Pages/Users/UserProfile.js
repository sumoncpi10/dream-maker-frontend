
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
import { useUpdateEmployeeMutation } from '@/redux/features/auth/authApi';
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

const UserProfile = ({ employee }) => {
    console.log(employee)
    const [api, contextHolder] = notification.useNotification();
    // const [dataSource, setDataSource] = useState(employee);
    const [form] = Form.useForm();
    const [updateEmployee, { isSuccess, isError, isLoading }] = useUpdateEmployeeMutation();
    useEffect(() => {
        if (employee) {
            // const specificDate = moment(selectedCapitalItem.purchasedate, 'YYYY-MM-DD');
            form.setFieldsValue({
                email: employee.email,
                contactNo: employee.contactNo,
                name: employee.name,
                designationId: employee.designationId,
                trgId: employee.trgId,
                phone: employee.phone,
                address: employee.address,
                profileImg: employee.profileImg,
            });
        }
    }, [employee, form]);
    const onFinish = async (values) => {
        console.log(values)
        const options = {
            // id: values?.mobileNo,
            data: values
        }
        const result = await updateEmployee(options);
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
            <Title level={2}>Update Profile</Title>
            <Form.Item
                label="User ID"
                name="email"
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
                <Input placeholder="User Full Name" />
            </Form.Item>
            {/* <Form.Item
                label="Designation"
                name="designationId"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please provide a Designation',
                    },
                ]}
            >
                <Input placeholder="Designation" disabled />
            </Form.Item>
            <Form.Item
                label="Training ID"
                name="trgId"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please provide a Training ID',
                    },
                ]}
            >
                <Input placeholder="Training ID" />
            </Form.Item> */}
            <Form.Item
                label="Phone"
                name="contactNo"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please provide a phone number',
                    },
                ]}
            >
                <Input placeholder="Enter phone number" />
            </Form.Item>
            {/* <Form.Item
                label="Address"
                name="address"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please provide Address',
                    },
                ]}
            >
                <Input.TextArea placeholder="Enter Address" />
            </Form.Item> */}
            <Form.Item
                label="Photo URL"
                name="profileImg"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please provide a Photo URL',
                    },
                ]}
            >
                <Input placeholder="Photo URL" />
            </Form.Item>

            <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 14, offset: 6 } }}>
                <Button type="primary" htmlType="submit" block>
                    Submit
                </Button>
            </Form.Item>

        </Form>
    );
};

export default UserProfile;
