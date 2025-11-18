import { useQuery } from "@apollo/client/react";

export default function useProfiles(QUERY_PROFILES){

    console.log('QUERY_PROFILES', QUERY_PROFILES);
    const {loading, error, data} = useQuery(QUERY_PROFILES);
    return {loading, error, data};
} 