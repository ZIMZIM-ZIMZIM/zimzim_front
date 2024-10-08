import React from 'react';

import Button from '#components/common/Button';

import GoogleIcon from '#assets/icon/google.svg?react';
import AppleIcon from '#assets/icon/apple.svg?react';

const SocialLoginButton = () => (
  <div className="flex flex-row gap-4 justify-between">
    {['Google', 'Apple'].map((ele: string) => (
      <Button
        key={ele}
        className="pl-4 flex flex-1 flex-row items-center gap-2 border-1 border-gray-light h-12 rounded-lg text-black text-sm text-left"
      >
        {ele === 'Google' && <GoogleIcon className="w-6 h-6" />}
        {ele === 'Apple' && <AppleIcon className="w-6 h-6" />}
        Login with {ele}
      </Button>
    ))}
  </div>
);

export default SocialLoginButton;
