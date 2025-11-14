import useUser from "./hooks/useUser";


export default function App() {
  const {loading, error, data} = useUser();
  console.log(loading, error, data);
  console.log("loading, error, data");
  if(loading) return ()
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <br />
      {/* <DisplayLocations /> */}
    </div>
  );
}