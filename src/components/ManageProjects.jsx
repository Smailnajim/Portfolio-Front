import { useEffect, useState } from "react";

export default function ManageProjects({ items = [], onSave, loading, error, feedback }) {
    const [localItems, setLocalItems] = useState([]);

    useEffect(() => {
        setLocalItems(
            items?.map((item, index) => ({
                id: item.id ?? `${item.title}-${index}`,
                title: item.title ?? "",
                description: item.description ?? "",
                demo: item.demo ?? "",
                codePlatform: item.code?.platform ?? "",
                codeLink: item.code?.link ?? "",
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
                <h2 className="text-xl font-semibold mb-4">Projets</h2>
                <p className="text-gray-500">Aucun projet à afficher.</p>
            </section>
        );
    }

    return (
        <section className="bg-white p-6 rounded-lg shadow mt-8 space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Projets</h2>
                {feedback && <span className="text-sm text-green-600">{feedback}</span>}
            </div>
            {localItems.map((project) => (
                <div key={project.id} className="border rounded-md p-4 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                            <input
                                type="text"
                                className="w-full border rounded-md px-3 py-2"
                                value={project.title}
                                onChange={(event) => handleChange(project.id, "title", event.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Démo</label>
                            <input
                                type="text"
                                className="w-full border rounded-md px-3 py-2"
                                value={project.demo}
                                onChange={(event) => handleChange(project.id, "demo", event.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            className="w-full border rounded-md px-3 py-2"
                            rows={3}
                            value={project.description}
                            onChange={(event) =>
                                handleChange(project.id, "description", event.target.value)
                            }
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Plateforme du code</label>
                            <input
                                type="text"
                                className="w-full border rounded-md px-3 py-2"
                                value={project.codePlatform}
                                onChange={(event) =>
                                    handleChange(project.id, "codePlatform", event.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Lien du code</label>
                            <input
                                type="text"
                                className="w-full border rounded-md px-3 py-2"
                                value={project.codeLink}
                                onChange={(event) =>
                                    handleChange(project.id, "codeLink", event.target.value)
                                }
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-60"
                        onClick={() => onSave(project)}
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
