import { useLocalStorage } from '@uidotdev/usehooks';
import { LocalStorageKeys } from '@core/utils/local-storage-keys.ts';
import { useAuthStore } from '@app/shared/stores/auth-store.ts';

export function useLoadSession() {
  const [token] = useLocalStorage(LocalStorageKeys.ACCESS_TOKEN);
  const setIsLoggedIn = useAuthStore(({ setIsLoggedIn }) => setIsLoggedIn);
  setIsLoggedIn(!!token);
}
