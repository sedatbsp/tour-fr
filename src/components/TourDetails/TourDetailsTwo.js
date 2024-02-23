import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import TourDetailsLeft from "./TourDetailsLeft";
import TourDetailsSidebar from "./TourDetailsSidebar";

const TourDetailsTwo = (props) => {

  const {tourPlans, tour, tourComments, tourRates, includeTourFeatures, excludeTourFeatures } = props;

  return (
    <section className="tour-details-two">
      <Container>
        <Row>
          <Col xl={8} lg={7}>
            <TourDetailsLeft tourPlans={tourPlans} tour={tour} tourComments={tourComments} tourRates={tourRates}
             includeTourFeatures={includeTourFeatures} excludeTourFeatures={excludeTourFeatures}/>
          </Col>
          <Col xl={4} lg={5}>
            <TourDetailsSidebar />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TourDetailsTwo;
