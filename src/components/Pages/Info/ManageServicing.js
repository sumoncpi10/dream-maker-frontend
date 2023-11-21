
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Modal, Form, Input, Popconfirm, Table, DatePicker } from 'antd';
import { notification } from "antd";
import moment from 'moment';
const EditableContext = React.createContext(null);
import { Typography } from 'antd';
import {
    EditFilled,
} from '@ant-design/icons';
import { useSession } from 'next-auth/react';
import Print from '@/components/UI/Print';
import { useGetProductsQuery } from '@/redux/features/product/productApi';
import { useUpdateServicingMutation } from '@/redux/features/servicing/servicingApi';
const { Title } = Typography;
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
const ManageServicing = ({ servicing }) => {
    //console.log(servicing);
    const { data: session } = useSession();
    const { data: dataCapitalItem } = useGetProductsQuery();
    const capitalItem = dataCapitalItem?.data;
    const [dataSource, setDataSource] = useState(servicing);
    const [count, setCount] = useState(2);
    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.id !== key);
        setDataSource(newData);
    };
    const defaultColumns = [
        {
            title: 'Identification Number',
            dataIndex: ['capitalItems', 'identificationNo'],
            // width: '30%',
            // editable: true,
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Cost',
            dataIndex: 'servicingCost',
        },
        {
            title: 'Date',
            dataIndex: 'servicingDate',
        },
        {
            title: 'Supplier',
            dataIndex: ['supplier', 'name'],
        },
        {
            title: 'Service By',
            dataIndex: ['serviceByuser', 'mobileNo'],
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
        // {
        //     title: 'Action',
        //     dataIndex: 'operation',
        //     render: (_, record) =>
        //         dataSource.length >= 1 ? (
        //             <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record?.id)}>
        //                 <a>Delete</a>
        //             </Popconfirm>
        //         ) : null,
        // },
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
    const [open, setOpen] = useState(false);
    const [selectedServicing, setSelectedServicing] = useState(null);
    const [form] = Form.useForm();
    useEffect(() => {
        if (selectedServicing) {
            form.setFieldsValue({
                id: selectedServicing.id,
                servicingCost: selectedServicing.servicingCost,
                servicingDate: moment(selectedServicing.servicingDate, 'YYYY-MM-DD'),
                description: selectedServicing.description,
                serviceByMobileNo: selectedServicing.serviceByMobileNo,
                identificationNo: selectedServicing.identificationNo,
                suplierId: selectedServicing.suplierId,
            });
        }
    }, [selectedServicing, form]);
    const showModal = (record) => {
        setSelectedServicing(record);
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
        setSelectedServicing(null);
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
    const [api, contextHolder] = notification.useNotification();
    const [updateServicing, { isSuccess, isError }] = useUpdateServicingMutation();
    const onFinish = async (values) => {
        console.log(values)
        // const servicingDate = values.servicingDate ? values.servicingDate.format('YYYY-MM-DD') : null;
        const withvalues = { ...values };
        const options = {
            id: values?.id,
            data: withvalues
        }
        const result = await updateServicing(options);
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
    };
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
            <Title level={2}>Manage Servicing</Title>
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
                    <Title level={2}>Update Servicing</Title>
                    <Form.Item
                        label="Servicing ID"
                        name="id"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please provide a Servicing ID',
                            },
                        ]}
                    >
                        <Input placeholder="Servicing ID" disabled />
                    </Form.Item>
                    <Form.Item
                        label="Servicing Cost"
                        name="servicingCost"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please provide Servicing Cost',
                            },
                        ]}
                    >
                        <Input placeholder="Servicing Cost" />
                    </Form.Item>
                    <Form.Item
                        name="servicingDate"
                        label="Servicing Date"

                        rules={[
                            {
                                required: true,
                                message: 'Please provide a Servicing Date',
                            },
                        ]}
                    >
                        <DatePicker style={{ width: '100%' }} disabled />
                    </Form.Item>


                    <Form.Item
                        label="Description"
                        name="description"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please provide Description ',
                            },
                        ]}
                    >
                        <Input placeholder="Description " />
                    </Form.Item>
                    <Form.Item
                        label="Capital Item"
                        name="identificationNo"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please provide Capital Item',
                            },
                        ]}
                    >
                        <Input placeholder="Capital Item" />
                    </Form.Item>
                    <Form.Item
                        label="Supplier"
                        name="suplierId"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Supplier',
                            },
                        ]}
                    >
                        <Input placeholder="Capital Item" />
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
export default ManageServicing;