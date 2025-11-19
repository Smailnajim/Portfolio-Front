import { useEffect, useMemo, useState } from "react";
import useProfiles from "../hooks/useProfiles";
import SelectProfile from "../components/selectProfile";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import UpdateProfileC from "../components/UpdateProfile";
import useUpdateProfile from "../hooks/useUpdateProfile";

const QUERY_PROFILES = gql`
    query {
        getProfiles {
            id
            firstName
            email
        }
    }
`;
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

const defaultFormState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    image: "",
    bio: "",
};
export default function AdminProfile(){
    const [successMessage, setSuccessMessage] = useState("");

    const [selectedUserId, setSelectedUserId] = useState("");
    const { loading: profilesLoading, error: profilesError, data: profilesData } = useProfiles(QUERY_PROFILES);


    const [formData, setFormData] = useState(defaultFormState);
    const { loading: portfolioLoading, error: portfolioError, data: portfolioData, refetch } = useQuery(
        GET_ADMIN_PORTFOLIO,
        {
            variables: { userId: selectedUserId },
            skip: !selectedUserId,
        }
    );
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
    const { updateProfile, loading: updating, error: updateError, data: updateData } = useUpdateProfile();
    console.log('updateData', updateData);
    useEffect(() => {
        if (updateData?.updateProfile) {
            setSuccessMessage("Profil mis à jour avec succès.");
            refetch();
        }
    }, [updateData, refetch]);

    const isLoading = useMemo(() => profilesLoading || portfolioLoading, [profilesLoading, portfolioLoading]);
    
    if (profilesError) return <div className="p-6 text-red-600">Erreur: {profilesError.message}</div>;
    if (portfolioError) return <div className="p-6 text-red-600">Erreur: {portfolioError.message}</div>;
    return (
        <div className="max-w-4xl mx-auto p-6">
            {isLoading && <div className="text-gray-500">Chargement des informations...</div>}
            <h1 className="text-2xl font-semibold mb-4">Gestion du profil administrateur</h1>
            
            <SelectProfile
            profilesLoading={profilesLoading} 
            profilesData={profilesData} 
            
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
            />

            <UpdateProfileC
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            formData={formData}
            successMessage={successMessage}
            updateError={updateError}
            updating={updating}
            />
        </div>


    );
}