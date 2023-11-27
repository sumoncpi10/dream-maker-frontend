import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Select,
  Collapse,
} from "antd";
import { useState, useCallback } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Link from "next/link";
import { notification } from "antd";
import { formatCurrency } from "../../common/utils";
import { calculateTotalPrice } from "../../common/shopUtils";
import LayoutOne from "../../components/layouts/LayoutOne";
import Container from "../../components/other/Container";
import { getUserInfo } from "@/services/user-info";
import { useGetShippingAddressQuery } from "@/redux/features/shippingAddress/shippingAddressApi";
import { usePostOrderMutation } from "@/redux/features/order/orderApi";
const { Option } = Select;
const { Panel } = Collapse;
const paymentData = [
  {
    name: "Cash On Delivery",
    index: "cashOnDelivery",
    content:
      "Received Product on HandCash",
  },
  {
    name: "Direct Bank Transfer",
    index: "cashOnDelivery",
    content:
      "Transfer Money To This DBBL(Dutch Bangla Bank) Account Number - 151.........",
  },
  {
    name: "Bkash Payment",
    index: "cashOnDelivery",
    content:
      "Go to Payment Option And Pay to this Account Number - 01000000000",
  },
  {
    name: "SSL Comerz",
    index: "cashOnDelivery",
    content:
      "With so many different ways today to find information online, it can sometimes be hard to know where to go to first.",
  },
];

export default function Checkout() {
  const [api, contextHolder] = notification.useNotification();
  const { Option } = Select;
  const { Panel } = Collapse;
  const router = useRouter();
  const cartState = useSelector((state) => state.cartReducer);
  const globalState = useSelector((state) => state.globalReducer);
  const { currency, locales } = globalState.currency;
  const { data } = useGetShippingAddressQuery({ refetchOnMountOrArgChange: true });
  const shippingAddress = data?.data;
  // console.log(shippingAddress)
  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");
  const product = cartState?.map(cart => {
    const productId = cart.id;
    const quantity = cart.cartQuantity;

    return { productId, quantity } // Adding a new property to each object

  })
  // console.log(product)
  const settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  const [postOrder] = usePostOrderMutation();
  const onFinish = async (values) => {
    values['product'] = product;
    values['orderType'] = paymentMethod;
    console.log(values)
    const options = {
      data: values
    }
    const result = await postOrder(options);
    console.log(result)
    if (result?.data?.statusCode == 200) {
      const openNotificationWithIcon = (type) => {
        api[type]({
          message: result?.data?.message,
        });
      };
      openNotificationWithIcon('success')
      router.push("/shop/checkout-complete");
    } else {
      const openNotificationWithIcon = (type) => {
        api[type]({
          message: result?.error?.data?.message,
        });
      };
      openNotificationWithIcon('error')
    }

  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onChoosePayment = useCallback(
    (key) => {
      setPaymentMethod(key);
    },
    [paymentMethod]
  );
  const { email, name } = getUserInfo()
  console.log(cartState, email, name)
  return (
    <LayoutOne title="Checkout">
      {contextHolder}
      <div className="checkout">
        <div className="checkout-top">
          <Container>
            <Row gutter={{ xs: 0, lg: 70 }}>
              <Col span={24} lg={15} xl={17}>
                <h3 className="checkout-title">Shipping Address</h3>
                <Form
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  id="checkout-form"
                  layout="vertical"
                  className="checkout-form"
                >
                  <Row gutter={{ xs: 10, sm: 15, md: 30, lg: 70 }}>
                    <Col span={24} md={12}>
                      <Form.Item
                        label="Name"
                        name="name"

                        initialValue={shippingAddress?.users?.name}

                        rules={[
                          {
                            required: true,
                            message: "Please input your name!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={24} md={12}>
                      <Form.Item
                        label="Phone number"
                        name="contactNo"
                        initialValue={shippingAddress?.users?.contactNo}
                        rules={[
                          {
                            required: true,
                            message: "Please input your phone number !",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={24} md={12}>
                      <Form.Item
                        label="Division"
                        name="divisionId"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Division!",
                          },
                        ]}
                      >
                        <Select>
                          <Option value="fe1d3013-d5dd-40c8-9d05-4f6b289a72ca">Dhaka</Option>
                          <Option value="fe1d3013-d5dd-40c8-9d05-4f6b289a72ca">Chittagong</Option>
                          <Option value="fe1d3013-d5dd-40c8-9d05-4f6b289a72ca">Sylhet</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={24} md={12}>
                      <Form.Item
                        label="District"
                        name="districtId"
                        rules={[
                          {
                            required: true,
                            message: "Please input your District!",
                          },
                        ]}
                      >
                        <Select>
                          <Option value="070878ab-979d-4795-b5f8-0882a5b04d2f">Dhaka</Option>
                          <Option value="070878ab-979d-4795-b5f8-0882a5b04d2f">Narayanganj</Option>
                          <Option value="070878ab-979d-4795-b5f8-0882a5b04d2f">Gazipur</Option>
                          <Option value="070878ab-979d-4795-b5f8-0882a5b04d2f">Chittagong</Option>
                          <Option value="070878ab-979d-4795-b5f8-0882a5b04d2f">Coxs Bazar</Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={24} md={12}>
                      <Form.Item
                        label="Thana"
                        name="thanaId"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Thana !",
                          },
                        ]}
                      >
                        <Select>
                          <Option value="49068a42-34bb-4693-a4d3-aa1ca83a9a1f">Dhaka</Option>
                          <Option value="49068a42-34bb-4693-a4d3-aa1ca83a9a1f">Savar</Option>
                          <Option value="49068a42-34bb-4693-a4d3-aa1ca83a9a1f">Panchlish</Option>
                          <Option value="49068a42-34bb-4693-a4d3-aa1ca83a9a1f">Coxsbazar Sadar</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={24} md={12}>
                      <Form.Item label="Postcode/Zip" name="postCode">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={24} md={12}>
                      <Form.Item
                        label="Address"
                        name="houseBuildingStreet"
                        rules={[
                          {
                            required: true,
                            message: "House /Building /Street!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col span={24} md={12}>
                      <Form.Item label="Email"
                        name="email"
                        initialValue={shippingAddress?.userEmail}
                        rules={[
                          {
                            type: 'email',
                            message: 'The input is not a valid email!',
                          },
                          {
                            required: true,
                            message: 'Please input your email!',
                          },
                        ]}>
                        <Input disabled />
                      </Form.Item>
                    </Col>
                    <Col span={24} md={12}>

                    </Col>
                    <Col span={24}>
                      <Form.Item
                        // name="news-subcribe" 
                        valuePropName="checked">
                        <Checkbox>
                          I want to receive exclusive discounts and information
                          on the latest Dream Maker Super Shop trends.
                        </Checkbox>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Col>
              <Col span={24} md={16} lg={9} xl={7}>
                <div className="checkout-total">
                  <h3 className="checkout-title">Your Order</h3>
                  <div className="checkout-total__table">
                    <div className="divider" />
                    <table className="checkout-total__table-calculate">
                      <thead>
                        <tr>
                          <th>Products</th>
                          <th>Subtoal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartState.map((item, index) => (
                          <tr key={index}>
                            <td>
                              {item.name}
                              <span> x {item.cartQuantity}</span>
                            </td>
                            <td>
                              {item.discount
                                ? formatCurrency(
                                  item.price - item.discount,
                                  locales,
                                  currency
                                )
                                : formatCurrency(item.price, locales, currency)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="divider" />
                    <table className="checkout-total__table-subtotal">
                      <tbody>
                        <tr>
                          <td>Subtotal</td>
                          <td>
                            {formatCurrency(
                              calculateTotalPrice(cartState),
                              locales,
                              currency
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="divider" />
                    <table className="checkout-total__table-shiping">
                      <tbody>
                        <tr>
                          <td>
                            <h5>Shiping</h5>
                            <p>Shiping to United State</p>
                          </td>
                          <td>Free</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="checkout-total__table-total">
                      <tbody>
                        <tr>
                          <td>Total</td>
                          <td>
                            {formatCurrency(
                              calculateTotalPrice(cartState),
                              locales,
                              currency
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <Collapse
                      className="checkout-payment"
                      accordion
                      defaultActiveKey={paymentMethod}
                      ghost
                      onChange={onChoosePayment}
                    >
                      {paymentData?.map((item, index) => (
                        <Panel
                          showArrow={false}
                          header={item.name}
                          key={item.name}
                          onClick={() => setPaymentMethod(item.cashOnDelivery)}
                          extra={
                            <i
                              className={
                                paymentMethod === item.name
                                  ? "fas fa-check-square"
                                  : "fal fa-square"
                              }
                            />
                          }
                        >
                          <p>{item.content}</p>
                        </Panel>
                      ))}
                    </Collapse>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        {/* <div className="checkout-bottom">
          <Container>
            <h5>Discount When Purchased Together</h5>
            <div className="checkout-related-products">
              <Slider {...settings}>
                {productData.slice(0, 8).map((item, index) => (
                  <div className="slider-item" key={index}>
                    <Product data={item} />
                  </div>
                ))}
              </Slider>
            </div>
          </Container>
        </div> */}
        <div className="checkout-sticky">
          <Container>
            <div className="checkout-functions">
              <Button className="checkout-functions--shopping">
                <Link href={
                  // process.env.PUBLIC_URL + 
                  "/"}>
                  Continue Shopping
                </Link>
              </Button>
              <div className="checkout-price-finally">
                <table>
                  <tbody>
                    <tr>
                      <td>{cartState.length} items</td>
                      <td>
                        {formatCurrency(
                          calculateTotalPrice(cartState),
                          locales,
                          currency
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Total:</td>
                      <td>
                        {formatCurrency(
                          calculateTotalPrice(cartState),
                          locales,
                          currency
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Button
                className="checkout-functions--next"
                form="checkout-form"
                key="submit"
                htmlType="submit"
                style={{ marginBottom: 0 }}
              >
                Confirm Order
              </Button>
            </div>
          </Container>
        </div>
      </div>
    </LayoutOne>
  );
}
