export default function SecondaryButton({ buttonText, onClick = null }) {
    return (
        <button
            className="button border-primary-700 text-primary-700 hover:border-primary-600 hover:text-primary-600 my-1 rounded-md border-2 bg-transparent px-5 py-2 transition-colors"
            onClick={onClick}
        >
            {buttonText}
        </button>
    );
}
