import axios from 'axios';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import DateHelper from '../../helpers/Date';

const API_URL = process.env.API_URL;

export default function ProfilePosts({ userPage }) {
    const [listPosts, setListPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMorePosts, setHasMorePosts] = useState(true);

    useEffect(() => {
        if (userPage != null) {
            getPosts();
        }
    }, [userPage]);

    const getPosts = () => {
        console.log('getPost');
        const storedToken = localStorage.getItem('authToken');

        axios
            .get(`${API_URL}/api/feedposts/user/${userPage._id}&${page}`, {
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

    return (
        <div className="flex min-w-80 flex-col items-center gap-3 rounded-md p-4 shadow-md shadow-neutral-500 md:w-1/2">
            <div className="font-bold">Derniers posts</div>
            {listPosts.length == 0 ? (
                <div className="italic text-neutral-500">Aucun post</div>
            ) : (
                <InfiniteScroll
                    loadMore={getPosts}
                    hasMore={hasMorePosts}
                    loader={
                        <div className="loader" key={0}>
                            Loading ...
                        </div>
                    }
                >
                    <div className="flex flex-col items-center gap-3">
                        {listPosts.map((post) => {
                            let strDate = DateHelper.formatClientDateTime(
                                post.date,
                            );

                            return (
                                <div
                                    key={post._id}
                                    className="shadow-neutral flex min-w-64 flex-col justify-center gap-2 rounded-md p-4 shadow-md md:w-1/2"
                                >
                                    <div className="text-sm italic text-neutral-400">
                                        {strDate}
                                    </div>
                                    <div>{post.message}</div>
                                </div>
                            );
                        })}
                    </div>
                </InfiniteScroll>
            )}
        </div>
    );
}
