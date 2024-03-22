import NavBar from './NavBar';
import ProfileBar from './ProfileBar';

export default function ClassicPage({
    children,
    pageSelectedNavbar,
    sectionId,
    linkToBackButton = null,
}) {
    return (
        <>
            <ProfileBar linkToBackButton={linkToBackButton} />
            <div className="absolute min-h-screen w-full bg-stone-200 pt-16 md:left-1/4 md:w-3/4">
                <section
                    id={sectionId}
                    className="flex w-full flex-col items-center gap-3 pb-32 md:pb-8"
                >
                    {children}
                </section>
            </div>
            <NavBar pageSelected={pageSelectedNavbar} />
        </>
    );
}
