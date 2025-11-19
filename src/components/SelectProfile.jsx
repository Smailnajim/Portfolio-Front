import { useEffect } from "react";



export default function SelectProfile({profilesLoading, profilesData, selectedUserId, setSelectedUserId}){
    useEffect(() => {
        if(!selectedUserId && profilesData?.getProfiles?.length){
            setSelectedUserId(profilesData.getProfiles[0].id);
        }
    }, [selectedUserId, profilesData, setSelectedUserId]);

    return (
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
    );
}