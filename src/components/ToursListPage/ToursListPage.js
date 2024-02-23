import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ToursListLeft from "./ToursListLeft";
import ToursListRight from "./ToursListRight";
import TourFilterService from "src/services/TourFilterService";
import TourService from "src/services/TourService";
import TourTypeService from "src/services/TourTypeService";
import { useSelector } from 'react-redux';
import TourLocationService from "src/services/TourLocationService";
import LocationService from "src/services/LocationService";

const ToursListPage = () => {

  const [toursList, setToursList] = useState([]);
  const [tourTypesList, setTourTypesList] = useState([]);

  useEffect(() => {
    getTours();
    getTourTypes();
  }, []);

  async function getTours() {
    await TourService.getServices()
      .then((response) => {
        let tours = response.data.items;

        // tours.map((tour) => {
        //   TourLocationService.getTopServiceLocationByServiceId(tour.id)
        //     .then((response) => {

        //       let tourLocation = response.data;

        //       LocationService.getLocation(tourLocation.locationId)
        //         .then((response) => {
        //           let city = response.data.city;
        //           tour.firstLocation = city;
        //         })
        //     })
        // })

        setToursList(tours);

      })
      .catch((error) => { console.log("Hata !: " + error) });

  };

  const getTourTypes = () => {
    TourTypeService.getServiceTypes()
      .then((response) => {
        setTourTypesList(response.data.items.map((item) => { return { label: item.name, value: item.id } }));
      })
      .catch((error) => { console.log("Hata !: " + error) });
  };


  const getTopTourLocation = () => {
    toursList.map((tour) => {
      TourLocationService.getTopServiceLocationByServiceId(tour.id)
        .then((response) => {
          console.log(response);
          LocationService.getLocation(response.data.locationId)
            .then((response) => {
              tour.firstLocation = response.data.city;
              console.log(tour)
            })
        })
        .catch((error) => { console.log("Hata !: " + error) })
    });
  }

  const searchTours = (data) => {
    TourFilterService.getServiceByStartDateAndEndDateAndLocation(data).then((response) => {
      setToursList(response.data.items);
    })
      .catch((error) => { console.log("Hata !: " + error) })
  };

  const toursByPrices = (data) => {
    TourFilterService.getServicesByPrices(data)
      .then((response) => {
        setToursList(response.data.items)
      })
      .catch((error) => { console.log("Hata !: " + error) });
  }

  return (
    <section className="tours-list">
      <Container>
        <Row>
          <Col xl={4} lg={5}>
            <ToursListLeft
              searchTours={searchTours}
              toursByPrices={toursByPrices}
              toursList={toursList}
              tourTypesList={tourTypesList} />
          </Col>
          <Col xl={8} lg={7}>
            <ToursListRight
              tourList={toursList}
              getTours={getTours} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ToursListPage;
