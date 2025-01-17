import { useAuth0 } from '@auth0/auth0-react';
import dynamic from 'next/dynamic';
import React from 'react';
import { DashboardComponent } from '../../../components/dashboard/DashboardComponent';
import { EventsComponent } from '../../../components/dashboard/EventsComponent';
import { TripNavigation } from '../../../components/dashboard/TripNavigation';
import { Loading } from '../../../components/Loading';
import { useUserContext } from '../../../context/userContext';
import { getEvents, getTrip } from '../../../services/dbService';
import { EventType } from '../../../types/event.type';
import { TripProps } from '../../../types/tripProp';
import {
  getAmadeusEvents,
  getAmadeusRestaurants,
} from '../../../utils/amadeus';
import { eventParser } from '../../../utils/eventParser';
import {
  getStaticTripPaths,
  getStaticTripProps,
} from '../../../utils/getStatic';
import { restaurantParser } from '../../../utils/restaurantParser';

type EventsProps = TripProps & {
  events: EventType[];
  restaurants: EventType[];
};

const DashboardEvents: React.FC<EventsProps> = ({
  trip,
  events,
  restaurants,
}) => {
  const { userDb, isFetching } = useUserContext();
  const { isLoading } = useAuth0();

  if (isLoading || isFetching) return <Loading />;

  return (
    <DashboardComponent trips={userDb?.Trips || []}>
      <div>
        <TripNavigation trip={trip} />
        <EventsComponent
          events={events}
          trip={trip}
          restaurants={restaurants}
        />
      </div>
    </DashboardComponent>
  );
};

export const getStaticPaths = getStaticTripPaths;
export const getStaticProps = async ({ params }: any) => {
  const id = params.tripId;
  const trip = await getTrip(+id);
  try {
    const amadeusEvents = await getAmadeusEvents(trip.latitude, trip.longitude);
    const events = eventParser(amadeusEvents);
    try {
      const amadeusRestaurants = await getAmadeusRestaurants(
        trip.latitude,
        trip.longitude
      );
      const restaurants = restaurantParser(amadeusRestaurants);
      return {
        props: {
          trip,
          events,
          restaurants,
        },
      };
    } catch (error) {
      return {
        props: {
          trip,
          events,
          restaurants: [],
        },
      };
    }
  } catch (error) {
    console.log(error);
    return {
      props: {
        trip,
        events: [],
        restaurants: [],
      },
    };
  }
};

export default DashboardEvents;
