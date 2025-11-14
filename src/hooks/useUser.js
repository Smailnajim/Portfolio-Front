import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_USERS = gql`
query {
    getProfiles {
        id
        firstName
        lastName
        email
        password
        phone
    }
}`
export default function useUser(){
    const {loading, error, data} = useQuery(GET_USERS);
    return {loading, error, data};
} 