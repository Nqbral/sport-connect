import LinkButton from '../components/buttons/LinkButton';

export default function HomePage() {
    return (
        <div id="homepage">
            <div className="flex flex-col md:flex-row">
                <div className="bg-primary-700 flex h-72 w-auto flex-col items-center justify-center gap-4 text-white md:h-screen md:w-1/2">
                    <h1 className="text-5xl font-bold">Sport Connect</h1>
                    <h2 className="text-xl">
                        Construis ton corps, construis des liens
                    </h2>
                </div>
                <div className="mt-10 flex flex-col items-center justify-center gap-2 md:mt-0 md:h-screen md:w-1/2">
                    <h2 className="text-xl font-bold">Inscrivez-vous</h2>
                    <LinkButton
                        linkTo={'/signup'}
                        buttonText={'Créer un compte'}
                    />
                    <h3 className="text-lg">Vous avez déjà un compte ?</h3>
                    <LinkButton
                        linkTo={'/login'}
                        buttonText={'Se connecter'}
                        primary={false}
                    />
                </div>
            </div>
        </div>
    );
}
