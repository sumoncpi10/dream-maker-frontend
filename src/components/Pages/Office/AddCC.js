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
import { useGetZonalsQuery } from '@/redux/features/office/zonalApi';
import { usePostCcsMutation } from '@/redux/features/office/ccApi';
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

const AddCC = ({ zonals }) => {
  const [api, contextHolder] = notification.useNotification();
  const { data: session } = useSession();
  const { pbsCode } = getUserInfo();
  const [postCcs, { isSuccess, isError }] = usePostCcsMutation();
  // console.log(isSuccess, isError)


  const onFinish = async (values) => {
    const withvalues = { ...values, pbsCode };
    const options = {
      data: withvalues
    }
    const result = await postCcs(options);
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
      <Title level={2} style={{ paddingLeft: '28%' }}>Add Complain Center</Title>
      <Form.Item label="Zonal" name="zonalCode" hasFeedback rules={[
        {
          required: true,
          message: 'Please provide a Zonal name',
        },
      ]}>
        <Select placeholder="Select a Zonal" allowClear>
          {zonals?.map((zonal) => (
            <Option value={zonal.zonalCode} key={zonal.zonalCode}>
              {zonal.zonalName}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="CC Code"
        name="complainCode"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please provide a Complain Code',
          },
        ]}
      >
        <Input placeholder="Complain Code" />
      </Form.Item>
      <Form.Item
        label="Complain Name"
        name="complainName"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please provide a Complain name',
          },
        ]}
      >
        <Input placeholder="Complain Name" />
      </Form.Item>

      <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 14, offset: 6 } }}>
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddCC;
