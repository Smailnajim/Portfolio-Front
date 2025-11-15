import ProfileCard from "./ProfileCard";
import useUser from "../hooks/useUser";

export default function Profiles() {
    const { loading, error, data } = useUser();
    console.log(loading, error, data);
    console.log("loading, error, data");
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