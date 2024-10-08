import React, { useState } from 'react';

import ExerciseTable from '#/components/exercise/list/ExerciseTable';
import ButtonGroup from '#/components/exercise/list/ButtonGroup';

const ExerciseListPage = () => {
  const [checkedExercise, setCheckedExercise] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  return (
    <div className="flex flex-col items-center">
      <div className="w-4/5 flex flex-col gap-8">
        <ButtonGroup checkedExercise={checkedExercise} page={page} />
        <ExerciseTable
          checkedExercise={checkedExercise}
          setCheckedExercise={setCheckedExercise}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default ExerciseListPage;
