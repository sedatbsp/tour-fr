import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import slug from "slug";
import FavouriteService from "src/services/FavouriteService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ToursListRight = (props) => {
  const currentUser = useSelector(state => state.user.userInit);

  const userId = currentUser.userId;
  const token = currentUser.token;

  var { tourList, getTours } = props;

  const [favouriteList, setFavouriteList] = useState([]);

  useEffect(() => {
    getUserFavourites();
  }, []);

  async function getUserFavourites() {
    userId !== undefined ?

      await FavouriteService.getUserFavourites(userId, token).then((response) => {
        let favouriteServiceIds = [];
        let data = response.data.items;
        debugger;
        data.map(f => favouriteServiceIds.push(f.serviceId))
        setFavouriteList(favouriteServiceIds);

      })
        .catch((error) => { console.log("Hata !: " + error) })

      :

      setFavouriteList([]);

  }

  const createFavourite = (serviceId, token) => {

    if (userId === undefined) {
      toast.error("Önce giriş yapmalısınız.");
      return;
    }

    const sendData = { serviceId };
    FavouriteService.createFavourite(sendData, token).then((response) => {
      getUserFavourites();
    })
      .catch((error) => { console.log("Hata !: " + error) })
  };

  const deleteFavourite = (serviceId, token) => {
    debugger;
    const sendData = serviceId;
    FavouriteService.deleteFavourite(sendData, token).then((response) => {
      console.log(response.data);
      getUserFavourites();
    })
      .catch((error) => { console.log("Hata !: " + error) })
  };

  return (
    <div className="tours-list__right">
      <div className="tours-list__inner">
        {

          tourList.length > 0 ?
            tourList.map(
              ({ id, name, description, price, duration, locations, quota, image, startDate, firstLocation }) => (
                
                <div key={id} className="tours-list__single">
                  <div className="tours-list__img">
                    <Image
                      src={image}
                      alt=""
                    />
                    <div className="tours-list__icon">

                      {

                        favouriteList.length !== 0

                          ?

                          favouriteList.includes(id) ?

                            (<a style={{ backgroundColor: "#fff" }} onClick={() => deleteFavourite(id, currentUser.token)}>
                              <i key={id} className="fa fa-heart" style={{ color: "#e8604c" }} ></i>
                            </a>)

                            :

                            (<a onClick={() => createFavourite(id, currentUser.token)}>
                              <i key={id} className="fa fa-heart"></i>
                            </a>)

                          :

                          ((<a onClick={() => createFavourite(id, currentUser.token)}>
                            <i key={id} className="fa fa-heart"></i>
                          </a>))

                      }

                    </div>
                  </div>
                  <div className="tours-list__content">
                    <div className="tours-list__stars">
                      <i className="fa fa-star"></i> 4.5
                    </div>
                    <h3 className="tours-list__title">
                      <Link href="/tour/[slug]" as={`/tour/${slug(name)}-${id}`}>
                        <a> {name} </a>
                      </Link>
                    </h3>
                    <p className="tours-list__rate">
                      <span>${price}</span> / Per Person
                    </p>
                    <p className="tours-list__text">{description.substring(0, 155)}</p>
                    <ul className="tours-list__meta list-unstyled">
                      <li>
                        <Link href="/tour-details">
                          <a>
                            <i className="far fa-calendar"></i>
                            {startDate.split('T')[0]}
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/tour-details">
                          <a>
                            <i className="far fa-user-circle"></i>
                            {quota}
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/tour-details">
                          <a>
                            <i className="far fa-map"></i>
                            {/* {firstLocation} */}
                            KONUM
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )
            ) :

            <div className="info-or-result-feedback">
              Aramanızla eşleşen herhangi bir tur programı bulunamadı. <br />
              <a onClick={() => getTours()}>
                <Link href="/tours-list"> Filtreyi sıfırlamak için tıklayın </Link>
              </a>

            </div>
        }
      </div>
    </div>
  );
};

export default ToursListRight;