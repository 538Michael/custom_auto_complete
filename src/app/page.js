"use client";
import getUsers from "@/api/users";
import CustomAutoComplete from "@/components/CustomAutoComplete";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { IMaskMixin } from "react-imask";
import { z } from "zod";

const schema = z.object({
  pessoa: z.number(),
  telefone: z.string().refine((data) => /\(\d{2}\) \d{4,5}-\d{4}/.test(data), {
    message: "Telefone inválido",
  }),
  email: z.string().email("Email inválido"),
});

export default function Home() {
  const methods = useForm({
    resolver: zodResolver(schema),
  });

  const { errors } = methods.formState;

  const onSubmit = (data) => console.log(data);

  const MaskTextField = IMaskMixin(({ ...props }) => (
    <TextField {...props} {...methods.register(props?.name)} />
  ));

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
            <CustomAutoComplete
              id="pessoa_nome"
              name="pessoa"
              label="Nome"
              getMethod={getUsers}
              noOptionsText="Nenhum resultado encontrado"
              required
            ></CustomAutoComplete>
            <MaskTextField
              className="mt-5 w-full"
              label="Telefone"
              mask="(00) 00000-0000"
              lazy={false}
              name="telefone"
              required
            ></MaskTextField>
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
