import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import TotalChart from '#components/dashboard/TotalChart';
import ExerciseChart from '#/components/dashboard/ExerciseChart';
import WaterChart from '#/components/dashboard/WaterChart';
import ContentBox from '#/components/common/ContentBox';
import Button from '#/components/common/Button';

import { useGetUserInfoQuery } from '#/api/services/userApi';
import { useGetExerciseQuery } from '#/api/services/exerciseApi';

import FORMAT from '#/constants/format';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [totalDuration, setTotalDuration] = useState(0);

  const { data: userInfo, isLoading: isUserInfoLoading } =
    useGetUserInfoQuery();

  const { data: exerciseData, isLoading: isExerciseLoading } =
    useGetExerciseQuery(
      {
        userId: userInfo?.id ?? '',
        startDate: dayjs().subtract(7, 'day').format(FORMAT.DATE),
        endDate: dayjs().format(FORMAT.DATE),
      },
      {
        skip: !userInfo?.id,
        refetchOnMountOrArgChange: true,
      },
    );

  useEffect(() => {
    if (exerciseData?.length) {
      setTotalDuration(
        exerciseData.reduce(
          (acc, cur) => acc + parseFloat(cur.totalDuration),
          0,
        ),
      );
    }
  }, [exerciseData]);

  if (isUserInfoLoading || isExerciseLoading) {
    return <div>loading~</div>;
  }

  return (
    <div className="flex flex-col gap-4 px-10 h-full">
      <p className="text-lg h-1/12">
        ✅ {userInfo?.nickname}님, 이번주 {exerciseData?.length}회{' '}
        {totalDuration}분 운동했어요
      </p>
      {exerciseData?.length ? (
        <div className="flex flex-col gap-6 h-11/12">
          <div className="flex flex-row justify-between items-cetner gap-6">
            <TotalChart />
            <ExerciseChart />
          </div>
          <WaterChart />
        </div>
      ) : (
        <ContentBox className="w-full h-full text-lg">
          <p>운동 기록을 추가하고 일주일간 얼마나 운동했는지 알아보세요</p>
          <div className="flex flex-col items-center">
            <div>image</div>
            <Button
              className="bg-primary w-[120px] h-12 rounded-lg text-white font-bold text-md border-1 border-gray-light"
              onClick={() => {
                navigate('/exercise/post');
              }}
            >
              추가
            </Button>
          </div>
        </ContentBox>
      )}
    </div>
  );
};

export default DashboardPage;
