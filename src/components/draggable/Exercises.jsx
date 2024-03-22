import { forwardRef } from 'react';

const ExercisesDraggable = forwardRef(({ children }, ref) => {
    return (
        <ul
            ref={ref}
            className="min-w-64 rounded-lg border-2 border-neutral-400 md:w-5/6 md:min-w-72"
        >
            {children}
        </ul>
    );
});

export default ExercisesDraggable;
