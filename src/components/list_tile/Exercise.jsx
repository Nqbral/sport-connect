export default function ExerciseListTile({ exercise, index }) {
    return (
        <li
            className={
                'p-2 ' +
                (index % 2 == 0 ? 'bg-neutral-200 ' : 'bg-neutral-300 ')
            }
        >
            <div className="flex flex-col justify-between gap-2">
                <div>
                    <span className="italic text-neutral-500">
                        {exercise.type == 'exercise'
                            ? index + 1 + ' - Exercice'
                            : index + 1 + ' - Repos'}
                    </span>
                </div>
                <div className="flex flex-row gap-4">
                    {exercise.type == 'exercise' ? (
                        <div className="flex flex-col">
                            <div>Exercice : {exercise.name}</div>
                            <div>Nombre de séries : {exercise.nbSeries}</div>
                            <div>Nombre de répétitions : {exercise.nbReps}</div>
                            <div>Temps de repos : {exercise.timeRest}s</div>
                        </div>
                    ) : (
                        <div>{'Repos de ' + exercise.timeRest + 's'}</div>
                    )}
                </div>
            </div>
        </li>
    );
}
