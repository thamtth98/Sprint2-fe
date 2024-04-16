import Header from "./Header";
import "../../css/producer.css";
import * as productService from "../../service/productService";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Carousel, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Producer() {
  const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
  const [producers, setProducers] = useState();

  useEffect(() => {
    getAllProducer();
  }, []);

  const getAllProducer = async () => {
    try {
      const res = await productService.getAllProducer();
      setProducers(res);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  const [filteredProducers, setFilteredProducers] = useState([]);

  useEffect(() => {
    filterProducers();
  }, [producers]);

  const filterProducers = () => {
    if (producers && producers.length > 0) {
      // Lọc những nhà sản xuất bắt đầu bằng số
      const numberProducers = producers.filter((producer) =>
        /^\d/.test(producer.name)
      );
      // Lọc những nhà sản xuất bắt đầu bằng chữ cái
      const letterProducers = producers.filter((producer) =>
        /^[a-zA-Z]/.test(producer.name)
      );

      // Sắp xếp nhà sản xuất theo thứ tự alpha-bet
      letterProducers.sort((a, b) => a.name.localeCompare(b.name));

      const sortedProducers = [...numberProducers, ...letterProducers];
      setFilteredProducers(sortedProducers);
    }
  };
  return (
    <>
      <Header />
      <div className="container py-2">
        <h5 className="m-2">Thương hiệu</h5>
        <hr></hr>
        <div className="alpha-bet text-center fs-4">
          <a href="" className="ps-3 pe-3">
            0-9
          </a>

          {alphabet.split("").map((letter, index) => (
            <a
              href={`#producer-${letter.toLowerCase()}`}
              className="ps-3 pe-3"
              key={index}
            >
              {letter}
            </a>
          ))}
        </div>
        <hr></hr>
        <div>
          {filteredProducers && (
            <>
              {filteredProducers
                .reduce((acc, producer, index) => {
                  if (
                    index === 0 ||
                    filteredProducers[index - 1].name
                      .charAt(0)
                      .toLowerCase() !== producer.name.charAt(0).toLowerCase()
                  ) {
                    acc.push([producer]);
                  } else {
                    acc[acc.length - 1].push(producer);
                  }
                  return acc;
                }, [])
                .map((group, index) => (
                  <Row
                    key={index}
                    className="mb-4"
                    id={`producer-${group[0].name.charAt(0).toLowerCase()}`}
                  >
                    <Col md={12}>
                      <h5>
                        {isNaN(group[0].name.charAt(0))
                          ? group[0].name.charAt(0).toUpperCase()
                          : "0-9"}
                      </h5>
                    </Col>
                    {group.map((producer, index) => (
                      <Col md={2} className="p-0" key={index}>
                        <Link
                          to={`/producer/list/${producer.id}`}
                          className="link-producer"
                        >
                          <Card className="my-card">
                            <div className="img-container">
                              <Card.Img variant="top" src={producer.image.split(",")[0]} />
                            </div>
                            <Card.Body>
                              <Card.Title>{producer.name}</Card.Title>
                              <Card.Text>{producer.description}</Card.Text>
                            </Card.Body>
                          </Card>
                        </Link>
                      </Col>
                    ))}
                  </Row>
                ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default Producer;
