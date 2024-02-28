import NavBar, { PAGE_SELECTED } from '../layouts/NavBar';

export default function FeedPage() {
    return <NavBar pageSelected={PAGE_SELECTED.FEED} />;
}
