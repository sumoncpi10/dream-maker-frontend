// AllProducts.js

import { Modal, Space, Spin, Table } from "antd";
import React, { useState } from "react";
import { Typography } from 'antd';
const { Title } = Typography;
import { Descriptions, Button, Divider } from 'antd';
import {
    PrinterFilled,
} from '@ant-design/icons';
import { useGetDetailedCapitalItemsQuery } from "@/redux/features/capitalItem/capitalApi";
const Print = ({ openProduct, setOpenProduct, product }) => {
    const handlePrint = () => {
        window.print();
    };
    return (
        <div style={{ textAlign: 'right' }}>
            <Button type="primary" onClick={handlePrint}><PrinterFilled /></Button>
        </div>
    );
};

export default Print;
