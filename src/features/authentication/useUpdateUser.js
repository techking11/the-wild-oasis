import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUserUpdating } = useMutation({
    mutationFn: ({ password, fullName, avatar }) =>
      updateCurrentUser({ password, fullName, avatar }),

    onSuccess: ({ user }) => {
      toast.success('User account successfully created');
      queryClient.setQueriesData(['user'], user);
    },

    onError: (err) => toast.error(err.message),
  });
  return { updateUser, isUserUpdating };
}
