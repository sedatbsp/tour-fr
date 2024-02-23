import React, { useState } from 'react'
import { Col, Row } from "react-bootstrap";
import TourCommentService from "src/services/TourCommentService";
import { Rating } from 'react-simple-star-rating'
import RateService from 'src/services/RateService';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const inputs = ["title", "comment"];

const ReviewForm = (props) => {

  const currentUser = useSelector(state => state.user.userInit);

  const { tourId, getTourComments, getTourRatings } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (servicesRate === 0 ||
      locationsRate === 0 ||
      pricesRate === 0 ||
      amenitiesRate === 0 ||
      foodRate === 0) {
      toast.error("Puanlandırmalar boş olamaz")
      return;
    }
    
    let rate = {
      serviceId: tourId,
      rateValues: {
        services: servicesRate,
        locations: locationsRate,
        amenities: pricesRate,
        prices: amenitiesRate,
        food: foodRate
      }
    }
    const formData = new FormData(e.target);
    const comment = {};
    inputs.forEach((input) => (comment[input] = formData.get(input)));
    comment.serviceId = tourId;
    createTourReview(comment, rate);

    setServicesRate(0);
    setLocationsRate(0);
    setPricesRate(0);
    setAmenitiesRate(0);
    setFoodRate(0);

    e.target.reset();
    
  };

  const createTourReview = (comment, rate) => {

    TourCommentService.createServiceComment(comment, currentUser.token)
      .then((response) => {
        getTourComments();
      })
      .catch((error) => { console.log("Hata !: " + error) });

    RateService.createRate(rate, currentUser.token).then((response) => {
      getTourRatings();
    })
      .catch((error) => { console.log("Hata !: " + error) });
  }

  // Catch Rating value
  const [servicesRate, setServicesRate] = useState(0);
  const [locationsRate, setLocationsRate] = useState(0);
  const [pricesRate, setPricesRate] = useState(0);
  const [amenitiesRate, setAmenitiesRate] = useState(0);
  const [foodRate, setFoodRate] = useState(0);

  const handleServicesRating = (rate) => { setServicesRate(rate / 20) }
  const handleLocationsRating = (rate) => { setLocationsRate(rate / 20) }
  const handlePricesRating = (rate) => { setPricesRate(rate / 20) }
  const handleAmenitiesRating = (rate) => { setAmenitiesRate(rate / 20) }
  const handleFoodRating = (rate) => { setFoodRate(rate / 20) }

  return (
   <div> 
      
      <form onSubmit={handleSubmit} className="tour-details__review-form">

        <Row>
          <Col xl={5}>

            <div className="mb-4">
              <div className="tour-details__review-form-rate-single">
                <div className="tour-details__review-form-rate-left">
                  <span>Services</span>
                </div>
                <div className="tour-details__review-form-rate-right">
                  <Rating
                    onClick={handleServicesRating}
                    ratingValue={servicesRate * 20}
                    size={25}
                    initialValue={0}
                    fillColor="#ffa801"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="tour-details__review-form-rate-single">
                <div className="tour-details__review-form-rate-left">
                  <span>Locations</span>
                </div>
                <div className="tour-details__review-form-rate-right">
                  <Rating
                    onClick={handleLocationsRating}
                    ratingValue={locationsRate * 20}
                    size={25}
                    initialValue={0}
                    fillColor="#ffa801"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="tour-details__review-form-rate-single">
                <div className="tour-details__review-form-rate-left">
                  <span>Prices</span>
                </div>
                <div className="tour-details__review-form-rate-right">
                  <Rating
                    onClick={handlePricesRating}
                    ratingValue={pricesRate * 20}
                    size={25}
                    initialValue={0}
                    fillColor="#ffa801"
                  />
                </div>
              </div>
            </div>

          </Col>

          <Col xl={2} />

          <Col xl={5}>

            <div className="mb-4">
              <div className="tour-details__review-form-rate-single">
                <div className="tour-details__review-form-rate-left">
                  <span>Amenities</span>
                </div>
                <div className="tour-details__review-form-rate-right">
                  <Rating
                    onClick={handleAmenitiesRating}
                    ratingValue={amenitiesRate * 20}
                    size={25}
                    initialValue={0}
                    fillColor="#ffa801"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="tour-details__review-form-rate-single">
                <div className="tour-details__review-form-rate-left">
                  <span>Food</span>
                </div>
                <div className="tour-details__review-form-rate-right">
                  <Rating
                    onClick={handleFoodRating}
                    ratingValue={foodRate * 20}
                    size={25}
                    initialValue={0}
                    fillColor="#ffa801"
                  />
                </div>
              </div>
            </div>

          </Col>
        </Row>

        <Row>
          <Col xl={12}>
            <div className="tour-details__review-form-input">
              <input
                type="text"
                placeholder="Review Title"
                name="title"
                required
              />
            </div>
          </Col>
        </Row>

        <div className="tour-details__review-form-textarea">
          <textarea
            placeholder="Write Comment"
            name="comment"
            required
          />
          <button
            type="submit"
            className="thm-btn tour-details__review-form-btn"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
