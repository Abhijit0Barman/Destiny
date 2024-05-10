import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../pages/api-client";
import { useAppContext } from "../contexts/AppContext";

export const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const mutation = useMutation(apiClient.signout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Sign out!", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleLogOut = () => {
    mutation.mutate();
  };
  return (
    <div
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-500 "
      onClick={handleLogOut}
    >
      Sign Out
    </div>
  );
};
