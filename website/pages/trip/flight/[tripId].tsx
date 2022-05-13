import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { DepartureFlightFormComponent } from '../../../components/forms/departureFlightFormComponent';
import { Loading } from '../../../components/Loading';
import { getAllTrips, getTrip } from '../../../services/dbService';
import { TripProps } from '../../../types/tripProp';

const FligthsForm: React.FC<TripProps> = ({ trip }) => {
  const { isLoading } = useAuth0();

  if (isLoading) return <Loading />;
  return (
    <main className='flightbg'>
      <DepartureFlightFormComponent trip={trip} />
    </main>
  );
};

export const getStaticPaths = async () => {
  const trips = await getAllTrips();
  const paths = trips.map((trip) => ({
    params: { tripId: trip.id?.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const id = params.tripId;
  const trip = await getTrip(+id);

  return {
    props: {
      trip,
    },
  };
};

export default FligthsForm;