import { faNewspaper } from '@fortawesome/free-regular-svg-icons';
import {
    faDumbbell,
    faMagnifyingGlass,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.png';
import { AuthContext } from '../context/auth.context';

export const PAGE_SELECTED = {
    FEED: 'feed_selected',
    WORKOUT: 'workout_selected',
    PROFILE: 'profile_selected',
    SEARCH: 'search_selected',
};

export default function NavBar({ pageSelected }) {
    const { user, logOutUser } = useContext(AuthContext);

    let pages = [
        {
            text: 'Actualités',
            icon: faNewspaper,
            selected: PAGE_SELECTED.FEED == pageSelected,
            linkTo: '/feed',
        },
        {
            text: 'Musculation',
            icon: faDumbbell,
            selected: PAGE_SELECTED.WORKOUT == pageSelected,
            linkTo: '/workout',
        },
        {
            text: 'Explorer',
            icon: faMagnifyingGlass,
            selected: PAGE_SELECTED.SEARCH == pageSelected,
            linkTo: `/search`,
        },
        {
            text: 'Profil',
            icon: faUser,
            selected: PAGE_SELECTED.PROFILE == pageSelected,
            linkTo: `/profile/${user.name}`,
        },
    ];

    return (
        <nav className="fixed bottom-0 w-screen border-t-2 border-neutral-400 bg-stone-300 py-5 md:bottom-auto md:h-screen md:w-1/4 md:border-r-2 md:border-t-0 md:text-xl">
            <div className="flex h-full flex-col justify-between">
                <div className="flex w-full flex-row justify-evenly md:w-10 md:flex-col md:gap-4 md:pl-3 md:pt-12">
                    {pages.map((page, index) => {
                        let classes =
                            'flex flex-col w-1/3 items-center md:flex-row md:gap-2 md:w-auto';

                        if (page.selected) {
                            classes += ' text-primary-500';
                        }
                        return (
                            <Link
                                key={index}
                                to={page.linkTo}
                                className={classes}
                            >
                                <FontAwesomeIcon icon={page.icon} />
                                <div>{page.text}</div>
                            </Link>
                        );
                    })}
                </div>

                <div className="flex flex-col">
                    <div className="hidden flex-col items-center pb-10 md:flex">
                        <img
                            src={logo}
                            alt="logo"
                            className="h-24 rounded-full shadow-lg shadow-neutral-500"
                        />
                    </div>
                    <button
                        className="hidden flex-row items-center justify-center gap-2 border-t-2 border-neutral-500 pt-2 text-neutral-500 md:flex"
                        onClick={logOutUser}
                    >
                        <FontAwesomeIcon icon={faPowerOff}></FontAwesomeIcon>
                        <div>Se déconnecter</div>
                    </button>
                </div>
            </div>
        </nav>
    );
}
