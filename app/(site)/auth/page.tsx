'use client';

import { useState, useEffect, FC, useCallback } from 'react';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import { Input, Button, AuthSocialButton } from '../components';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';
import { AuthVariant } from '@/app/interfaces/types';
import AuthInputFields from '@/config/AuthInputFields';
import axios from 'axios';

const AuthForm: FC = () => {

  const [variant, setVariant] = useState<AuthVariant>('LOGIN');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const session = useSession();
  const router = useRouter();

  const toggleVariant = useCallback(() => {
    const v = variant === 'LOGIN' ? 'REGISTER' : 'LOGIN';
    setVariant(v);
  }, [variant]);

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
  
    if (variant === 'REGISTER') {
      axios.post('/api/register', data)
      .then(() => signIn('credentials', {
        ...data,
        redirect: false,
      }))
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials!');
        }

        if (callback?.ok) {
          router.push('/conversations')
        }
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => setIsLoading(false))
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false
      })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials!');
        } else {
          toast.success('Logged In');
          router.push('/');
        }
      })
      .finally(() => setIsLoading(false))
    }
  }

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: true })
      .then((callback) => {
        callback?.error && toast.error('Invalid Credentials');
        if (!callback?.error) {
          toast.success('Logged In');
          router.push('/');
        }
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/')
    }
  }, [session?.status, router]);

  return (
    <div className="col-v min-h-screen py-12 sm:px-6 lg:px-8 bg-gray-100">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <Image height="48" width="48" alt="Logo" className="h-12 w-15.5 mx-auto" src="/assets/images/logo.webp" />
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
    </div>
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form action="" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {AuthInputFields.map((field) => (
            (!field.showOnRegister || variant === 'REGISTER') && (
              <Input
                key={field.id}
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                {...field}
              />
            )
          ))}
          <div>
            <Button disabled={isLoading} isFullWidth type="submit">
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 col-h">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex row-h text-sm">
              <span className="bg-white px-2 text-gray-500 -mt-2.5">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            {[
              { icon: BsGithub, provider: 'github' },
              { icon: BsGoogle, provider: 'google' }
            ].map((action, index) => (
              <AuthSocialButton
                key={index}
                icon={action.icon}
                onClick={() => socialAction(action.provider)}
              />
            ))}
          </div>
        </div>
        <div className="row-h gap-2 text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === 'LOGIN' ? 'New to this website?' : 'Already have an account?'}
          </div>
          <div
            onClick={toggleVariant}
            className="pointer text-sky-500"
          >
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AuthForm;
