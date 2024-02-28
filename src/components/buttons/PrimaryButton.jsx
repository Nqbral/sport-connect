export default function PrimaryButton({
    buttonText,
    onClick = null,
    disabled = false,
}) {
    return (
        <button
            className={
                disabled
                    ? 'button my-1 rounded-md bg-stone-600 px-5 py-2 text-white'
                    : 'button my-1 rounded-md bg-primary-700 px-5 py-2 text-white  transition-colors hover:bg-primary-600'
            }
            onClick={onClick}
            disabled={disabled}
        >
            {buttonText}
        </button>
    );
}
