import React from 'react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import Button from '#components/common/Button';

import {
  useDeleteExerciseDetailMutation,
  useGetExerciseListQuery,
} from '#/api/services/exerciseApi';
import { useGetUserInfoQuery } from '#/api/services/userApi';
import { ExerciseDetail } from '#/api/types';

interface ButtonGroupProps {
  checkedExercise: string[];
  page: number;
}

const ButtonGroup = ({ checkedExercise, page }: ButtonGroupProps) => {
  const isDeleteDisabled = checkedExercise.length === 0;

  const navigate = useNavigate();

  const [deleteExerciseDetail] = useDeleteExerciseDetailMutation();
  const { data: userInfo } = useGetUserInfoQuery();
  const { data: exerciseData } = useGetExerciseListQuery(
    {
      userId: userInfo?.id ?? '',
      page,
      limit: 10,
    },
    { skip: !userInfo?.id },
  );

  const handleDeleteExercise = async () => {
    if (checkedExercise.length && exerciseData && exerciseData?.items.length) {
      let temp = checkedExercise.flatMap((exercise) =>
        exerciseData.items.filter((item) =>
          item.detail.find((ele) => ele._id === exercise),
        ),
      );

      const ids = Array.from(new Set(temp.map((ele) => ele?._id)));

      const payload = ids.map((exerciseId) => {
        const exercise = temp.find((exercise) => exercise._id === exerciseId);

        const detailIds = exercise?.detail
          .filter((detail: ExerciseDetail) =>
            checkedExercise.includes(detail._id ?? ''),
          )
          .map((detail: ExerciseDetail) => detail._id)
          .filter((id): id is string => !!id);

        return {
          exerciseId,
          detailIds: detailIds ?? [],
        };
      });
      try {
        await deleteExerciseDetail(payload).unwrap();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex flex-row justify-end gap-4">
      <Button
        className={twMerge(
          `bg-red-500 w-32 h-12 rounded-lg text-white font-bold text-md border-1 border-gray-light
          ${isDeleteDisabled && 'cursor-not-allowed'}`,
        )}
        disabled={isDeleteDisabled}
        onClick={handleDeleteExercise}
      >
        삭제
      </Button>
      <Button
        className="bg-primary w-32 h-12 rounded-lg text-white font-bold text-md border-1 border-gray-light"
        onClick={() => navigate('/exercise/post')}
      >
        추가
      </Button>
    </div>
  );
};

export default ButtonGroup;
