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
import { usePostSuppliersMutation } from '@/redux/features/supplier/supplierApi';
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

const AddSupplier = () => {
  const [api, contextHolder] = notification.useNotification();
  const { data: session } = useSession();
  const { pbsCode } = getUserInfo();
  const [postSuppliers, { isSuccess, isError, isLoading }] = usePostSuppliersMutation();
  // console.log(isSuccess, isError)

  const onFinish = async (values) => {
    //console.log('Received values:', values);
    const withvalues = { ...values, pbsCode };
    //console.log(withvalues);
    const options = {
      id: pbsCode,
      data: withvalues
    }
    const result = await postSuppliers(options);
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
      <Title level={2} style={{ paddingLeft: '33%' }}>Add Supplier</Title>
      <Form.Item
        label="Supplier Name"
        name="name"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please provide a supplier name',
          },
        ]}
      >
        <Input placeholder="Supplier Name" />
      </Form.Item>
      <Form.Item
        label="Phone"
        name="contactNo"
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


      <Form.Item
        label="Address"
        name="address"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Address is required',
          },
        ]}
      >
        <Input.TextArea allowClear showCount />
      </Form.Item>

      <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 14, offset: 6 } }}>
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddSupplier;
