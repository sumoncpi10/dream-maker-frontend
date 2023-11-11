// 
import { Row, Col, Divider, Carousel } from "antd";
import Link from "next/link";
import Container from "../other/Container";
import ScrolBaner from "./ScrolBaner";
import ShopSidebar from "./ShopSidebar";
import TypeSidebar from "./TypeSidebar";

const contentStyle = {
  height: '315px',
  color: '#fff',
  lineHeight: '315px',
  textAlign: 'center',
  background: '#364d79',
};

export default function Banners({ containerType }) {
  return (
    <div className="shop-layout">
      <Container type={containerType}>
        <Row gutter={30}>
          {/* Shop Sidebar */}
          <Col className="gutter-row" xs={24} sm={6} lg={6} >
            <TypeSidebar />
          </Col>

          {/* Shop Content with Carousel */}
          <Col className="gutter-row" xs={24} sm={18} lg={18}>
            <Carousel autoplay>
              {Array.from({ length: 3 }, (item, index) => (
                <Col key={index} className="gutter-row" span={24} sm={8} >
                  <Link href={process.env.PUBLIC_URL + "#"}>
                    <div className="banner-item" style={contentStyle}>
                      <img
                        src={
                          // process.env.PUBLIC_URL +
                          `/assets/images/banners/${index + 1}.jpg`
                        }
                        alt="banner"
                      />
                    </div>
                  </Link>
                </Col>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
