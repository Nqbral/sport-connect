export default function PrimaryButton({ buttonText, onClick = null }) {
    return (
        <button
            className="button bg-primary-700 hover:bg-primary-600  my-1 rounded-md px-5 py-2 text-white transition-colors"
            onClick={onClick}
        >
            {buttonText}
        </button>
    );
}
