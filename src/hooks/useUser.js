import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_USERS = gql`
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
export default function useUser(){
    const {loading, error, data} = useQuery(GET_USERS);
    return {loading, error, data};
} 