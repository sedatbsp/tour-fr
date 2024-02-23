import { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import TourCommentService from "src/services/TourCommentService";

const SingleComment = (props) => {
  const { tourComment, tourRates, tourId, getTourComments, getTourRatings } = props;

  const currentUser = useSelector(state => state.user.userInit);

  const {
    user,
    title,
    comment,
    createdAt
  } = tourComment;

  const [review, setReview] = useState({});

  useEffect(() => {
    createReview();
  }, [tourRates, tourComment]);

  const createReview = () => {
    let review = {
      firstname: user.firstName,
      lastname: user.lastName,
      title: title,
      comment: comment,
      createdAt: createdAt,
    }

    tourRates.map((rate) => {

      if (rate.userId === user.id) {
        review.rateServices = rate.rateValues.services;
        review.rateLocations = rate.rateValues.locations;
        review.rateAmenities = rate.rateValues.amenities;
        review.ratePrices = rate.rateValues.prices;
        review.rateFood = rate.rateValues.food;
      }
    })

    setReview(review);
  }

  const deleteComment = () => {
    let data = {
      serviceId: tourId
    }
    TourCommentService.deleteServiceComment(data, currentUser.token)
      .then((response) => {
        console.log(response.data);
        getTourComments();
        getTourRatings();
      })
      .catch((error) => { console.log("Hata !: " + error) });
  }

  return (
    <div className="tour-details__review-comment-single">
      <div className="tour-details__review-comment-top">
        {user.id === currentUser.userId ? <div style={{ position: "absolute", right: 0, top: 0 }}>
          <button className="thm-btn" style={{padding:"5px 10px", textTransform:"capitalize"}} onClick={()=>deleteComment()}> Yorumu Sil </button>
        </div> : <></>}
        <div className="tour-details__review-comment-top-img">
          <Image
            src="https://i.hizliresim.com/jihiihp.png"
            alt="user-profile-photo"
          />
        </div>
        <div className="tour-details__review-comment-top-content">
          <h3>{review.firstname} {review.lastname}  </h3>
          <p>{createdAt.split('T')[0]}</p>
        </div>
      </div>
      <div className="tour-details__review-comment-content mt-1">
        <h3> {review.title} </h3>
        <p>{review.comment}</p>
      </div>
      <div className="tour-details__review-form-stars">
        <Row>
          <Col md={4}>
            <p>
              <span>Services</span>
              {Array.from(Array(5)).map((_, i) => (
                <i
                  key={i}
                  className={`fa fa-star${i < review.rateServices ? " active" : ""}`}
                ></i>
              ))}
            </p>
            <p>
              <span>Locations</span>
              {Array.from(Array(5)).map((_, i) => (
                <i
                  key={i}
                  className={`fa fa-star${i < review.rateLocations ? " active" : ""}`}
                ></i>
              ))}
            </p>
          </Col>
          <Col md={4}>
            <p>
              <span>Amenities</span>
              {Array.from(Array(5)).map((_, i) => (
                <i
                  key={i}
                  className={`fa fa-star${i < review.rateAmenities ? " active" : ""}`}
                ></i>
              ))}
            </p>
            <p>
              <span>Prices</span>
              {Array.from(Array(5)).map((_, i) => (
                <i
                  key={i}
                  className={`fa fa-star${i < review.ratePrices ? " active" : ""}`}
                ></i>
              ))}
            </p>
          </Col>
          <Col md={4}>
            <p>
              <span>Food</span>
              {Array.from(Array(5)).map((_, i) => (
                <i
                  key={i}
                  className={`fa fa-star${i < review.rateFood ? " active" : ""}`}
                ></i>
              ))}
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SingleComment;
