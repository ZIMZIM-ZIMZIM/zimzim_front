import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import Button from '#/components/common/Button';
import ContentBox from '#/components/common/ContentBox';

import { useGetExerciseDetailQuery } from '#/api/services/exerciseApi';

const ExerciseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useGetExerciseDetailQuery(id ?? '');

  return (
    <div className=" flex flex-row justify-center">
      <div className="flex flex-col gap-8 w-2/5">
        <div className="flex justify-end">
          <Button
            className="bg-red-500 w-[120px] h-12 rounded-lg text-white font-bold text-md border-1 border-gray-light"
            onClick={() => navigate(`/exercise/update/${id}`)}
          >
            수정
          </Button>
        </div>
        <div className="flex justify-center w-full">
          <ContentBox className="rounded-2xl w-full">
            <h1 className="text-center pb-8">
              🏋️‍♀️ {dayjs(data?.date).format('YYYY-MM-DD')} 운동기록 🏋️‍♀️
            </h1>
            <hr />
            <div className="flex justify-between">
              <div className="flex flex-col gap-9 pt-8">
                <p>PT 여부</p>
                <p>종류</p>
                <p>시간(분)</p>
                <p>강도</p>
              </div>
              {data && (
                <div className="flex flex-col gap-9 pt-8">
                  <p>{data.isPT === 'Y' ? 'PT' : '개인운동'}</p>
                  <p>{data.detail[0]?.type || '정보 없음'}</p>
                  <p>
                    {data.detail[0]?.duration
                      ? `${data.detail[0]?.duration}분`
                      : '정보 없음'}
                  </p>
                  <p>{data.detail[0]?.force || '정보 없음'}</p>
                </div>
              )}
            </div>
          </ContentBox>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetailPage;
