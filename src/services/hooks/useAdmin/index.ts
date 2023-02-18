import { useQuery, UseQueryOptions } from "react-query";
import { api } from "../../api";

type PostAdminResponse = {
  token: string;
};

type SignInProps = {
  email: string;
  password: string;
};

export async function getAdmin({
  email,
  password,
}: SignInProps): Promise<PostAdminResponse | any> {
  try {
    const { data, request, headers } = await api.post("admin", {
      email,
      password,
    });

    const tokenData = headers["token"];

    const response = {
      token: tokenData,
    }

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function UseAdmin({email, password}: SignInProps) {
  const response = getAdmin({email, password});
  return response;
}
