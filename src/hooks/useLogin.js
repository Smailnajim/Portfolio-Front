import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";

const M_Login = gql`
mutation Login($input: UserLogin!) {
    login(input: $input) {
        accessToken
    }
}
`;

export default function useLogin({email, password}){
    const {loading, error, data} = useQuery(M_Login, {
        variables: {input: {
            email: email,
            password: password
    }}});
    return {loading, error, data};
}