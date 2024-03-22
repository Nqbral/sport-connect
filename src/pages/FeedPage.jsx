import axios from 'axios';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import ReactLoading from 'react-loading';

import PrimaryButton from '../components/buttons/PrimaryButton';
import FeedPost from '../components/list_tile/FeedPost';
import CreateFeedPostModal from '../components/modals/CreateFeedPostModal';
import ClassicPage from '../layouts/ClassicPage';
import { PAGE_SELECTED } from '../layouts/NavBar';

const API_URL = process.env.API_URL;
const storedToken = localStorage.getItem('authToken');

export default function FeedPage() {
    const [page, setPage] = useState(0);
    const [listPosts, setListPosts] = useState([]);
    const [hasMorePosts, setHasMorePosts] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    // states for opening modals
    const [openCreateFeedPostModal, setOpenCreateFeedPostModal] =
        useState(false);

    // function to handle modal open
    const handleOpenCreatePost = () => {
        setOpenCreateFeedPostModal(true);
    };

    // function to handle modal close
    const handleCloseCreatePost = () => {
        setOpenCreateFeedPostModal(false);
    };

    useEffect(() => {
        if (isLoading) {
            fetchPosts();
            setIsLoading(false);
        }
    }, [isLoading]);

    const fetchPosts = () => {
        axios
            .get(`${API_URL}/api/feedposts/${page}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
                setListPosts(listPosts.concat(response.data));
                setPage(page + 1);

                if (response.data.length == 0) {
                    setHasMorePosts(false);
                }
            })
            .catch((error) => console.log(error));
    };

    const addPost = (message) => {
        axios
            .post(
                `${API_URL}/api/feedposts`,
                { message: message },
                {
                    headers: { Authorization: `Bearer ${storedToken}` },
                },
            )
            .then((response) => {
                setListPosts([response.data.data].concat(listPosts));
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <ClassicPage
                pageSelectedNavbar={PAGE_SELECTED.FEED}
                sectionId={'feed-page-section'}
            >
                <h2 className="text-xl font-bold">Fil d&apos;actualités</h2>
                <PrimaryButton
                    buttonText={'Créer un post'}
                    onClick={handleOpenCreatePost}
                />

                {isLoading ? (
                    <ReactLoading type="spin" color="#1D4ED8" />
                ) : listPosts.length == 0 ? (
                    <div className="italic text-neutral-500">Aucun post</div>
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
            </ClassicPage>
            <CreateFeedPostModal
                open={openCreateFeedPostModal}
                close={handleCloseCreatePost}
                addPost={addPost}
            />
        </>
    );
}
