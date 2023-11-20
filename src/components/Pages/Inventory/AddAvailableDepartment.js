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
import { usePostAvailableDepartmentMutation } from '@/redux/features/inventory/inventoryApi';
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

const AddAvailableDepartment = () => {
    const [api, contextHolder] = notification.useNotification();
    const { data: session } = useSession();
    const { pbsCode: pbs_code } = getUserInfo()
    const { data: dataZonal, isLoading } = useGetZonalsQuery({ id: pbs_code }, { refetchOnMountOrArgChange: true });
    const zonals = dataZonal?.data;
    const { data: dataDepartments } = useGetDepartmentsQuery({ refetchOnMountOrArgChange: true });
    const departments = dataDepartments?.data;
    const [postAvailableDepartment, { isSuccess, isError }] = usePostAvailableDepartmentMutation();
    // console.log(isSuccess, isError)

    const onFinish = async (values) => {
        console.log(values)
        const options = {
            data: values
        }
        const result = await postAvailableDepartment(options);
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
            <Title level={2} style={{ paddingLeft: '20%' }}>Add Available Department</Title>
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
                            {brand.departmentName}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label="Laser Printer Nos"
                name="laserPrinterNos"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please provide Laser Printer Nos',
                    },
                ]}
            >
                <Input placeholder="Laser Printer Nos" />
            </Form.Item>
            <Form.Item
                label="scannerNos"
                name="scannerNos"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please provide scannerNos',
                    },
                ]}
            >
                <Input placeholder="scannerNos" />
            </Form.Item>
            <Form.Item
                label="photoCopy Machinge Nos"
                name="photoCopyMachingeNos"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please provide photo Copy Machinge Nos',
                    },
                ]}
            >
                <Input placeholder="photo Copy Machinge Nos" />
            </Form.Item>

            <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 14, offset: 6 } }}>
                <Button type="primary" htmlType="submit" block>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddAvailableDepartment;
