import axios from 'axios';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import ReactLoading from 'react-loading';

import SearchUser from '../components/list_tile/SearchUser';
import SearchWorkout from '../components/list_tile/SearchWorkout';
import ClassicPage from '../layouts/ClassicPage';
import { PAGE_SELECTED } from '../layouts/NavBar';

const API_URL = process.env.API_URL;

export default function SearchPage() {
    const [typeSearch, setTypeSearch] = useState('users');
    const [searchWord, setSearchWord] = useState('');
    const [results, setResults] = useState([]);
    const [hasMoreData, setHasMoreData] = useState(false);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleChangeTypeSearch = (event) => {
        setIsLoading(true);
        setResults([]);
        setTypeSearch(event.target.value);
        setPage(0);

        if (searchWord == '') {
            setResults([]);
            return;
        }
    };

    const handleChangeSearch = (event) => {
        setPage(0);
        setSearchWord(event.target.value);
    };

    useEffect(() => {
        if (searchWord == '') {
            setIsLoading(false);
            return;
        }

        setHasMoreData(true);

        const delayBounce = setTimeout(async () => {
            await fetchData();
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(delayBounce);
    }, [searchWord, typeSearch]);

    const fetchData = async () => {
        console.log('fetchData');
        const storedToken = localStorage.getItem('authToken');

        axios
            .get(`${API_URL}/api/${typeSearch}/search/${searchWord}&${page}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
                setResults(results.concat(response.data));
                setPage(page + 1);

                if (response.data.length == 0) {
                    setHasMoreData(false);
                }
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <ClassicPage pageSelectedNavbar={PAGE_SELECTED.SEARCH}>
                <section
                    id="search-page"
                    className="flex w-full flex-col items-center gap-3"
                >
                    <h2 className="text-xl font-bold">Explorer</h2>

                    <div className="flex min-w-80 flex-col items-center gap-3 rounded-md p-4 shadow-md shadow-neutral-500 md:w-1/2">
                        <div className="font-bold">Critères de recherches</div>
                        <div className="flex flex-col items-center gap-2 md:flex-row">
                            <div className="flex flex-row gap-2">
                                <input
                                    type="radio"
                                    value="users"
                                    id="user-search"
                                    onChange={handleChangeTypeSearch}
                                    name="type-search"
                                    checked={typeSearch == 'users'}
                                />
                                <label htmlFor="user-search">Utilisateur</label>
                            </div>

                            <div className="flex flex-row gap-2">
                                <input
                                    type="radio"
                                    value="workouts"
                                    id="workout-search"
                                    onChange={handleChangeTypeSearch}
                                    name="type-search"
                                    checked={typeSearch == 'workouts'}
                                />
                                <label
                                    htmlFor="workout-search"
                                    className="mx-1 text-center"
                                >
                                    Programme d&apos;entraînement
                                </label>
                            </div>
                        </div>
                        <input
                            type="text"
                            name="username"
                            className="min-w-72 rounded-md border-2 border-neutral-300 bg-transparent px-1 text-center outline-none transition-colors duration-300 focus:border-primary-500"
                            onChange={handleChangeSearch}
                            placeholder="Saisissez votre recherche"
                        />
                    </div>

                    <div className="flex min-w-80 flex-col items-center gap-3 rounded-md p-4 shadow-md shadow-neutral-500 md:w-1/2">
                        <div className="font-bold">Résultats</div>
                        {isLoading ? (
                            <ReactLoading type="spin" color="#1D4ED8" />
                        ) : results.length == 0 ? (
                            <div className="italic text-neutral-500">
                                Aucun résultat
                            </div>
                        ) : (
                            <InfiniteScroll
                                loadMore={fetchData}
                                hasMore={hasMoreData}
                                loader={
                                    <ReactLoading type="spin" color="#1D4ED8" />
                                }
                            >
                                {results.map((result) => {
                                    if (typeSearch == 'users') {
                                        return (
                                            <SearchUser
                                                key={result._id}
                                                user={result}
                                            />
                                        );
                                    }
                                    return (
                                        <SearchWorkout
                                            key={result._id}
                                            workout={result}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        )}
                    </div>
                </section>
            </ClassicPage>
        </>
    );
}
