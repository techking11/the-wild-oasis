import { useQuery } from '@tanstack/react-query';

export default function useTodayActivity() {
  const { isLoading, data } = useQuery();
}
