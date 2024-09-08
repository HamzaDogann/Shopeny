import { z } from 'zod';

export const SignInSchema = z.object({
    email: z.string()
        .min(1, "Bu alan boş bırakılamaz") // E-posta alanının boş olmaması gerektiğini belirler
        .email("Geçersiz e-mail adresi"), // Geçerli bir e-posta formatı doğrulaması
    password: z.string()
        .min(1, "Bu alan boş bırakılamaz"), // Şifre alanının boş olmaması gerektiğini belirler
});
