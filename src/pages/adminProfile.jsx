import { useEffect, useMemo, useState } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import useProfiles from "../hooks/useProfiles";
import SelectProfile from "../components/selectProfile";
import UpdateProfileC from "../components/UpdateProfile";
import ManageCompetences from "../components/ManageCompetences";
import ManageEducation from "../components/ManageEducation";
import ManageExperiences from "../components/ManageExperiences";
import ManageProjects from "../components/ManageProjects";
import useUpdateProfile from "../hooks/useUpdateProfile";
import useUpdateCompetence from "../hooks/useUpdateCompetence";
import useUpdateEducation from "../hooks/useUpdateEducation";
import useUpdateExperience from "../hooks/useUpdateExperience";
import useUpdateProject from "../hooks/useUpdateProject";

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
        competences {
            id
            name
            level
        }
        education {
            # id
            institution
            degree
            startDate
            endDate
            description
        }
        experiences {
            id
            company
            position
            startDate
            endDate
            responsibilities
            enCoure
            description
        }
        projects {
            id
            title
            description
            demo
            code {
                platform
                link
            }
        }
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
    const [selectedUserId, setSelectedUserId] = useState("");
    const [formData, setFormData] = useState(defaultFormState);
    const [successMessage, setSuccessMessage] = useState("");
    const [sectionFeedback, setSectionFeedback] = useState({});

    const { loading: profilesLoading, error: profilesError, data: profilesData } = useProfiles(QUERY_PROFILES);
    const {
        loading: portfolioLoading,
        error: portfolioError,
        data: portfolioData,
        refetch,
    } = useQuery(GET_ADMIN_PORTFOLIO, {
        variables: { userId: selectedUserId },
        skip: !selectedUserId,
    });

    const { updateProfile, loading: updating, error: updateError, data: updateData } = useUpdateProfile();
    const { updateCompetence, loading: competenceLoading, error: competenceError } = useUpdateCompetence();
    const { updateEducation, loading: educationLoading, error: educationError } = useUpdateEducation();
    const { updateExperience, loading: experienceLoading, error: experienceError } = useUpdateExperience();
    const { updateProject, loading: projectLoading, error: projectError } = useUpdateProject();

    const portfolio = portfolioData?.getPortfolio;

    useEffect(() => {
        const user = portfolio?.user;
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
    }, [portfolio]);

    useEffect(() => {
        const updated =
            updateData?.updateProfile ??
            updateData?.updateProfil ??
            null;
        if (updated) {
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

        try {
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
        } catch (error) {
            console.error("Erreur mise à jour profil:", error);
        }
    };

    const handleCompetenceSave = async (competence) => {
        if (!competence?.id) return;
        try {
            await updateCompetence({
                variables: {
                    id: competence.id,
                    input: {
                        name: competence.name,
                        level: competence.level,
                    },
                },
            });
            setSectionFeedback((prev) => ({ ...prev, competences: "Compétence mise à jour." }));
            refetch();
        } catch (error) {
            console.error("Erreur mise à jour compétence:", error);
        }
    };

    const handleEducationSave = async (education) => {
        if (!education?.id) return;
        try {
            await updateEducation({
                variables: {
                    id: education.id,
                    input: {
                        institution: education.institution,
                        degree: education.degree,
                        startDate: education.startDate,
                        endDate: education.endDate,
                        description: education.description,
                    },
                },
            });
            setSectionFeedback((prev) => ({ ...prev, education: "Éducation mise à jour." }));
            refetch();
        } catch (error) {
            console.error("Erreur mise à jour éducation:", error);
        }
    };

    const handleExperienceSave = async (experience) => {
        if (!experience?.id) return;
        try {
            await updateExperience({
                variables: {
                    id: experience.id,
                    input: {
                        company: experience.company,
                        position: experience.position,
                        startDate: experience.startDate,
                        endDate: experience.endDate,
                        responsibilities: experience.responsibilities,
                        enCoure: experience.enCoure,
                        description: experience.description,
                    },
                },
            });
            setSectionFeedback((prev) => ({ ...prev, experiences: "Expérience mise à jour." }));
            refetch();
        } catch (error) {
            console.error("Erreur mise à jour expérience:", error);
        }
    };

    const handleProjectSave = async (project) => {
        if (!project?.id) return;
        try {
            await updateProject({
                variables: {
                    id: project.id,
                    input: {
                        title: project.title,
                        description: project.description,
                        demo: project.demo,
                        code: {
                            platform: project.codePlatform,
                            link: project.codeLink,
                        },
                    },
                },
            });
            setSectionFeedback((prev) => ({ ...prev, projects: "Projet mis à jour." }));
            refetch();
        } catch (error) {
            console.error("Erreur mise à jour projet:", error);
        }
    };

    const isLoading = useMemo(
        () => profilesLoading || portfolioLoading,
        [profilesLoading, portfolioLoading]
    );

    if (profilesError) return <div className="p-6 text-red-600">Erreur: {profilesError.message}</div>;
    if (portfolioError) return <div className="p-6 text-red-600">Erreur: {portfolioError.message}</div>;

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-10">
            {isLoading && <div className="text-gray-500">Chargement des informations...</div>}
            <h1 className="text-2xl font-semibold">Gestion du profil administrateur</h1>

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

            <ManageCompetences
                competences={portfolio?.competences}
                onSave={handleCompetenceSave}
                loading={competenceLoading}
                error={competenceError}
                feedback={sectionFeedback.competences}
            />

            <ManageEducation
                items={portfolio?.education}
                onSave={handleEducationSave}
                loading={educationLoading}
                error={educationError}
                feedback={sectionFeedback.education}
            />

            <ManageExperiences
                items={portfolio?.experiences}
                onSave={handleExperienceSave}
                loading={experienceLoading}
                error={experienceError}
                feedback={sectionFeedback.experiences}
            />

            <ManageProjects
                items={portfolio?.projects}
                onSave={handleProjectSave}
                loading={projectLoading}
                error={projectError}
                feedback={sectionFeedback.projects}
            />
        </div>
    );
}
