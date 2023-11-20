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
import { useGetDepartmentsQuery, usePostDepartmentMutation } from '@/redux/features/department/departmentApi';
import { useGetZonalsQuery } from '@/redux/features/office/zonalApi';
import { getUserInfo } from '@/services/user-info';
import { useGetAvailableDepartmentQuery, usePostAvailableDepartmentMutation, usePostAvailableDesignationMutation } from '@/redux/features/inventory/inventoryApi';
import { useGetDesignationsQuery } from '@/redux/features/designation/designationApi';
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

const AddAvailableDesignation = () => {
    const [api, contextHolder] = notification.useNotification();
    const { data: session } = useSession();
    const { pbsCode: pbs_code } = getUserInfo()
    const { data: dataZonal, isLoading } = useGetZonalsQuery({ id: pbs_code }, { refetchOnMountOrArgChange: true });
    const zonals = dataZonal?.data;
    const { data: dataDepartments } = useGetDepartmentsQuery({ refetchOnMountOrArgChange: true });
    const departments = dataDepartments?.data;
    const { data: dataDesignations } = useGetDesignationsQuery({ refetchOnMountOrArgChange: true });
    const designations = dataDesignations?.data;
    console.log(designations)
    const [postAvailableDesignation, { isSuccess, isError }] = usePostAvailableDesignationMutation();
    // console.log(isSuccess, isError)

    const onFinish = async (values) => {
        console.log(values)
        const options = {
            data: values
        }
        const result = await postAvailableDesignation(options);
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
            <Title level={2} style={{ paddingLeft: '20%' }}>Add Available Designation</Title>
            <Form.Item label="Office" name="zonalCode" hasFeedback rules={[
                {
                    required: true,
                    message: 'Please provide a Office name',
                },
            ]}>
                <Select placeholder="Select a Office" allowClear>
                    {zonals?.map((brand) => (
                        <Option value={brand.zonalCode} key={brand.zonalCode}>
                            {brand.zonalName}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label="Department" name="departmentId" hasFeedback rules={[
                {
                    required: true,
                    message: 'Please provide a Department name',
                },
            ]}>
                <Select placeholder="Select a Department" allowClear>
                    {departments?.map((brand) => (
                        <Option value={brand.id} key={brand.id}>
                            {brand?.departmentName}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label="Designation" name="designationId" hasFeedback rules={[
                {
                    required: true,
                    message: 'Please provide a Designation name',
                },
            ]}>
                <Select placeholder="Select a Designation" allowClear>
                    {designations?.map((brand) => (
                        <Option value={brand.id} key={brand.id}>
                            {brand.designationName}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label="noOfPost"
                name="noOfPost"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please provide noOfPost',
                    },
                ]}
            >
                <Input placeholder="noOfPost" />
            </Form.Item>
            <Form.Item
                label="compterNos"
                name="compterNos"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please provide compterNos',
                    },
                ]}
            >
                <Input placeholder="compterNos" />
            </Form.Item>
            <Form.Item
                label="dotPrinterNos"
                name="dotPrinterNos"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please provide  dotPrinterNos',
                    },
                ]}
            >
                <Input placeholder="dotPrinterNos" />
            </Form.Item>

            <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 14, offset: 6 } }}>
                <Button type="primary" htmlType="submit" block>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddAvailableDesignation;
