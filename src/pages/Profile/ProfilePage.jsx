import NavBar, { PAGE_SELECTED } from '../../layouts/NavBar';
import ProfileBar from '../../layouts/ProfileBar';

export default function ProfilePage() {
    return (
        <>
            <ProfileBar />
            <NavBar pageSelected={PAGE_SELECTED.PROFILE} />
        </>
    );
}
