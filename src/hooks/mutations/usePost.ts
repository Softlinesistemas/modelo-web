import { useMutation, useQueryClient, UseMutationOptions } from "react-query";
import { createPost } from "@/services/api/Post";
import { Publicacoes, CreatePostInput } from "@/types/Posts";
import { postKeys } from "../queries/usePosts";

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation<Publicacoes, Error, CreatePostInput>(
    createPost,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(postKeys.list());
        if (data.CodUsuario) {
          queryClient.invalidateQueries(postKeys.detail(String(data.CodUsuario)));
        }
      },
    }
  );
}

