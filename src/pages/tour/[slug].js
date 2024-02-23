import Layout from "@/components/Layout/Layout";
import MainSliderTwo from "@/components/MainSliderTwo/MainSliderTwo";
import TourDetailsPage from "@/components/TourDetails/TourDetailsPage";
import slug from "slug";
import FavouriteService from "src/services/FavouriteService";
import RateService from "src/services/RateService";
import TourCommentService from "src/services/TourCommentService";
import TourFeatureService from "src/services/TourFeatureService";
import TourService from "src/services/TourService";

const TourDetails = ({ tour, tourPlans, tourLocations, userFavouritesTourIds, tourComments, tourRates, includeTourFeatures, excludeTourFeatures }) => {
  
  return (
    <Layout pageTitle="Tours Details">
      <MainSliderTwo tour={tour} tourLocations={tourLocations} userFavouritesTourIds={userFavouritesTourIds} />
      <TourDetailsPage tour={tour} tourPlans={tourPlans} tourComments={tourComments} tourRates={tourRates} 
      includeTourFeatures={includeTourFeatures} excludeTourFeatures={excludeTourFeatures} />
    </Layout>
  );
};

// Dinamik path oluşturulduysa bunu kullanmamız gerekiyor ve tüm path'leri tanımlamamız gerekiyor.
export async function getStaticPaths() {

  const data = await TourService.getServices()
    .then((response) => {
      return response.data.items;
    })
    .catch((error) => { console.log("Hata !: " + error) });

  let paths = [];
  if (data && data.length > 0) {
    paths = data.map(tour => {
      return { params: { slug: `${slug(tour.name)}-${tour.id}` } }
    })
  }

  return {
    paths,
    fallback: false,
  }
}

// Sayfa yüklenmeden önce çekecek
export async function getStaticProps({ params }) {

  // path'in sonundaki id'yi aldık
  const id = params.slug.split("-").slice(-1)[0];

  // Tour Object
  const tour = await TourService.getServiceById(id)
    .then((response) => {
      return response.data;
    })
    .catch((error) => { console.log("Hata !: " + error) });

  // Tour Plans
  const tourPlans = await TourService.getServicePlansByServiceId(id)
    .then((response) => {
      return response.data.items;
    }).catch((error) => { console.log("Hata !: " + error) });

  // Tour Locations
  const tourLocations = tour.locations;

  // User Favourite Tours
  let userId = 1;
  const userFavouritesTourIds = await FavouriteService.getUserFavourites(userId)
    .then((response) => {
      let favouriteServiceIds = [];
      let data = response.data.items;
      data.map(f => favouriteServiceIds.push(f.serviceId))
      return favouriteServiceIds;
    }).catch((error) => { console.log("Hata !: " + error) });


  // Tour Comments
  const tourComments = await TourCommentService.getServiceCommentsByServiceId(id)
    .then((response) => {
      return response.data.items;
    }).catch((error) => { console.log("Hata !: " + error) });

  // Tour Rates
  const tourRates = await RateService.getRatesByServiceId(id)
    .then((response) => {
      return response.data.items;
    }).catch((error) => { console.log("Hata !: " + error) });

  // Tour Features
  let includesData = {
    serviceId: id,
    featureType: "INCLUDE"
  }

  let excludesData = {
    serviceId: id,
    featureType: "EXCLUDE"
  }

  const includeTourFeatures = await TourFeatureService.getServiceFeaturesByServiceIdAndFeatureType(includesData)
    .then((response) => {
      return response.data.items;
    }).catch((error) => { console.log("Hata !: " + error) });

  const excludeTourFeatures = await TourFeatureService.getServiceFeaturesByServiceIdAndFeatureType(excludesData)
    .then((response) => {
      return response.data.items;
    }).catch((error) => { console.log("Hata !: " + error) });

  return {
    props: { tour, tourPlans, tourLocations, userFavouritesTourIds, tourComments, tourRates, includeTourFeatures, excludeTourFeatures },
  }
}

export default TourDetails;
