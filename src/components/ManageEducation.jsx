import { useEffect, useState } from "react";

export default function ManageEducation({ items = [], onSave, loading, error, feedback }) {
    const [localItems, setLocalItems] = useState([]);

    useEffect(() => {
        setLocalItems(
            items?.map((item, index) => ({
                id: item.id ?? `${item.institution}-${index}`,
                institution: item.institution ?? "",
                degree: item.degree ?? "",
                startDate: item.startDate ?? "",
                endDate: item.endDate ?? "",
                description: item.description ?? "",
            })) ?? []
        );
    }, [items]);

    const handleChange = (id, field, value) => {
        setLocalItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
        );
    };

    if (!localItems.length) {
        return (
            <section className="bg-white p-6 rounded-lg shadow mt-8">
                <h2 className="text-xl font-semibold mb-4">Éducation</h2>
                <p className="text-gray-500">Aucune éducation à afficher.</p>
            </section>
        );
    }

    return (
        <section className="bg-white p-6 rounded-lg shadow mt-8 space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Éducation</h2>
                {feedback && <span className="text-sm text-green-600">{feedback}</span>}
            </div>
            {localItems.map((education) => (
                <div key={education.id} className="border rounded-md p-4 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                            <input
                                type="text"
                                className="w-full border rounded-md px-3 py-2"
                                value={education.institution}
                                onChange={(event) =>
                                    handleChange(education.id, "institution", event.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Diplôme</label>
                            <input
                                type="text"
                                className="w-full border rounded-md px-3 py-2"
                                value={education.degree}
                                onChange={(event) =>
                                    handleChange(education.id, "degree", event.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Début</label>
                            <input
                                type="text"
                                className="w-full border rounded-md px-3 py-2"
                                value={education.startDate}
                                onChange={(event) =>
                                    handleChange(education.id, "startDate", event.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fin</label>
                            <input
                                type="text"
                                className="w-full border rounded-md px-3 py-2"
                                value={education.endDate}
                                onChange={(event) =>
                                    handleChange(education.id, "endDate", event.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            className="w-full border rounded-md px-3 py-2"
                            rows={3}
                            value={education.description}
                            onChange={(event) =>
                                handleChange(education.id, "description", event.target.value)
                            }
                        />
                    </div>
                    <button
                        type="button"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-60"
                        onClick={() => onSave(education)}
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
