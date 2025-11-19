import { useEffect, useState } from "react";

export default function ManageExperiences({ items = [], onSave, loading, error, feedback }) {
    const [localItems, setLocalItems] = useState([]);

    useEffect(() => {
        setLocalItems(
            items?.map((item, index) => ({
                id: item.id ?? `${item.company}-${index}`,
                company: item.company ?? "",
                position: item.position ?? "",
                startDate: item.startDate ?? "",
                endDate: item.endDate ?? "",
                responsibilities: item.responsibilities ?? "",
                enCoure: Boolean(item.enCoure),
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
                <h2 className="text-xl font-semibold mb-4">Expériences</h2>
                <p className="text-gray-500">Aucune expérience à afficher.</p>
            </section>
        );
    }

    return (
        <section className="bg-white p-6 rounded-lg shadow mt-8 space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Expériences</h2>
                {feedback && <span className="text-sm text-green-600">{feedback}</span>}
            </div>
            {localItems.map((experience) => (
                <div key={experience.id} className="border rounded-md p-4 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
                            <input
                                type="text"
                                className="w-full border rounded-md px-3 py-2"
                                value={experience.company}
                                onChange={(event) =>
                                    handleChange(experience.id, "company", event.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Poste</label>
                            <input
                                type="text"
                                className="w-full border rounded-md px-3 py-2"
                                value={experience.position}
                                onChange={(event) =>
                                    handleChange(experience.id, "position", event.target.value)
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
                                value={experience.startDate}
                                onChange={(event) =>
                                    handleChange(experience.id, "startDate", event.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fin</label>
                            <input
                                type="text"
                                className="w-full border rounded-md px-3 py-2"
                                value={experience.endDate}
                                onChange={(event) =>
                                    handleChange(experience.id, "endDate", event.target.value)
                                }
                                disabled={experience.enCoure}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            id={`encore-${experience.id}`}
                            type="checkbox"
                            checked={experience.enCoure}
                            onChange={(event) =>
                                handleChange(experience.id, "enCoure", event.target.checked)
                            }
                        />
                        <label htmlFor={`encore-${experience.id}`} className="text-sm text-gray-700">
                            En cours
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Responsabilités</label>
                        <textarea
                            className="w-full border rounded-md px-3 py-2"
                            rows={3}
                            value={experience.responsibilities}
                            onChange={(event) =>
                                handleChange(experience.id, "responsibilities", event.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            className="w-full border rounded-md px-3 py-2"
                            rows={3}
                            value={experience.description}
                            onChange={(event) =>
                                handleChange(experience.id, "description", event.target.value)
                            }
                        />
                    </div>
                    <button
                        type="button"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-60"
                        onClick={() => onSave(experience)}
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
