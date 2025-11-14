import useUser from "./hooks/useUser";
import ProfileCard from "./components/ProfileCard";


export default function App() {
  const {loading, error, data} = useUser();
  console.log(loading, error, data);
  console.log("loading, error, data");
  if(loading) return <ProfileCard />
  if(error) return <p>there is an errorn : {error}</p>

  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <br />
      <ul className="flex flex-wrap">
      {
        data.getProfiles.map(user => (
          <li>
            <ProfileCard
              image = {user.image}
              id = {user.image}
              firstName = {user.firstName}
              email = {user.email}
              phone = {user.phone}
              bio = {user.bio}
            />
          </li>
        ))

      }

      </ul>
      {/* <DisplayLocations /> */}
    </div>
  );
}