import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from '#components/common/Button';
import Input from '#/components/common/input/Input';

import { usePostSignupMutation } from '#/api/services/authApi';

import MESSAGE from '#/constants/message';
import ROUTE from '#/constants/route';
import { PRIMARY_BUTTON } from '#/constants/style';

import EyeSlashIcon from '#assets/icon/eye-slash-regular.svg?react';
import EyeIcon from '#assets/icon/eye-regular.svg?react';

export type SignUpFormInput = {
  id: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
};

const SignupForm = () => {
  const [postSignup, { isSuccess }] = usePostSignupMutation();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const schema = yup
    .object()
    .shape({
      id: yup
        .string()
        .matches(/^[A-Za-z0-9]+$/i, MESSAGE.FORM.SIGNUP.ID.VALIDATION)
        .required(MESSAGE.FORM.SIGNUP.ID.VALIDATION),
      nickname: yup
        .string()
        .max(10, MESSAGE.FORM.SIGNUP.NICKNAME.MAX_LENGTH)
        .matches(/^[A-Za-z0-9]+$/i, MESSAGE.FORM.SIGNUP.NICKNAME.VALIDATION)
        .required(MESSAGE.FORM.REQUIRED('닉네임을')),
      password: yup
        .string()
        .required(MESSAGE.FORM.REQUIRED('비밀번호를'))
        .min(8, MESSAGE.FORM.SIGNUP.PASSWORD.MIN_LENGTH),
      passwordConfirm: yup
        .string()
        .oneOf(
          [yup.ref('password')],
          MESSAGE.FORM.SIGNUP.PASSWORD_CONFIRM.NOT_MATCH,
        )
        .required(MESSAGE.FORM.REQUIRED('비밀번호를')),
    })
    .required();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<SignUpFormInput>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (name === 'password') {
        trigger('passwordConfirm');
      }
      trigger(name);
    });

    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  const onSubmit = async (data: SignUpFormInput) => {
    try {
      await postSignup(data);

      if (isSuccess) {
        navigate(ROUTE.LOGIN);
      } else {
        console.log('다시 한번 시도해 주세요');
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

  return (
    <form className="flex flex-col gap-12" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <Input
          label="ID"
          placeholder={MESSAGE.FORM.REQUIRED('ID를')}
          errorMessage={errors.id?.message}
          {...register('id')}
        />
        <Input
          label="Nickname"
          placeholder={MESSAGE.FORM.REQUIRED('닉네임을')}
          errorMessage={errors.nickname?.message}
          {...register('nickname')}
        />
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder={MESSAGE.FORM.REQUIRED('비밀번호를')}
          errorMessage={errors.password?.message}
          {...register('password')}
        >
          <div
            className="absolute inset-y-4 right-4"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeIcon width={16} />
            ) : (
              <EyeSlashIcon width={16} />
            )}
          </div>
        </Input>
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder={MESSAGE.FORM.REQUIRED('비밀번호를 한 번 더')}
          errorMessage={errors.passwordConfirm?.message}
          {...register('passwordConfirm')}
        >
          <div
            className="absolute inset-y-4 right-4"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? (
              <EyeIcon width={16} className="text-gray-dark" />
            ) : (
              <EyeSlashIcon width={16} />
            )}
          </div>
        </Input>
      </div>
      <Button type="submit" className={PRIMARY_BUTTON}>
        Sign Up
      </Button>
    </form>
  );
};
export default SignupForm;
