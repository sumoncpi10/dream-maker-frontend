
import React, { useState } from 'react';
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
import { usePostUsersMutation } from '@/redux/features/user/userApi';
import { useGetDesignationsQuery } from '@/redux/features/designation/designationApi';
import { getUserInfo } from '@/services/user-info';
import { useGetDepartmentsQuery } from '@/redux/features/department/departmentApi';
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

const AddUser = () => {
    const [api, contextHolder] = notification.useNotification();
    const { data: session } = useSession();
    const { pbsCode: pbs_code } = getUserInfo();
    const { data: dataDepartments, isLoading } = useGetDepartmentsQuery({ refetchOnMountOrArgChange: true });
    const departments = dataDepartments?.data;
    const { data } = useGetDesignationsQuery({ id: pbs_code }, { refetchOnMountOrArgChange: true });
    const designations = data?.data;
    console.log(designations);
    const [filteredDesignation, setFilteredDesignation] = useState([]);
    const [postUsers, { isSuccess, isError }] = usePostUsersMutation();
    // console.log(isSuccess, isError)
    const handleDesignations = (key) => {
        const newData = designations?.filter((item) => item?.departmentId == key);
        setFilteredDesignation(newData);
    };

    const onFinish = async (values) => {
        //console.log('Received values:', values);
        const withvalues = { ...values, pbsCode: pbs_code };
        const options = {
            data: withvalues
        }
        const result = await postUsers(options);
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
    const roles = [
        { id: 7, role: 'employee', value: 'user' },
        { id: 6, role: 'Store Incharge', value: 'incharge' },
        { id: 5, role: 'Store Head', value: 'storeHead' },
        { id: 4, role: 'Office Head', value: 'officeHead' },
        { id: 3, role: 'Zonal Admin', value: 'zonaladmin' },
        { id: 2, role: 'Admin', value: 'admin' },
        { id: 1, role: 'Super Admin', value: 'super_admin' },
    ]
    return (
        <Form {...formItemLayout} style={{ maxWidth: 600, margin: '0 auto' }} onFinish={onFinish}>
            {contextHolder}
            <Title level={2} style={{ paddingLeft: '39%' }}>Add User</Title>
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
            <Form.Item label="Role" name="role" hasFeedback rules={[
                {
                    required: true,
                    message: 'Please provide a Role',
                },
            ]}>
                <Select placeholder="Select a Role" allowClear>
                    {roles.map((brand) => (
                        <Option value={brand.value} key={brand.id}>
                            {brand.role}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label="Department" name="departmentId" hasFeedback rules={[
                {
                    required: true,
                    message: 'Please provide a Department',
                },
            ]}>
                <Select placeholder="Select a Department" allowClear onChange={(value) => handleDesignations(value)}>
                    {departments?.map((brand) => (
                        <Option value={brand.id} key={brand.id}>
                            {brand.departmentName}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label="Designation" name="designationId" hasFeedback rules={[
                {
                    required: true,
                    message: 'Please provide a Designation',
                },
            ]}>
                <Select placeholder="Select a Designation" allowClear>
                    {filteredDesignation?.map((brand) => (
                        <Option value={brand.id} key={brand.id}>
                            {brand.designationName}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label="Phone"
                name="mobileNo"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please provide a Phone Number',
                    },
                ]}
            >
                <Input placeholder="Phone Number" />
            </Form.Item>
            <Form.Item label="Password" name="password" hasFeedback >
                <Input.Password placeholder="with input password" />
            </Form.Item>
            <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 14, offset: 6 } }}>
                <Button type="primary" htmlType="submit" block>
                    Submit
                </Button>
            </Form.Item>

        </Form>
    );
};

export default AddUser;
