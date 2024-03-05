import LinkButton from '../../components/buttons/LinkButton';
import ClassicPage from '../../layouts/ClassicPage';
import { PAGE_SELECTED } from '../../layouts/NavBar';

export default function WorkoutPage() {
    return (
        <ClassicPage pageSelectedNavbar={PAGE_SELECTED.WORKOUT}>
            <section
                id="workout-page"
                className="flex w-full flex-col items-center gap-2"
            >
                <h2 className="text-xl font-bold">Musculation</h2>
                <LinkButton
                    buttonText={'Créer un programme'}
                    linkTo={'/workout/create'}
                />
            </section>
        </ClassicPage>
    );
}
