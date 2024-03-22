import axios from 'axios';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import ReactLoading from 'react-loading';

import PrimaryButton from '../components/buttons/PrimaryButton';
import FeedPost from '../components/list_tile/FeedPost';
import ClassicPage from '../layouts/ClassicPage';
import { PAGE_SELECTED } from '../layouts/NavBar';

const API_URL = process.env.API_URL;

export default function FeedPage() {
    const [page, setPage] = useState(0);
    const [listPosts, setListPosts] = useState([]);
    const [hasMorePosts, setHasMorePosts] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            fetchPosts();
            setIsLoading(false);
        }
    }, [isLoading]);

    const fetchPosts = () => {
        const storedToken = localStorage.getItem('authToken');

        axios
            .get(`${API_URL}/api/feedposts/${page}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
                setListPosts(listPosts.concat(response.data));
                setPage(page + 1);

                console.log(response.data.length);

                if (response.data.length == 0) {
                    setHasMorePosts(false);
                }
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <ClassicPage pageSelectedNavbar={PAGE_SELECTED.FEED}>
                <section
                    id="search-page"
                    className="flex w-full flex-col items-center gap-3"
                >
                    <h2 className="text-xl font-bold">Fil d&apos;actualités</h2>
                    <PrimaryButton buttonText={'Créer un post'} />

                    {isLoading ? (
                        <ReactLoading type="spin" color="#1D4ED8" />
                    ) : listPosts.length == 0 ? (
                        <div className="italic text-neutral-500">
                            Aucun post
                        </div>
                    ) : (
                        <InfiniteScroll
                            loadMore={fetchPosts}
                            hasMore={hasMorePosts}
                            loader={
                                <div className="flex flex-col items-center gap-3">
                                    <ReactLoading type="spin" color="#1D4ED8" />
                                </div>
                            }
                            className="flex min-w-96 flex-col items-center gap-3 md:w-1/2"
                        >
                            {listPosts.map((post) => {
                                return <FeedPost key={post._id} post={post} />;
                            })}
                        </InfiniteScroll>
                    )}
                </section>
            </ClassicPage>
        </>
    );
}
