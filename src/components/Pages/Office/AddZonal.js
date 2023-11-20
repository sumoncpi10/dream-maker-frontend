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
import { usePostZonalMutation } from '@/redux/features/office/zonalApi';
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

const AddZonal = () => {
  const [api, contextHolder] = notification.useNotification();
  const { data: session } = useSession();
  const { pbsCode: pbs_code } = getUserInfo();
  const [postZonal, { isSuccess, isError }] = usePostZonalMutation();
  // console.log(isSuccess, isError)

  const onFinish = async (values) => {
    //console.log('Received values:', values);
    const withvalues = { ...values, pbsCode: pbs_code };
    const options = {
      data: withvalues
    }
    const result = await postZonal(options);
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
      <Title level={2} style={{ paddingLeft: '38%' }}>Add Zonal</Title>
      <Form.Item
        label="Zonal Code"
        name="zonalCode"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please provide a Zonal Code',
          },
        ]}
      >
        <Input placeholder="Zonal Code" />
      </Form.Item>
      <Form.Item
        label="Zonal Name"
        name="zonalName"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please provide a Zonal name',
          },
        ]}
      >
        <Input placeholder="Zonal Name" />
      </Form.Item>

      <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 14, offset: 6 } }}>
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddZonal;
