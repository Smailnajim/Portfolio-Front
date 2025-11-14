// Import everything needed to use the `useQuery` hook
// import { gql } from "@apollo/client";
// import { useQuery } from "@apollo/client/react";

// const GET_LOCATIONS = gql`
//   query {
//     getProfil(userId: "6911c59cbeaffcc3026658c4") {
//       id
//       role
//       firstName
//       lastName
//       email
//       password
//       phone
//       bio
//       reseauxSociaux {
//         platform
//         link
//       }
//     }
//   }
// `;

// function DisplayLocations() {
//   // const { loading, error, data } = useQuery(GET_LOCATIONS);
//   const { loading, error, data } = useQuery(GET_LOCATIONS);
// console.log("loading",loading, "error",error, "data", data)
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error : {error.message}</p>;
  
//   return (
//     <div>
//       <h3>{data.getProfil.firstName} {data.getProfil.lastName}</h3>
//       <p>{data.getProfil.role}</p>
//     </div>
//   );
// }
import useUser from "./hooks/useUser";


export default function App() {
  const {loading, error, data} = useUser();
  if(loading) return <p>is loading...</p>
  if(error) return <p>there is error! :{error}</p>
  console.log(loading, error, data);
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <br />
      <DisplayLocations />
    </div>
  );
}