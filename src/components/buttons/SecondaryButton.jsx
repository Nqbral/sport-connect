export default function SecondaryButton({ buttonText, onClick = null }) {
    return (
        <button
            className="button my-1 rounded-md border-2 border-primary-700 bg-transparent px-5 py-2 text-primary-700 transition-colors hover:border-primary-600 hover:text-primary-600"
            onClick={onClick}
        >
            {buttonText}
        </button>
    );
}
