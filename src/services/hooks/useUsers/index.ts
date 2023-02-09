import { useQuery } from "react-query";
import { api } from "../../api";

interface IUserProps {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export async function getUsers(): Promise<IUserProps[]> {
  const { data } = await api.get("users");

  const users = data.users.map((user: IUserProps) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  return users;
}

export function useUsers() {
  return useQuery("users", getUsers, {
    staleTime: 1000 * 5,
  });
}
