import WorkoutForm from '../../components/WorkoutForm';
import ClassicPage from '../../layouts/ClassicPage';
import { PAGE_SELECTED } from '../../layouts/NavBar';

export default function CreateWorkoutPage() {
    return (
        <>
            <ClassicPage
                pageSelectedNavbar={PAGE_SELECTED.WORKOUT}
                linkToBackButton={'/workout'}
                sectionId={'section-create-workout-page'}
            >
                <h2 className="text-xl font-bold">
                    Création d&apos;un programme
                </h2>

                <WorkoutForm isCreation={true} editedWorkout={null} />
            </ClassicPage>
        </>
    );
}
