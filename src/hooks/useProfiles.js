import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_PROFILES = gql`
query {
    getProfiles {
        image
        id
        firstName
        email
        phone
        bio
    }
}`
export default function useProfiles(){
    const {loading, error, data} = useQuery(GET_PROFILES);
    return {loading, error, data};
} 