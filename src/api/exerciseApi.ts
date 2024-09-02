import {
  Exercise,
  GetExercisePayload,
  PostExercisePayload,
} from '#/stores/exercise/type';
import { AxiosResponse } from 'axios';
import { baseApi } from './baseApi';

export const exerciseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getExercise: build.query<Exercise[], GetExercisePayload>({
      query: (payload) => ({
        url: '/exercise',
        method: 'GET',
        params: {
          id: payload.userId,
          startDate: payload.startDate,
          endDate: payload.endDate,
        },
      }),
      providesTags: (result, error, arg) =>
        result
          ? result.map((exercise) => ({ type: 'Exercise', id: exercise._id }))
          : [{ type: 'Exercise', id: 'LIST' }],
    }),
    getExerciseList: build.query<
      {
        currentPage: number;
        items: Exercise[];
        totalItems: number;
        totalPages: number;
      },
      { userId: string; page: number; limit: number }
    >({
      query: (payload) => ({
        url: '/exercise/list',
        method: 'GET',
        params: {
          id: payload.userId,
          page: payload.page,
          limit: payload.limit,
        },
      }),
      providesTags: (result, error, arg) =>
        result
          ? result.items.map((exercise) => ({
              type: 'Exercise',
              id: exercise._id,
            }))
          : [{ type: 'Exercise', id: 'LIST' }],
    }),
    postExercise: build.mutation<
      Pick<AxiosResponse, 'data'>,
      PostExercisePayload
    >({
      query: (payload) => ({
        url: '/exercise',
        method: 'POST',
        data: payload,
      }),
    }),
    deleteExerciseDetail: build.mutation({
      query: (payload) => ({
        url: '/exercise/details',
        method: 'POST',
        data: {
          exerciseDetails: payload,
        },
      }),
      invalidatesTags: (result, error, { exerciseId }) => [
        { type: 'Exercise', id: exerciseId },
      ],
    }),
  }),
});

export const {
  useGetExerciseQuery,
  useGetExerciseListQuery,
  usePostExerciseMutation,
  useDeleteExerciseDetailMutation,
} = exerciseApi;
