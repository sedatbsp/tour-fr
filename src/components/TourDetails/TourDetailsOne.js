import { Col, Container, Row } from "react-bootstrap";

/*const { title, rate, duration, minAge, tourType, location, date, superb } =
  tourDetailsOne;*/

const TourDetailsOne = (props) => {

  const {tour} = props;

  return (
    <section className="tour-details">
      <div className="tour-details__top">
        <Container>
          <Row>
            <Col xl={12}>
              <div className="tour-details__top-inner">
                <div className="tour-details__top-left">
                  <h2 className="tour-details__top-title"> {tour.name} </h2>
                  <p className="tour-details__top-rate">
                    <span>{tour.price} $</span> / Per Person
                  </p>
                </div>
                <div className="tour-details__top-right">
                  <ul className="list-unstyled tour-details__top-list">
                    <li>
                      <div className="icon">
                        <span className="icon-clock"></span>
                      </div>
                      <div className="text">
                        <p>Duration</p>
                        <h6> {tour.duration} </h6>
                      </div>
                    </li>
                    <li>
                      <div className="icon">
                        <span className="icon-plane"></span>
                      </div>
                      <div className="text">
                        <p>Tour Type</p>
                        <h6> {tour.type} </h6>
                      </div>
                    </li>
                    <li>
                      <div className="icon">
                      <span className="icon-user"></span>
                      </div>
                      <div className="text">
                        <p>Quota</p>
                        <h6> {tour.quota} </h6>
                      </div>
                    </li>

                    <li>
                      <div className="icon">
                      <i className="fa fa-square"></i>
                      </div>
                      <div className="text">
                        <p>Category</p>
                        <h6> {tour.category} </h6>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="tour-details__bottom">
        <Container>
          <Row>
            <Col xl={12}>
              <div className="tour-details__bottom-inner">
                <div className="tour-details__bottom-left">
                  <ul className="list-unstyled tour-details__bottom-list">
                    <li>
                      <div className="icon">
                        <span className="icon-clock"></span>
                      </div>
                      <div className="text">
                        <p>Tour Start : {tour.startDate.split("T")[0]} </p>
                      </div>
                    </li>

                    <li>
                      <div className="icon">
                        <span className="icon-clock"></span>
                      </div>
                      <div className="text">
                        <p>Tour End : {tour.endDate.split("T")[0]} </p>
                      </div>
                    </li>
                    <li>
                      <div className="icon">
                        {Array.from(Array(5)).map((_, i) => (
                          <i key={i} className="fa fa-star"></i>
                        ))}
                      </div>
                      <div className="text">
                        <p>4.5</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="tour-details__bottom-right">
                  <a href="#">
                    <i className="fas fa-share"></i>share
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default TourDetailsOne;
