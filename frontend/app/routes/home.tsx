import { redirect } from "react-router";
import { TodoApp } from "~/TodoApp";
import type { Route } from "./+types/home";
import { toast } from "react-toastify";

export async function clientLoader() {
  const token = window.localStorage.getItem("user_token");
  if (!token) {
    throw redirect("/login");
  }

  const user = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(user)
  if (user.status === 401 || user.status === 403) {
    toast.error("Seu login expirou");
    window.localStorage.removeItem("user_token");
    throw redirect("/login");
  }
  if (user.status === 429) {
    toast.error("Muitas requisições, tente novamente mais tarde");
    return;
  }
  const data = await user.json();
  if (!data) {
    window.localStorage.removeItem("user_token");
    throw redirect("/login");
  }

  return {
    username: data.username as string,
  };
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Tarefas" }];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  if(!loaderData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-100 mb-6">
          Houve um erro ao carregar os dados do usuário.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-8 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-100 mb-6">
        Olá, {loaderData.username}
        <button
          className="ml-4 px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700 cursor-pointer"
          onClick={() => {
            window.localStorage.removeItem("user_token");
            window.location.href = "/login";
          }}
        >
          Sair
        </button>
      </h1>

      <TodoApp />
    </div>
  );
}
