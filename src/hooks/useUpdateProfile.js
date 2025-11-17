import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const UPDATE_PROFILE = gql`
mutation UpdateProfil($userId: ID!, $input: UserUpdateInput!) {
    updateProfil(userId: $userId, input: $input) {
        id
        image
        role
        firstName
        lastName
        email
        phone
        bio
    }
}
`;

export default function useUpdateProfile() {
    const [updateProfile, { loading, error, data }] = useMutation(UPDATE_PROFILE);

    return { updateProfile, loading, error, data };
}
