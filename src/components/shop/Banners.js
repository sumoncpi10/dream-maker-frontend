// 
import { Row, Col, Divider, Carousel } from "antd";
import Link from "next/link";
import Container from "../other/Container";
import ScrolBaner from "./ScrolBaner";
import ShopSidebar from "./ShopSidebar";
import TypeSidebar from "./TypeSidebar";
import Image from "next/image";

const contentStyle = {
  height: '340px',
  color: '#fff',
  lineHeight: '340px',
  textAlign: 'center',
  // background: '#364d79',
};

export default function Banners({ containerType, itemType }) {
  return (
    <div className="shop-layout">
      <Container type={containerType}>
        <Row gutter={30}>
          {/* Shop Sidebar */}
          <Col xs={24} sm={6} lg={6}>
            <TypeSidebar itemType={itemType} />
          </Col>

          {/* Shop Content with Carousel */}
          <Col xs={24} sm={18} lg={18}>
            <Carousel autoplay>
              {Array.from({ length: 3 }, (item, index) => (
                <Col key={index} span={24} sm={8}>
                  <Link href={process.env.PUBLIC_URL + "#"}>
                    <div className="banner-item" style={contentStyle}>
                      <Image
                        width={850}
                        height={340}
                        src={`/assets/images/banners/${index + 1}.jpg`}
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
