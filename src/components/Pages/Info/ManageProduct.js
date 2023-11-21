
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Modal, Form, Input, Popconfirm, Table, DatePicker, Select, Space } from 'antd';
const { Option } = Select;
import { notification } from "antd";
// import moment from 'moment';
import {
  DeleteFilled,
  EditFilled,
  EyeFilled
} from '@ant-design/icons';
const EditableContext = React.createContext(null);
import { Typography } from 'antd';
import { useSession } from 'next-auth/react';
import ProductDetail from '@/components/UI/ProductDetail';
import Print from '@/components/UI/Print';
import { useUpdateCapitalItemsMutation } from '@/redux/features/product/productApi';
import { getUserInfo } from '@/services/user-info';
import { useGetProductTypeQuery } from '@/redux/features/itemType/itemTypeApi';
import { useGetCategorysQuery } from '@/redux/features/categroys/categroysApi';
import { useGetSubCategorysQuery } from '@/redux/features/subCategory/subCategoryApi';
import { useGetBrandsQuery } from '@/redux/features/brand/brandApi';
import { useGetModelsQuery } from '@/redux/features/model/modelApi';
import { useGetSuppliersQuery } from '@/redux/features/supplier/supplierApi';
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
const config = {
  rules: [
    {
      type: 'object',
      required: true,
      message: 'Please select time!',
    },
  ],
};
const ManageProduct = ({ capitalItem }) => {
  //console.log(capitalItem);
  const { data: session } = useSession();
  const { pbsCode: pbs_code, mobileNo } = getUserInfo();
  const { data: dataitemType } = useGetProductTypeQuery();
  const itemType = dataitemType?.data;
  const { data: dataCategroys, isLoading } = useGetCategorysQuery();
  const categroys = dataCategroys?.data;
  const { data: dataSubCategroys } = useGetSubCategorysQuery();
  const subcategroys = dataSubCategroys?.data;
  const { data: dataBrands } = useGetBrandsQuery();
  const brands = dataBrands?.data;
  const { data: dataModels } = useGetModelsQuery();
  const models = dataModels?.data;
  const { data: dataSuppliers } = useGetSuppliersQuery({ id: pbs_code });
  const suppliers = dataSuppliers?.data;
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [filteredSubCategory, setFilteredSubCategory] = useState([]);
  const [filteredModel, setModel] = useState([]);
  console.log(categroys)
  const handleCategory = (key) => {
    const newData = categroys.filter((item) => item.itemTypeId == key);
    setFilteredCategory(newData);
  };
  const handleSubCategory = (key) => {
    const newData = subcategroys.filter((item) => item.categoryId == key);
    setFilteredSubCategory(newData);
  };

  const handleModel = (key) => {
    const newData = models.filter((item) => item.brandId === key); // Use strict equality (===)
    setModel(newData);
  };
  const [distinctSubCategories, setDistinctSubCategories] = useState([]);
  const [distinctCategories, setDistinctCategories] = useState([]);
  const [distinctZonals, setdistinctZonals] = useState([]);

  useEffect(() => {
    const subCategoryNames = Array.from(new Set(capitalItem?.map(item => item?.subCategorys?.title)));
    setDistinctSubCategories(subCategoryNames);
    const CategoryNames = Array.from(new Set(capitalItem?.map(item => item?.categorys?.title)));
    setDistinctCategories(CategoryNames);
    const zonalNames = Array.from(new Set(capitalItem?.map(item => item?.zonals?.zonalName)));
    setdistinctZonals(zonalNames);
  }, [capitalItem]);
  //console.log(distinctCategories);
  const [dataSource, setDataSource] = useState(capitalItem);
  const [count, setCount] = useState(2);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.id !== key);
    setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'price',
      dataIndex: 'price',
    },
    {
      title: 'Ratings',
      dataIndex: 'rate',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
    },
    // {
    //   title: 'Warranty',
    //   dataIndex: 'warranty',
    // },

    // {
    //   title: 'Brand',
    //   dataIndex: ['brand', 'brandName'],
    // },

    // {
    //   title: 'Model',
    //   dataIndex: ['model', 'modelName'],
    //   ellipsis: true,
    // },
    // {
    //   title: 'Description',
    //   dataIndex: 'description',
    //   // width: '12%',
    // },

    {
      title: 'Category',
      dataIndex: ['categorys', 'title'],
      ellipsis: true,
      filters: distinctCategories.map(sc => ({
        text: sc,
        value: sc,
      })),
      onFilter: (value, record) => record?.categorys?.title.indexOf(value) === 0,
    },
    {
      title: 'Sub Category',
      dataIndex: ['title', 'title'],
      filters: distinctSubCategories.map(sc => ({
        text: sc,
        value: sc,
      })),
      onFilter: (value, record) => record?.subCategorys?.title?.indexOf(value) === 0,
    },
    {
      title: 'Acton',
      dataIndex: 'operation',
      fixed: 'right',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Space>
            <div onClick={() => showModalProduct(record)}>
              <a><EyeFilled /></a>
            </div>
            <Popconfirm title="Sure to Update?" onConfirm={() => showModal(record)}>
              {<a><EditFilled /></a>}
            </Popconfirm>
            <Popconfirm title="Sure to delete?" className='margin-3' onConfirm={() => handleDelete(record?.id)}>
              {record?.certifiedByMobileNo === null && <a>< DeleteFilled /></a>}
            </Popconfirm>
          </Space>
        ) : null,
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    //console.log('params', pagination, filters, sorter, extra);
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
  const [open, setOpen] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [product, setProduct] = useState(false);
  const [selectedCapitalItem, setSelectedCapitalItem] = useState(null);
  const [form] = Form.useForm();
  useEffect(() => {
    if (selectedCapitalItem) {
      // const specificDate = moment(selectedCapitalItem.purchasedate, 'YYYY-MM-DD');
      form.setFieldsValue({
        id: selectedCapitalItem.id,
        serialNo: selectedCapitalItem.serialNo,
        description: selectedCapitalItem.description,
        purchasedate: moment(selectedCapitalItem.purchasedate, 'YYYY-MM-DD'),
        price: selectedCapitalItem.price,
        identificationNo: selectedCapitalItem.identificationNo,
        warranty: selectedCapitalItem.warranty,
        status: selectedCapitalItem.status,
        itemTypeId: selectedCapitalItem.itemTypeId,
        categoryId: selectedCapitalItem.categoryId,
        subCategoryid: selectedCapitalItem.subCategoryid,
        brandId: selectedCapitalItem.brandId,
        modelId: selectedCapitalItem.modelId,
        supplierId: selectedCapitalItem.supplierId,
      });
    }
  }, [selectedCapitalItem, form]);
  const showModal = (record) => {
    setSelectedCapitalItem(record);
    setOpen(true);
  };
  const showModalProduct = (record) => {
    setProduct(record);
    setOpenProduct(true)
    // setSelectedCapitalItem(record);
    // setOpen(true);

  };

  const handleCancel = () => {
    setOpen(false);
    setSelectedCapitalItem(null);
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

  const [updateCapitalItems, { isSuccess, isError }] = useUpdateCapitalItemsMutation();

  const onFinish = async (values) => {
    console.log(values)
    const purchasedate = values.purchasedate ? values.purchasedate.format('YYYY-MM-DD') : null;
    const withvalues = { ...values, purchasedate };
    const options = {
      id: values?.id,
      data: withvalues
    }
    const result = await updateCapitalItems(options);
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
  const showTotal = (total) => `Total ${dataSource.length} items`;
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
      <Title level={2}>Manage Product</Title>
      <Print></Print>

      <Table
        components={components}
        scroll={{
          x: 1000,
        }}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
        onChange={onChange}
        pagination={{
          // current: currentPage,
          total: dataSource.length,
          // onChange: handlePageChange,
          showTotal: (total) => showTotal(total),
        }}
      />
      <ProductDetail setOpenProduct={setOpenProduct} openProduct={openProduct} product={product}></ProductDetail>
      <Modal
        open={open}
        // title="Update Category"
        onCancel={handleCancel}
        footer={null}
      >

        <Form {...formItemLayout} style={{ maxWidth: 600 }} onFinish={onFinish} form={form}>
          {contextHolder}
          <Title level={2}>Add Capital Item</Title>

          <Form.Item
            label="Product ID"
            name="id"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please provide a ID',
              },
            ]}
          >
            <Input placeholder="Product ID" disabled />
          </Form.Item>
          <Form.Item
            label="Serial Number"
            name="serialNo"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please provide a Serial Number',
              },
            ]}
          >
            <Input placeholder="Serial Number" />
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
            name="purchasedate"
            label="Purchase Date"

            rules={[
              {
                required: true,
                message: 'Please provide a Purchase Date',
              },
            ]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please provide a Price',
              },
            ]}
          >
            <Input placeholder="Price" />
          </Form.Item>
          <Form.Item
            label="Identification Number"
            name="identificationNo"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please provide a Identification Number',
              },
            ]}
          >
            <Input placeholder="Identification Number" />
          </Form.Item>


          <Form.Item label="Warranty" name="warranty" hasFeedback rules={[
            {
              required: true,
              message: 'Please provide a Warranty',
            },
          ]}>
            <Select placeholder="Select a Warranty" allowClear>
              <Option value='none'>None</Option>
              <Option value='1 years'>1 Years</Option>
              <Option value='2 years'>2 Years</Option>
              <Option value='3 years'>3 Years</Option>
              <Option value='4 years'>4 Years</Option>
              <Option value='5 years'>5 Years</Option>
              <Option value='6 years'>6 Years</Option>
              <Option value='7 years'>7 Years</Option>
              <Option value='8 years'>8 Years</Option>
              <Option value='9 years'>9 Years</Option>
              <Option value='10 years'>10 Years</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Status" name="status" hasFeedback rules={[
            {
              // required: true,
              message: 'Please provide a Status',
            },
          ]}>
            <Select placeholder="Select a Status" allowClear>
              <Option value='Active'>Active</Option>
              <Option value='In Active'>In Active</Option>
              <Option value='Damaged'>Damaged</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Item Type" name="itemTypeId" hasFeedback rules={[
            {
              required: true,
              message: 'Please provide a Item Type name',
            },
          ]}>
            <Select placeholder="Select a Item Type" allowClear onChange={(value) => handleCategory(value)}>
              {itemType?.map((brand) => (
                <Option value={brand.id} key={brand.id}>
                  {brand.itemType}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="categoryId" hasFeedback rules={[
            {
              required: true,
              message: 'Please provide a Category name',
            },
          ]}>
            <Select placeholder="Select a Category" allowClear onChange={(value) => handleSubCategory(value)}>
              {filteredCategory?.map((category) => (
                <Option value={category.id} key={category.id}>
                  {category.categoryName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Sub Category" name="subCategoryid" hasFeedback rules={[
            {
              required: true,
              message: 'Please provide a Sub Category name',
            },
          ]}>
            <Select placeholder="Select a Sub Category" allowClear>
              {filteredSubCategory?.map((subcategroy) => (
                <Option value={subcategroy.id} key={subcategroy.id}>
                  {subcategroy.subCategoryName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Brand" name="brandId" hasFeedback rules={[
            {
              required: true,
              message: 'Please provide a Brand name',
            },
          ]}>
            <Select placeholder="Select a Brand" allowClear onChange={(value) => handleModel(value)}>
              {brands?.map((brand) => (
                <Option value={brand.id} key={brand.id}>
                  {brand.brandName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Model"
            name="modelId"
            hasFeedback
            rules={[
              {
                // required: true,
                message: 'Please provide a Model name',
              },
            ]}
          >
            <Select placeholder="Select a Model" allowClear >
              {filteredModel?.map((model) => (
                <Select.Option value={model.id} key={model.id}>
                  {model.modelName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Supplier" name="supplierId" hasFeedback rules={[
            {
              required: true,
              message: 'Please provide a Supplier name',
            },
          ]}>
            <Select placeholder="Select a Supplier" allowClear>
              {suppliers?.map((brand) => (
                <Option value={brand.id} key={brand.id}>
                  {brand.name}
                </Option>
              ))}
            </Select>
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
export default ManageProduct;