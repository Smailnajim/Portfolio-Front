import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const UPDATE_EDUCATION = gql`
mutation UpdateEducation($id: ID!, $input: EducationUpdateInput!) {
    updateEducation(id: $id, input: $input) {
        id
        institution
        degree
        startDate
        endDate
        description
    }
}
`;

export default function useUpdateEducation() {
    const [updateEducation, { loading, error, data }] = useMutation(UPDATE_EDUCATION);
    return { updateEducation, loading, error, data };
}
