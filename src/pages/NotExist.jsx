export default function NotExist() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-800">404</h1>
            <p className="text-lg text-gray-600">La page demandée n&apos;existe pas.</p>
            <p className="text-sm text-gray-500">Veuillez vérifier l&apos;adresse ou retourner à l&apos;accueil.</p>
        </div>
    );
}
