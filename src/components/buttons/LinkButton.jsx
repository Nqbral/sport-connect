import { Link } from 'react-router-dom';

import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

export default function LinkButton({ linkTo, buttonText, primary = true }) {
    return (
        <Link to={linkTo}>
            {primary ? (
                <PrimaryButton buttonText={buttonText} />
            ) : (
                <SecondaryButton buttonText={buttonText} />
            )}
        </Link>
    );
}
