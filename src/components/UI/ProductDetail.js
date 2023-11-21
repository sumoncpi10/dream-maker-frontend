// AllProducts.js

import { Modal, Space, Spin, Table } from "antd";
import React, { useState } from "react";
import { Typography } from 'antd';
const { Title } = Typography;
import { Descriptions, Button, Divider } from 'antd';
import {
    PrinterFilled,
    FundViewOutlined
} from '@ant-design/icons';
import { useGetDetailedCapitalItemsQuery } from "@/redux/features/product/productApi";
const ProductDetail = ({ openProduct, setOpenProduct, product }) => {
    const { data, isLoading } = useGetDetailedCapitalItemsQuery({ id: product?.identificationNo }, { refetchOnMountOrArgChange: true });
    let SelectedCapitalItem = "";
    if (!product?.identificationNo) {
        SelectedCapitalItem = product;
        // isLoading = false;
    } else {
        SelectedCapitalItem = data?.data
    }
    console.log(SelectedCapitalItem)

    const handleCancel = () => {
        setOpenProduct(false);
    };
    const defaultColumns = [
        {
            title: 'Date',
            dataIndex: 'purchasedate',
        },
        {
            title: 'Sub Category',
            dataIndex: ['subCategory', 'subCategoryName'],
        },
        {
            title: 'Brand',
            dataIndex: ['brand', 'brandName'],
        },
        {
            title: 'Model',
            dataIndex: ['model', 'modelName'],
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Serial',
            dataIndex: 'serialNo',
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },

        {
            title: 'Warranty',
            dataIndex: 'warranty',
        },


    ];

    const onChange = (pagination, filters, sorter, extra) => {
        //console.log('params', pagination, filters, sorter, extra);
    };
    // const components = {
    //     body: {
    //         row: EditableRow,
    //         cell: EditableCell,
    //     },
    // };
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
    const defaultColumnsServicing = [
        {
            title: 'Date',
            dataIndex: 'servicingDate',
        },

        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Servicing Cose',
            dataIndex: 'servicingCost',
        },
        {
            title: 'Supplier',
            dataIndex: ['supplier', 'name'],
        },
    ];
    const columnsServicing = defaultColumnsServicing.map((col) => {
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
    const handlePrint = () => {
        window.print();
    };

    return (
        <Modal
            open={openProduct}
            // title="Update Category"
            onCancel={handleCancel}
            footer={null}
            width={1000}
        >
            {!SelectedCapitalItem ? <Space
                direction="vertical"
                style={{
                    display: 'flex',
                    justifyContent: 'center', // Center horizontally
                    alignItems: 'center',     // Center vertically
                    height: '100vh',         // Optional: Make it full screen
                }}
            >
                <Space>
                    <Spin tip="Loading" size="large">
                        {/* <div className="content" /> */}
                    </Spin>
                </Space>
            </Space> : <div>
                <div style={{ padding: 24 }}>
                    <Descriptions title="Product Information">
                        <Descriptions.Item label="Product ID">{SelectedCapitalItem?.identificationNo}</Descriptions.Item>
                        <Descriptions.Item label="Category">{SelectedCapitalItem?.category?.categoryName}</Descriptions.Item>
                        <Descriptions.Item label="Sub Category">{SelectedCapitalItem?.subCategory?.subCategoryName}</Descriptions.Item>
                        <Descriptions.Item label="Zonal">{SelectedCapitalItem?.zonals?.zonalName}</Descriptions.Item>
                        <Descriptions.Item label="Brand">{SelectedCapitalItem?.brand?.brandName}</Descriptions.Item>
                        <Descriptions.Item label="Model">{SelectedCapitalItem?.model?.modelName}</Descriptions.Item>
                        <Descriptions.Item label="User">{SelectedCapitalItem?.assignTo?.employee?.name}, {SelectedCapitalItem?.assignTo?.employee?.designation?.designationName}</Descriptions.Item>
                        <Descriptions.Item label="Purchase Date">{SelectedCapitalItem?.purchasedate}</Descriptions.Item>
                        <Descriptions.Item label="Price">{SelectedCapitalItem?.price}</Descriptions.Item>
                        <Descriptions.Item label="Warranty">{SelectedCapitalItem?.warranty}</Descriptions.Item>
                        <Descriptions.Item label="Supplier">{SelectedCapitalItem?.supplier?.name}</Descriptions.Item>
                        <Descriptions.Item label="Add By">{SelectedCapitalItem?.addBy?.employee?.name}, {SelectedCapitalItem?.addBy?.employee?.designation?.designationName}</Descriptions.Item>
                        <Descriptions.Item label="Description">{SelectedCapitalItem?.description}</Descriptions.Item>
                    </Descriptions>
                    {/* <Title level={2}>Replaced Parts</Title> */}
                    <Descriptions title="Replaced Parts"></Descriptions>
                    <Table
                        // components={components}
                        scroll={{
                            x: 800,
                        }}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={SelectedCapitalItem?.revenueItem}
                        columns={columns}
                        onChange={onChange}
                        pagination={false}
                    />
                    <br></br>
                    <Descriptions title="Service History"></Descriptions>
                    <Table
                        // components={components}
                        scroll={{
                            x: 800,
                        }}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={SelectedCapitalItem?.survicings}
                        columns={columnsServicing}
                        onChange={onChange}
                        pagination={false}
                    />
                    <Divider />
                    <div style={{ textAlign: 'center' }}>
                        <Button type="primary" onClick={handlePrint}><PrinterFilled />Print</Button>
                    </div>
                </div>
            </div>}



        </Modal>
    );
};

export default ProductDetail;
