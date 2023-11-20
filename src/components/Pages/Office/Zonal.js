import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Modal, Popconfirm, Table } from 'antd';
const EditableContext = React.createContext(null);
import { Typography } from 'antd';
import { notification } from "antd";
const { Title } = Typography;
import {
  EditFilled,
} from '@ant-design/icons';
import { useUpdateZonalMutation } from '@/redux/features/office/zonalApi';
import Print from '@/components/UI/Print';
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
const Zonal = ({ zonals }) => {
  //console.log(zonals);
  // //console.log(zonals[0].pbs.pbsName);
  const [api, contextHolder] = notification.useNotification();
  const [dataSource, setDataSource] = useState(zonals);
  const [count, setCount] = useState(2);
  const [selectedZonal, setSelectedZonal] = useState(null);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [updateZonal, { isSuccess, isError }] = useUpdateZonalMutation();
  // console.log(isSuccess, isError)
  if (isSuccess) {
    const openNotificationWithIcon = (type) => {
      api[type]({
        message: "Zonal Update Successfully.",
      });
    };
    openNotificationWithIcon('success')
  }
  if (isError) {
    const openNotificationWithIcon = (type) => {
      api[type]({
        message: "Oops! Something Went Wrong!",
      });
    };
    openNotificationWithIcon('success')
  }
  useEffect(() => {
    if (selectedZonal) {
      // const specificDate = moment(selectedCapitalItem.purchasedate, 'YYYY-MM-DD');
      form.setFieldsValue({
        pbsCode: selectedZonal.pbsCode,
        zonalCode: selectedZonal.zonalCode,
        zonalName: selectedZonal.zonalName,

      });
    }
  }, [selectedZonal, form]);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.id !== key);
    setDataSource(newData);
  };
  const showModal = (record) => {
    setSelectedZonal(record);
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
    setSelectedZonal(null);
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
  const onFinish = (values) => {
    //console.log('Received values:', values);
    const options = {
      id: values?.zonalCode,
      data: { zonalCode: values?.zonalCode, zonalName: values?.zonalName }
    }
    updateZonal(options);
  };

  const defaultColumns = [
    {
      title: 'Zonal Code',
      dataIndex: 'zonalCode',
    },
    {
      title: 'Zonal Name',
      dataIndex: 'zonalName',
      // width: '30%',
      editable: true,
    },
    {
      title: 'PBS Name',
      dataIndex: ['pbs', 'pbsName'],
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to Update?" onConfirm={() => showModal(record)}>
            <a><EditFilled /></a>
          </Popconfirm>
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
      <Title level={2}>Manage Zonal</Title>
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
          <Title level={2}>Update Zonal</Title>

          <Form.Item
            label="PBS Code"
            name="pbsCode"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please provide a ID',
              },
            ]}
          >
            <Input placeholder="PBS Code" disabled />
          </Form.Item>
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
                message: 'Please provide a Zonal Name',
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
        </Form >
      </Modal>
    </div>
  );
};
export default Zonal;