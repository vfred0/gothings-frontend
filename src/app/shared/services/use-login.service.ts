import { LocalStorageKeys } from '@core/utils/local-storage-keys.ts';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useAuthStore } from '@app/shared/stores/auth-store.ts';
import { UserLoginRequestDto } from '@core/models/user.ts';
import { ApiPaths } from '@core/utils/api-paths.ts';
import { useMutation } from '@tanstack/react-query';
import request from '@app/shared/services/axios.service.ts';

export function useLoginService() {
  const [_, setAccessToken] = useLocalStorage<string>(
    LocalStorageKeys.ACCESS_TOKEN,
  );

  const setIsLoggedIn = useAuthStore(({ setIsLoggedIn }) => setIsLoggedIn);

  function mutationFn(user: UserLoginRequestDto) {
    return request({
      url: ApiPaths.LOGIN,
      method: 'post',
      data: { ...user },
    })
  }

  function onLoginSuccess(token: string) {
    setAccessToken(token);
    setIsLoggedIn(true);
  }

  return useMutation({
    mutationFn,
    onSuccess: ({ token }) => onLoginSuccess(token),
  });
}
