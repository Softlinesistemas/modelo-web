'use client'
import React, { useState } from 'react'
import { Input } from '@/utils/ui/Input'
import { Label } from '@/utils/ui/Label'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { useLogin } from '@/hooks/mutations/useLogin'

export const LoginForm = () => {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { mutate: userLogin, isLoading: loginLoading } = useLogin();

  const onClickLogin = (e: React.FormEvent) => {
    e.preventDefault();
    userLogin({ Usuario: usuario, Senha: senha });
  };

  return (
    <form onSubmit={onClickLogin} className="space-y-3">
      <div>
        <Label>Usuário</Label>
        <Input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder="Digite seu usuário"
          className="text-black mt-2"
        />
      </div>

      <div>
        <Label>Senha</Label>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
            className="text-black mt-2"
          />
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-black"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-green-800 text-white py-2 rounded-full font-semibold hover:bg-green-900 transition disabled:opacity-50"
        disabled={!usuario || !senha || loading}
      >
        ACESSAR
      </button>
    </form>
  )
}
