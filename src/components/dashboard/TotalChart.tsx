import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import dayjs from 'dayjs';

import { AppDispatch, RootState } from '#/stores/store';
import { getExercise } from '#/stores/exercise/action';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const TotalChart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const exerciseData = useSelector(
    (state: RootState) => state.exercise?.exercise,
  );
  const userId = useSelector((state: RootState) => state.user.user?.id);
  const dateRagne = Array.from({ length: 7 }, (_, i) =>
    dayjs().subtract(6, 'day').add(i, 'day').format('YYYY-MM-DD'),
  );

  useEffect(() => {
    if (userId) {
      dispatch(
        getExercise({
          userId: userId,
          startDate: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
          endDate: dayjs().format('YYYY-MM-DD'),
        }),
      );
    }
  }, [dispatch, userId]);

  const data = {
    labels: dateRagne,
    datasets: [
      {
        data: dateRagne.map((date) => {
          const filter = exerciseData?.filter(
            (exercise) => dayjs(exercise.date).format('YYYY-MM-DD') === date,
          );

          if (filter?.length > 0) {
            return filter[0].totalDuration;
          } else {
            return '0';
          }
        }),
        fill: false,
        borderColor: '#98abf9',
        pointStyle: false,
      },
    ],
  };

  const options = {
    responsive: true,
    // maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      // title: {
      //   display: true,
      //   text: 'Total workout volume',
      //   color: 'black',
      //   align: 'start',
      //   position: 'top',
      // },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        min: 0,
        max: 120,
      },
    },
  };

  return (
    <div className="w-2/3 bg-white rounded-lg border-1 border-gray-light py-2 px-4 cursor-pointer">
      <p className="text-sm font-bold pb-2">Total workout volume</p>
      <Line
        data={data}
        options={options}
        onClick={() => {
          navigate('/exercise');
        }}
      />
    </div>
  );
};

export default TotalChart;
