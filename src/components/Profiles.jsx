import ProfileCard from "./ProfileCard";
import useProfiles from "../hooks/useProfiles";
import { gql } from "@apollo/client";

export default function Profiles() {
    const QUERY_PROFILES = gql`
    query {
        getProfiles {
            image
            id
            firstName
            email
            phone
            bio
        }
    }
    `;
    const { loading, error, data } = useProfiles(QUERY_PROFILES);
    //console.log(loading, error, data);
    //console.log("loading, error, data");
    if (loading) return <ProfileCard />
    if (error) return <p>there is an errorn : {error}</p>

    return (
        <ul className="flex gap-4 justify-center flex-wrap">
            {
                data.getProfiles.map(user => (
                    <li key={user.id}>
                        <ProfileCard
                            id={user.id}
                            image={user.image}
                            firstName={user.firstName}
                            email={user.email}
                            phone={user.phone}
                            bio={user.bio}
                        />
                    </li>
                ))
            }
        </ul>
    );
}