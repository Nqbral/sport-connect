export default function RedButton({ buttonText, onClick = null }) {
    return (
        <button
            className="button border-red-700 text-red-700 hover:border-red-600 hover:text-red-600 my-1 rounded-md border-2 bg-transparent px-5 py-2 transition-colors"
            onClick={onClick}
        >
            {buttonText}
        </button>
    );
}
