import { useEffect, useMemo, useState } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import useProfiles from "../hooks/useProfiles";
import useUpdateProfile from "../hooks/useUpdateProfile";
import Redirect from "../util/Redirect";

const GET_ADMIN_PORTFOLIO = gql`
query AdminGetPortfolio($userId: ID!) {
    getPortfolio(userId: $userId) {
        user {
            id
            firstName
            lastName
            email
            phone
            role
            image
            bio
        }
    }
}`;

const QUERY_PROFILES = gql`
    query {
        getProfiles {
            id
            firstName
            email
        }
    }
`;

const defaultFormState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    image: "",
    bio: "",
};

export default function AdminProfile() {
    // Redirect('pppppptop');
    const { loading: profilesLoading, error: profilesError, data: profilesData } = useProfiles(QUERY_PROFILES);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [formData, setFormData] = useState(defaultFormState);
    const [successMessage, setSuccessMessage] = useState("");

    const { loading: portfolioLoading, error: portfolioError, data: portfolioData, refetch } = useQuery(
        GET_ADMIN_PORTFOLIO,
        {
            variables: { userId: selectedUserId },
            skip: !selectedUserId,
        }
    );

    const { updateProfile, loading: updating, error: updateError, data: updateData } = useUpdateProfile();
            console.log('updateData', updateData)


    useEffect(() => {
        if(!selectedUserId && profilesData?.getProfiles?.length){
            setSelectedUserId(profilesData.getProfiles[0].id);
        }
    }, [selectedUserId, profilesData]);


    useEffect(() => {
        const user = portfolioData?.getPortfolio?.user;
        if (user) {
            setFormData({
                firstName: user.firstName ?? "",
                lastName: user.lastName ?? "",
                email: user.email ?? "",
                phone: user.phone ?? "",
                role: user.role ?? "",
                image: user.image ?? "",
                bio: user.bio ?? "",
            });
        }
    }, [portfolioData]);

    useEffect(() => {
        if (updateData?.updateProfile) {
            setSuccessMessage("Profil mis à jour avec succès.");
            refetch();
        }
    }, [updateData, refetch]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setSuccessMessage("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedUserId) return;

        await updateProfile({
            variables: {
                userId: selectedUserId,
                input: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    role: formData.role,
                    image: formData.image,
                    bio: formData.bio,
                },
            },
        });
    };

    const isLoading = useMemo(() => profilesLoading || portfolioLoading, [profilesLoading, portfolioLoading]);

    if (profilesError) return <div className="p-6 text-red-600">Erreur: {profilesError.message}</div>;
    if (portfolioError) return <div className="p-6 text-red-600">Erreur: {portfolioError.message}</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-4">Gestion du profil administrateur</h1>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sélectionner un profil</label>
                <select
                    className="w-full border rounded-md px-3 py-2"
                    value={selectedUserId}
                    onChange={(event) => setSelectedUserId(event.target.value)}
                    disabled={profilesLoading}
                >
                    {profilesData?.getProfiles?.map((profile) => (
                        <option key={profile.id} value={profile.id}>
                            {profile.firstName} ({profile.email})
                        </option>
                    ))}
                </select>
            </div>

            {isLoading && <div className="text-gray-500">Chargement des informations...</div>}

            {!isLoading && (
                <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
                            <input
                                type="text"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image (URL)</label>
                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Biographie</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2"
                            rows={4}
                        />
                    </div>

                    {updateError && <div className="text-red-600">Erreur: {updateError.message}</div>}
                    {successMessage && <div className="text-green-600">{successMessage}</div>}

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-60"
                        disabled={updating}
                    >
                        {updating ? "Mise à jour..." : "Enregistrer les modifications"}
                    </button>
                </form>
            )}
        </div>
    );
}
