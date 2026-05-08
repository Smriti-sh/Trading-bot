import {z} from "zod";

export const SignUpSchema = z.object({
    username : z.string().min(3).max(80),
    password : z.string().min(6).max(10)
});