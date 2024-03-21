import NavBar from './NavBar';
import ProfileBar from './ProfileBar';

export default function ClassicPage({
    children,
    pageSelectedNavbar,
    linkToBackButton = null,
}) {
    return (
        <>
            <ProfileBar linkToBackButton={linkToBackButton} />
            <div className="absolute top-16 min-h-screen w-full bg-stone-200 md:left-1/4 md:w-3/4">
                {children}
            </div>
            <NavBar pageSelected={pageSelectedNavbar} />
        </>
    );
}
