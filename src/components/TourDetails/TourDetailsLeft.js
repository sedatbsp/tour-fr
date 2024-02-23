import SingleTour from "@/components/PopularTours/SingleTour";
import popularTours from "@/data/popularTours";
import { tourDetailsLeft } from "@/data/tourDetailsPage";
import Link from "next/link";
import React, { useImperativeHandle, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import RateService from "src/services/RateService";
import TourCommentService from "src/services/TourCommentService";
import ReviewForm from "./ReviewForm";
import ReviewScoreBar from "./ReviewScoreBar";
import SingleComment from "./SingleComment";

const { overviewList, superb, reviewScore } =
  tourDetailsLeft;

const TourDetailsLeft = (props) => {
  const currentUser = useSelector(state => state.user.userInit);

  const { tourPlans, tour, tourComments, tourRates, includeTourFeatures, excludeTourFeatures } = props;

  const [active, setActive] = useState(1);

  const [stateTourComments, setTourComments] = useState(tourComments);
  const [stateTourRates, setTourRates] = useState(tourRates);

  const getTourComments = () => {
    TourCommentService.getServiceCommentsByServiceId(tour.id)
      .then((response) => {
        setTourComments(response.data.items);
      }).catch((error) => { console.log("Hata !: " + error) });
  }

  const getTourRatings = () => {
    RateService.getRatesByServiceId(tour.id)
      .then((response) => {
        setTourRates(response.data.items);
      }).catch((error) => { console.log("Hata !: " + error) });
  }

  return (
    <div className="tour-details-two__left">
      <div className="tour-details-two__overview">
        <h3 className="tour-details-two__title">Overview</h3>
        <p className="tour-details-two__overview-text">{tour.description}</p>
        <div className="tour-details-two__overview-bottom">
          <h3 className="tour-details-two-overview__title">Included</h3>
          <div className="tour-details-two__overview-bottom-inner">
            <div className="tour-details-two__overview-bottom-left">
              <ul className="list-unstyled tour-details-two__overview-bottom-list">
                {
                  includeTourFeatures.length > 0
                    ?
                    includeTourFeatures.map((item) => (
                      <li key={item.id}>
                        <div className="icon">
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="text">
                          <p>{item.description}</p>
                        </div>
                      </li>
                    ))

                    :

                    <li key="1">
                      <div className="icon">
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="text">
                        <p>Bu tura dahil olanlar bulunamadı.</p>
                      </div>
                    </li>
                }
              </ul>

              <div className="mt-4">
                <h3 className="tour-details-two-overview__title">Exclude</h3>
                <ul className="list-unstyled tour-details-two__overview-bottom-right-list">
                  {
                    excludeTourFeatures.length > 0
                      ?
                      excludeTourFeatures.map((item) => (
                        <li key={item.id}>
                          <div className="icon">
                            <i className="fa fa-times"></i>
                          </div>
                          <div className="text">
                            <p>{item.description}</p>
                          </div>
                        </li>
                      ))

                      :

                      <li>
                        <div className="icon">
                          <i className="fa fa-times"></i>
                        </div>
                        <div className="text">
                          <p>Bu tura dahil olmayanlar bulunamadı.</p>
                        </div>
                      </li>
                  }
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="tour-details-two__tour-plan">
        <h3 className="tour-details-two__title">Tour Plan</h3>
        <div className="accrodion-grp faq-one-accrodion">
          {tourPlans.length > 0 ? tourPlans.map(({ id, dayOrder, title, description }) => (
            <div
              className={`accrodion overflow-hidden${active === id ? " active" : ""
                }`}
              key={id}
            >
              <div onClick={() => setActive(id)} className="accrodion-title">
                <h4>
                  <span>{dayOrder}. Gün</span> {title}
                </h4>
              </div>
              <div
                className={`accrodion-content animated ${active === id ? "slideInUp d-block" : "slideInDown d-none"
                  }`}
              >
                <div className="inner">
                  <p>{description}</p>
                  {/* <ul className="list-unstyled">
                    {lists.map((list, index) => (
                      <li key={index}>{list}</li>
                    ))}
                  </ul> */}
                </div>
              </div>
            </div>
          )) 
          :
          <div className="info-or-result-feedback"> Tur planı bulunamadı </div> }
        </div>
      </div>
      {/* <div className="tour-details-two__location">
        <h3 className="tour-details-two__title">Tour Plan</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4562.753041141002!2d-118.80123790098536!3d34.152323469614075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80e82469c2162619%3A0xba03efb7998eef6d!2sCostco+Wholesale!5e0!3m2!1sbn!2sbd!4v1562518641290!5m2!1sbn!2sbd"
          className="tour-details-two__location-map"
          allowFullScreen
        ></iframe>
      </div> */}
      <div className="tour-details-two__related-tours">
        <h3 className="tour-details-two__title">Similar To This Tour</h3>
        <Row>
          {popularTours.slice(0, 2).map((tour) => (
            <Col xl={6} key={tour.id}>
              <SingleTour tour={tour} userSelect />
            </Col>
          ))}
        </Row>
      </div>
      <h3 className="tour-details-two__title review-scores__title">
        Reviews
      </h3>
      <div className="tour-details__review-score">
        <div className="tour-details__review-score-ave">
          <div className="my-auto">
            <h3>{superb}</h3>
            <p>
              <i className="fa fa-star"></i> Super
            </p>
          </div>
        </div>
        <div className="tour-details__review-score__content">
          {reviewScore.map((review) => (
            <ReviewScoreBar review={review} key={review.id} />
          ))}
        </div>
      </div>
      <div className="tour-details__review-comment">
        {stateTourComments.length > 0 ? stateTourComments.map((comment) => (
          <SingleComment tourComment={comment} key={comment.id} tourId={tour.id}
            tourRates={stateTourRates} getTourComments={getTourComments} getTourRatings={getTourRatings} />
        ))
          :
          <div className="info-or-result-feedback"> Henüz yorum yapılmamış</div>}
      </div>

      <div className="tour-details__review-form">
        <h3 className="tour-details-two__title">Write a Review</h3>
        {
          Object.getOwnPropertyNames(currentUser).length !== 0 ?
            <ReviewForm tourId={tour.id} getTourComments={getTourComments} getTourRatings={getTourRatings} />
            :
            <div className="info-or-result-feedback">
              Yorum yapabilmek için <Link href="/login"> giriş yapmalısınız </Link> <br />
              Henüz hesabınız yoksa <Link href="/signup"> buradan kayıt olabilirsiniz </Link>
            </div>
        }
      </div>




    </div>
  );
};

export default TourDetailsLeft;
