

import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Table } from 'antd';
const EditableContext = React.createContext(null);
import { Typography } from 'antd';
import {
    EditFilled,
} from '@ant-design/icons';
import Print from '@/components/UI/Print';
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
const ManageAvailableDesignaton = ({ departments }) => {
    console.log(departments);

    const [dataSource, setDataSource] = useState(departments);
    const [count, setCount] = useState(2);
    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.id !== key);
        setDataSource(newData);
    };
    const defaultColumns = [
        {
            title: 'Zonal Name',
            dataIndex: ['zonal', 'zonalName'],

        },
        {
            title: 'Department Name',
            dataIndex: ['department', 'departmentName'],
        },
        {
            title: 'Designation',
            dataIndex: ['designation', 'designationName'],
        },
        {
            title: 'Number Of Post(Nos)',
            dataIndex: 'noOfPost',
        },
        {
            title: 'Compter(Nos)',
            dataIndex: 'compterNos',
        },

        {
            title: 'Dot Printer(Nos)',
            dataIndex: 'dotPrinterNos',
        },
        // {
        //   title: 'Created At',
        //   dataIndex: 'createdAt',
        // },
        // {
        //   title: 'Updated At',
        //   dataIndex: 'updatedAt',
        // },

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
    const showModal = (record) => {
        // setSelectedZonal(record);
        // setOpen(true);
    };
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
            <Title level={2}>Manage Available Designation</Title>
            <Print></Print>
            {/* <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button> */}
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
            />
        </div>
    );
};
export default ManageAvailableDesignaton;