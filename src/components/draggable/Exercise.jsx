import { faGripVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forwardRef } from 'react';

const ExerciseDraggable = forwardRef(
    (
        {
            dragHandleProps,
            snapshot,
            exercise,
            index,
            deleteExercise,
            editExercise,
            ...props
        },
        ref,
    ) => {
        return (
            <li
                ref={ref}
                {...props}
                className={
                    'p-2 ' +
                    (index % 2 == 0 ? 'bg-neutral-200 ' : 'bg-neutral-300 ') +
                    (snapshot.isDragging ? 'shadow-md shadow-neutral-500' : '')
                }
            >
                <div className="flex flex-col justify-between gap-2">
                    <div className="flex flex-row justify-between">
                        <span className="italic text-neutral-500">
                            {exercise.type == 'exercise'
                                ? index + 1 + ' - Exercice'
                                : index + 1 + ' - Repos'}
                        </span>
                        <div className="flex flex-row gap-2">
                            <button onClick={() => editExercise(index)}>
                                <FontAwesomeIcon
                                    icon={faPen}
                                    className="transition-colors duration-300 hover:text-primary-600"
                                />
                            </button>
                            <button onClick={() => deleteExercise(index)}>
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className="hover:text-red-600 transition-colors duration-300"
                                />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-row gap-4">
                        <span {...dragHandleProps}>
                            <FontAwesomeIcon icon={faGripVertical} />
                        </span>
                        {exercise.type == 'exercise' ? (
                            <div className="flex flex-col">
                                <div>Exercice : {exercise.exercise.name}</div>
                                <div>
                                    Nombre de séries : {exercise.nbSeries}
                                </div>
                                <div>
                                    Nombre de répétitions : {exercise.nbReps}
                                </div>
                                <div>Temps de repos : {exercise.timeRest}s</div>
                            </div>
                        ) : (
                            <div>{'Repos de ' + exercise.timeRest + 's'}</div>
                        )}
                    </div>
                </div>
            </li>
        );
    },
);

export default ExerciseDraggable;
