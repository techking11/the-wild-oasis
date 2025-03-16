import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export default function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signupApi({ email, password, fullName }),

    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from user' email address"
      );
    },
  });

  return { signup, isLoading };
}
