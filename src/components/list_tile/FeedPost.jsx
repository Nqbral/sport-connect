import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import userLogo from '../../assets/user.png';
import DateHelper from '../../helpers/Date';

export default function FeedPost({ post }) {
    let strDate = DateHelper.formatClientDateTime(post.date);

    return (
        <div
            key={post._id}
            className="flex w-full flex-col gap-3 rounded-md p-4 shadow-md shadow-neutral-500"
        >
            <div className="flex flex-row items-center justify-between">
                <Link to={`/profile/${post.create_user.name}`}>
                    <div className="flex flex-row items-center gap-2">
                        <img src={userLogo} className="h-8" alt="user_logo" />
                        <div>@{post.create_user.name}</div>
                    </div>
                </Link>
                {post.workout_linked != null ? (
                    <Link to={`/workout/${post.workout_linked}`}>
                        <FontAwesomeIcon
                            icon={faEye}
                            className="transition-colors duration-300 hover:text-primary-600"
                        />
                    </Link>
                ) : (
                    <></>
                )}
            </div>

            <div className="text-sm italic text-neutral-400">{strDate}</div>

            <div>{post.message}</div>
        </div>
    );
}
