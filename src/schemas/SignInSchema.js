import { z } from 'zod';

export const SignInSchema = z.object({
    email: z.string()
        .min(1, "Bu alan boş bırakılamaz") 
        .email("Geçersiz e-mail adresi"), 
    password: z.string()
        .min(1, "Bu alan boş bırakılamaz"),
});
