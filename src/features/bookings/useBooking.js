import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/apiBookings';
import { useParams } from 'react-router-dom';

export default function useBooking() {
  const { bookingId } = useParams();
  // console.log(bookingId);

  const {
    isLoading,
    error,
    data: booking,
  } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(bookingId),
  });

  // console.log(booking);

  return { isLoading, error, booking };
}
