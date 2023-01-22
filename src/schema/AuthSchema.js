import joi from 'joi'

export const userSchema = joi.object({
    nome: joi.string().required(),
    email: joi.string().email().required(),
    senha: joi.string().min(6).required(),
    confirmeSenha: joi.any().valid(joi.ref("senha")).required(),
})

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  senha: joi.string().required(),
});