import { useLoginService } from '@shared/services/use-login.service.ts';
import { UserRegisterRequestDto } from '@core/models/User.ts';
import request from '@app/shared/services/axios.service.ts';
import { ApiPaths } from '@core/utils/api-paths.ts';
import { useMutation } from '@tanstack/react-query';

export function useRegisterService() {
  const { mutate } = useLoginService();

  function mutationFn(payload: UserRegisterRequestDto) {
    return request({
      url: ApiPaths.REGISTER,
      method: 'post',
      data: { ...payload },
    });
  }

  return useMutation({
    mutationFn,
    onSuccess: (_, user) => mutate(user),
  });
}
