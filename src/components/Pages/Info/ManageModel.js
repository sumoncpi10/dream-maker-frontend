import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Space, Table, Modal, Select } from 'antd';
import { notification } from "antd";
const EditableContext = React.createContext(null);
import { Typography } from 'antd';
import {
  DeleteFilled,
  EditFilled,
  EyeFilled
} from '@ant-design/icons';
import Print from '@/components/UI/Print';
import { useGetBrandsQuery } from '@/redux/features/brand/brandApi';
import { useUpdateModelMutation } from '@/redux/features/model/modelApi';
const { Title } = Typography;
const { Option } = Select;
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      //console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
const ManageModel = ({ models }) => {
  //console.log(models);
  const { data: dataBrands } = useGetBrandsQuery();
  const brands = dataBrands?.data;
  const [updateModel] = useUpdateModelMutation()
  const [api, contextHolder] = notification.useNotification();
  const [dataSource, setDataSource] = useState(models);
  const [open, setOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [form] = Form.useForm();
  useEffect(() => {
    if (selectedModel) {
      form.setFieldsValue({
        id: selectedModel.id,
        modelName: selectedModel.modelName,
        brandId: selectedModel.brandId,
      });
    }
  }, [selectedModel, form]);
  const showModal = (record) => {
    setSelectedModel(record);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setSelectedModel(null);
  };
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
  const onFinish = async (values) => {
    console.log(values)

    const options = {
      id: values?.id,
      data: values
    }
    const result = await updateModel(options);
    console.log(result?.statusCode);
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
  }
  const [count, setCount] = useState(2);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.id !== key);
    setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: 'Model Name',
      dataIndex: 'modelName',
      // width: '30%',
      // editable: true,
    },
    {
      title: 'Brand Name',
      dataIndex: ['brand', 'brandName'],
      // width: '30%',
      // editable: true,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Space>
            <Popconfirm title="Sure to Update?" onConfirm={() => showModal(record)}>
              <a><EditFilled /></a>
            </Popconfirm>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record?.id)}>
              <a><DeleteFilled /></a>
            </Popconfirm>
          </Space>

        ) : null,
    },
  ];
  const handleAdd = () => {
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: '32',
      address: `London, Park Lane no. ${count}`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <div>
      {/* <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button> */}
      <Title level={2}>Manage Model</Title>
      <Print></Print>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
      <Modal
        open={open}
        // title="Update Category"
        onCancel={handleCancel}
        footer={null}
      >
        <Form {...formItemLayout} style={{ maxWidth: 600 }} onFinish={onFinish} form={form}>
          {contextHolder}
          <Title level={2}>Update Model</Title>
          <Form.Item
            label="Supplier ID"
            name="id"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please provide a supplier ID',
              },
            ]}
          >
            <Input placeholder="Supplier ID" disabled />
          </Form.Item>
          <Form.Item label="Brand" name="brandId" hasFeedback rules={[
            {
              required: true,
              message: 'Please provide a Item Type name',
            },
          ]}>
            <Select placeholder="Select a Item Type" allowClear >
              {brands?.map((brand) => (
                <Option value={brand.id} key={brand.id}>
                  {brand.brandName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Model Name"
            name="modelName"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please provide Model Name',
              },
            ]}
          >
            <Input placeholder="Model Name" />
          </Form.Item>


          <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 14, offset: 6 } }}>
            <Button type="primary" htmlType="submit" block>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default ManageModel;