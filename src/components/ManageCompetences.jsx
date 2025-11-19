import { useEffect, useState } from "react";

export default function ManageCompetences({ competences = [], onSave, loading, error, feedback }) {
    const [localCompetences, setLocalCompetences] = useState([]);

    useEffect(() => {
        setLocalCompetences(
            competences?.map((competence) => ({
                id: competence.id,
                name: competence.name ?? "",
                level: competence.level ?? "",
            })) ?? []
        );
    }, [competences]);

    const handleChange = (id, field, value) => {
        setLocalCompetences((prev) =>
            prev.map((competence) =>
                competence.id === id ? { ...competence, [field]: value } : competence
            )
        );
    };

    if (!localCompetences.length) {
        return (
            <section className="bg-white p-6 rounded-lg shadow mt-8">
                <h2 className="text-xl font-semibold mb-4">Competences</h2>
                <p className="text-gray-500">Aucune competence à afficher.</p>
            </section>
        );
    }

    return (
        <section className="bg-white p-6 rounded-lg shadow mt-8 space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Competences</h2>
                {feedback && <span className="text-sm text-green-600">{feedback}</span>}
            </div>
            {localCompetences.map((competence) => (
                <div key={competence.id} className="border rounded-md p-4 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                            <input
                                type="text"
                                className="w-full border rounded-md px-3 py-2"
                                value={competence.name}
                                onChange={(event) => handleChange(competence.id, "name", event.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
                            <input
                                type="text"
                                className="w-full border rounded-md px-3 py-2"
                                value={competence.level}
                                onChange={(event) => handleChange(competence.id, "level", event.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-60"
                        onClick={() => onSave(competence)}
                        disabled={loading}
                    >
                        {loading ? "Mise à jour..." : "Enregistrer"}
                    </button>
                </div>
            ))}
            {error && <div className="text-red-600">Erreur: {error.message}</div>}
        </section>
    );
}
