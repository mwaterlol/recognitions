import { z } from "zod";

export const RegisterSchema = z.object({
    email: z.string().email({ message: "Некорректный e-mail" }),
    password: z
        .string()
        .min(3, { message: "Минимальная длина пароль 3 символа" })
        .max(20),
    username: z.string().min(1, { message: "Необходимо ввести имя" }),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
