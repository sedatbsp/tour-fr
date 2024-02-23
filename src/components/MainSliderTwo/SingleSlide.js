import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import FavouriteService from "src/services/FavouriteService";
import { SwiperSlide } from "swiper/react";

const SingleSlide = (props) => {
  const currentUser = useSelector(state => state.user.userInit);
  const userId = currentUser.userId;
  const { image, tour, userFavouritesTourIds } = props;
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    tourIsFavourite(tour.id);
  }, []);

  async function tourIsFavourite(id) {
    debugger;
    if (userFavouritesTourIds.includes(id)) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
  }

  const createFavourite = (serviceId, token) => {
    if (userId === undefined) {
      toast.error("Önce giriş yapmalısınız.");
      return;
    }

    const sendData = { serviceId };
    FavouriteService.createFavourite(sendData, token)
      .then((response) => {
        getUserFavourites();
      })
      .catch((error) => {
        console.log("Hata !: " + error);
      });
  };

  const deleteFavourite = (serviceId) => {
    const sendData = { serviceId };
    FavouriteService.deleteFavourite(sendData)
      .then((response) => {
        setIsFavourite(false);
      })
      .catch((error) => {
        console.log("Hata !: " + error);
      });
  };

  return (
    <SwiperSlide>
      <div
        className="image-layer"
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>
      <Container>
        <div className="swiper-slide-inner">
          <div className="tour-details-slider_icon">
            <a href="#">
              <i className="fab fa-youtube"></i>
            </a>

            {isFavourite ? (
              <a
                style={{ backgroundColor: "#fff" }}
                onClick={() => deleteFavourite(tour.id)}
              >
                <i
                  key={tour.id}
                  className="fa fa-heart"
                  style={{ color: "#e8604c" }}
                ></i>
              </a>
            ) : (
              <a onClick={() => createFavourite(tour.id, currentUser.token)}>
                <i key={tour.id} className="fa fa-heart"></i>
              </a>
            )}
          </div>
        </div>
      </Container>
    </SwiperSlide>
  );
};

export default SingleSlide;
