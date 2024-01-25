"use client";
import users_list from "@/api/users";
import AutoCompleteCustom from "@/components/AutoCompleteCustom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  pessoa: z.number(),
  telefone: z
    .string()
    .min(11, { message: "Número inválido, mín. 11 dígitos" })
    .max(15, { message: "Número inválido, máx. 15 dígitos" }),
  email: z.string().email("Email inválido"),
});

const getList = async () => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(users_list);
    }, 1000);
  });
};

export default function Home() {
  const methods = useForm({
    resolver: zodResolver(schema),
  });

  const { errors } = methods.formState;

  const onSubmit = (data) => console.log(data);

  return (
    <main>
      <div className="flex items-center justify-center h-screen w-full">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="max-w-[400px] border-2 border-blue-300 rounded-xl p-5 w-full"
          >
            <h1 className="text-center mb-5 font-bold text-2xl uppercase">
              Cadastro
            </h1>
            <AutoCompleteCustom
              id="user-name"
              name="pessoa"
              label="Nome"
              getMethod={getList}
              required
            ></AutoCompleteCustom>
            <TextField
              className="mt-5 w-full"
              label="Telefone"
              placeholder="(00) 00000-0000"
              required
              {...methods.register("telefone")}
            ></TextField>
            {errors.telefone && (
              <p className=" text-red-500">{errors.telefone.message}</p>
            )}
            <TextField
              className="mt-5 w-full"
              label="Email"
              type="email"
              placeholder="Email"
              required
              {...methods.register("email")}
            />
            {errors.email && (
              <p className=" text-red-500">{errors.email.message}</p>
            )}
            <Button className="mt-5 w-full" variant="outlined" type="submit">
              Enviar
            </Button>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}
