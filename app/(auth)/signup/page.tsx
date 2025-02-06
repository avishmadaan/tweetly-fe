'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/components/ui/input';
import VisibilityButton from '@/components/ui/visibility-button';
import { useAuth } from '@/lib/authContext';
import OrLoginWith from '@/components/or-login-with';

type RegistrationData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
   
  } = useForm<RegistrationData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { isAuthenticated, signUp } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('dashboard/home');
    }
  }, [isAuthenticated, router]);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);
  // const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible((prev) => !prev);

  const onSubmit = async (data: RegistrationData) => {
    setLoading(true);
    await signUp(data);
    setLoading(false);
  };

  return (
    <div className=" md:w-[30%] sm:min-w-[350px]">
      <div className="p-4  border rounded-md shadow-[1px_1px_2px_rgba(255,255,255,0.1)] ">
        <h1 className="text-3xl font-bold  mb-2">Create an account</h1>
        <p className="text-gray-500  mb-4">
          Enter your email below to create your account
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <Input
              type="text"
              {...register('name', {
                required: 'Name is Required',
                minLength: { value: 3, message: 'Name should be at least 3 characters' },
              })}
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <Input
              type="email"
              {...register('email', {
                required: 'Email is Required',
                pattern: {
                  value: /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: 'Please enter a valid email address',
                },
              })}
              placeholder="m@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <Input
                type={isPasswordVisible ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password is Required',
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                    message:
                      'Password must contain at least one uppercase, lowercase, number, and special character.',
                  },
                  minLength: { value: 8, message: 'Minimum length is 8' },
                })}
                placeholder="Enter password"
              />
              <VisibilityButton
                isPasswordVisible={isPasswordVisible}
                togglePasswordVisibility={togglePasswordVisibility}
              />
            </div>
            <div className="w-full flex flex-wrap">
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
          </div>

          {/* <div>
            <label className="block text-sm font-medium">Confirm Password</label>
            <div className="relative">
              <Input
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) => value === watch('password') || 'Passwords do not match',
                })}
                placeholder="Confirm password"
              />
              <VisibilityButton
                isPasswordVisible={isConfirmPasswordVisible}
                togglePasswordVisibility={toggleConfirmPasswordVisibility}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div> */}

          <Button
            className="w-full py-3"
            variant="primary"
            type="submit"
            disabled={!isValid}
            loading={loading}
          >
            Signup
          </Button>
        </form>

        <OrLoginWith />

        <p className="text-center text-sm mt-4">
          Already have an account? <Link href="/login" className="underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
