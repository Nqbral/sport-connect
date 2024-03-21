import WorkoutForm from '../../components/WorkoutForm';
import ClassicPage from '../../layouts/ClassicPage';
import { PAGE_SELECTED } from '../../layouts/NavBar';

export default function CreateWorkoutPage() {
    return (
        <>
            <ClassicPage
                pageSelectedNavbar={PAGE_SELECTED.WORKOUT}
                linkToBackButton={'/workout'}
            >
                <section
                    id="create-workout-page"
                    className="flex w-full flex-col items-center gap-3"
                >
                    <h2 className="text-xl font-bold">
                        Création d&apos;un programme
                    </h2>

                    <WorkoutForm />
                </section>
            </ClassicPage>
        </>
    );
}
