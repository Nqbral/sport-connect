import NavBar, { PAGE_SELECTED } from '../layouts/NavBar';
import ProfileBar from '../layouts/ProfileBar';

export default function FeedPage() {
    return (
        <>
            <ProfileBar />
            <NavBar pageSelected={PAGE_SELECTED.FEED} />
        </>
    );
}
