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
import { useGetSuppliersQuery } from '@/redux/features/supplier/supplierApi';
import { useGetUsersQuery } from '@/redux/features/user/userApi';
import { usePostServicingMutation } from '@/redux/features/servicing/servicingApi';
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
const AddServicing = ({ capitalItem }) => {
  //console.log(suppliers, revenueItem, capitalItem, users)
  const [api, contextHolder] = notification.useNotification();
  const { data: session } = useSession();
  const { pbsCode: pbs_code } = getUserInfo();
  const { data: dataSuppliers, isLoading } = useGetSuppliersQuery({ id: pbs_code }, { refetchOnMountOrArgChange: true });
  const suppliers = dataSuppliers?.data;
  const { data: dataUsers } = useGetUsersQuery({ id: pbs_code }, { refetchOnMountOrArgChange: true });
  const users = dataUsers?.data;
  const [postServicing, { isSuccess, isError }] = usePostServicingMutation();
  // console.log(isSuccess, isError)

  const onFinish = async (values) => {
    //console.log('Received values:', values);
    const options = {
      data: values
    }
    const result = await postServicing(options);
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
      <Title level={2} style={{ paddingLeft: '32%' }}>Add Servicing</Title>
      <Form.Item
        label="Service Cost"
        name="servicingCost"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please provide Service Cost',
          },
        ]}
      >
        <Input placeholder="Service Cost" />
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
      <Form.Item
        label="Service Date"
        name="servicingDate"
        hasFeedback

        {...config}
      >
        {/* <Input placeholder="Service Date" /> */}
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item label="Product" name="identificationNo" hasFeedback rules={[
        {
          required: true,
          message: 'Please provide a Product Name',
        },
      ]}>
        <Select placeholder="Select a Product" allowClear>
          {capitalItem?.map((brand) => (
            <Option value={brand.identificationNo} key={brand.identificationNo}>
              {brand.identificationNo}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Supplier" name="suplierId" hasFeedback rules={[
        {
          required: true,
          message: 'Please provide a Supplier Name',
        },
      ]}>
        <Select placeholder="Select a Supplier" allowClear>
          {suppliers?.map((brand) => (
            <Option value={brand.id} key={brand.id}>
              {brand.name}, {brand.address}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Service BY" name="serviceByMobileNo" hasFeedback rules={[
        {
          required: true,
          message: 'Please provide Service By Users',
        },
      ]}>
        <Select placeholder="Select Service By Users" allowClear>
          {users?.map((brand) => (
            <Option value={brand.mobileNo} key={brand.mobileNo}>
              {brand.employee.name}, {brand.employee.designation?.designationName}
            </Option>
          ))}
        </Select>
      </Form.Item>


      <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 14, offset: 6 } }}>
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddServicing;
