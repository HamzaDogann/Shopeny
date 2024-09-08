import { z } from 'zod';

const passwordSchema = z.string()
    .min(8, 'Şifre en az 8 karakter olmalı')
    .max(16, 'Şifre en fazla 16 karakter olabilir')
    .regex(/[A-Z]/, 'Şifre en az bir büyük harf içermeli')
    .regex(/[a-z]/, 'Şifre en az bir küçük harf içermeli')
    .regex(/[0-9]/, 'Şifre en az bir rakam içermeli')

const phoneNumberSchema = z.string()
    .min(1, 'Bir telefon numarası girin')
    .length(10,'Telefon numarasını tamamlayın')

const emailSchema = z.string()
    .email('Geçerli bir e-mail adresi girin');

const nameSchema = z.string()
    .min(5, 'Ad Soyad en az 5 karakter olmalı')
    .max(30, 'Ad Soyad en fazla 30 karakter olabilir');

const genderSchema = z.enum(['Erkek', 'Kadın'], { errorMap: () => ({ message: 'Cinsiyet seçilmelidir' }) });

const SignUpSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    phone: phoneNumberSchema,
    gender: genderSchema,
});

export default SignUpSchema;
