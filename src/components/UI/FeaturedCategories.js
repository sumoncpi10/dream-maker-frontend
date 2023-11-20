// AllProducts.js

import React from "react";
import { Card, Col, Row } from "antd";
import Image from "next/image";
import {
  ArrowRightOutlined,
  CalendarOutlined,
  CommentOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const FeaturedCategories = ({ allProducts, PageTitle }) => {
  const { Meta } = Card;
  // console.log(allProducts);
  return (
    <>
      <h1
        style={{
          textAlign: "center",
          fontSize: "50px",
          margin: "30px 0px",
        }}
      >
        #{PageTitle}
      </h1>
      <Row gutter={[16, 16]}>
        {allProducts?.map((part) => (
          <Col key={part.id} xs={24} sm={12} md={8} lg={8}>
            <Card
              hoverable
            // cover={
            //   <Image
            //     src={part?.image_url}
            //     width={500}
            //     height={450}
            //     responsive
            //     alt="news image"
            //   />
            // }
            >
              <Meta title={part?.category} />
              <div
                className="line"
              // style={{
              //   height: "5px",
              //   margin: "20px 0",
              //   background: "#000",
              //   width: "100%",
              // }}
              ></div>

              {/* <p
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  color: "gray",
                  margin: "10px 0px",
                  fontSize: "12px",
                }}
              >
                <span>
                  <CalendarOutlined /> {part?.release_date}
                </span>
                <span>
                  <CommentOutlined /> {part?.comment_count} COMMENTS
                </span>
                <span>
                  <ProfileOutlined /> {part?.category}
                </span>
              </p> */}

              {/* <p style={{ fontSize: "15px" }}>
                {part?.product_name.length > 100
                  ? part?.product_name.slice(0, 70) + "..."
                  : part?.product_name}
              </p> */}
              <Link href={`/${part?.url}`}>
                <p
                  style={{
                    fontSize: "15px",
                    marginTop: "20px",
                    backgroundColor: "black",
                    color: "white",
                    width: "100%",
                    padding: "2px 5px ",
                    fontWeight: "300",
                    letterSpacing: "3px",
                    textAlign: "center",
                  }}
                >
                  Show Products <ArrowRightOutlined />
                </p>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default FeaturedCategories;
