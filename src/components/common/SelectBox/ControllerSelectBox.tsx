import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

import { ExercisePostFormInput } from '#/components/exercise/post/ExerciseForm';

import SelectBox from '#/components/common/selectBox/SelectBox';

interface ControllerSelectBoxProps {
  name: keyof ExercisePostFormInput;
  control: Control<ExercisePostFormInput, any>;
  label: string;
  options: { value: string; name: string }[];
  selectId: string;
  selectName: string;
  selectClassName: string;
  placeHolder: string;
  error?: FieldError;
}

const ControllerSelectBox = ({
  name,
  control,
  label,
  options,
  selectId,
  selectName,
  selectClassName,
  placeHolder,
  error,
  ...props
}: ControllerSelectBoxProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <SelectBox
          {...field}
          label={label}
          options={options}
          selectId={selectId}
          selectName={selectName}
          className="flex-row items-center"
          selectClassName={selectClassName}
          placeHolder={placeHolder}
          errorMessage={error?.message}
          value={field.value ?? undefined}
          {...props}
        />
      )}
    />
  );
};

export default ControllerSelectBox;
