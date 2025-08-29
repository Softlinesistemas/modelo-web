import { useMutation, useQueryClient } from "react-query";
import { registerFriendship } from "@/services/api/user";
import { Amizade } from "@/types/User";
import { friendshipKeys } from "../queries/useFriendship";

export function useRegisterFriendship() {
  const queryClient = useQueryClient();

  return useMutation<Amizade, Error, string | number>(
    registerFriendship,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(friendshipKeys.list());

        if (data.SolicitanteId) {
          queryClient.invalidateQueries(
            friendshipKeys.detail(String(data.SolicitanteId))
          );
        }
        if (data.PerfilAmizadeId1 && data.PerfilAmizadeId2) {
          queryClient.invalidateQueries(
            friendshipKeys.between(data.PerfilAmizadeId1, data.PerfilAmizadeId2)
          );
        }
      },
    }
  );
}
