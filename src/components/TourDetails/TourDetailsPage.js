import TourDetailsOne from "./TourDetailsOne";
import TourDetailsTwo from "./TourDetailsTwo";

const TourDetailsPage = (props) => {

  const { tour,tourPlans, tourComments, tourRates, includeTourFeatures, excludeTourFeatures } = props;

  return (
    <>
      <TourDetailsOne tour={tour} />
      <TourDetailsTwo tourPlans={tourPlans} tour={tour} tourComments={tourComments} tourRates={tourRates}
      includeTourFeatures={includeTourFeatures} excludeTourFeatures={excludeTourFeatures}  />
    </>
  );
};

export default TourDetailsPage;
 