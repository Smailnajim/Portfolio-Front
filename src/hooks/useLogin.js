import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const M_Login = gql`
mutation Login($input: UserLogin!) {
    login(input: $input) {
        accessToken
    }
}
`;

export default function useLogin(){
    const [Login, {loading, error, data}] = useMutation(M_Login);
    return {Login, loading, error, data};
}