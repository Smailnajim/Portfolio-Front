import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const UPDATE_EXPERIENCE = gql`
mutation UpdateExperience($id: ID!, $input: ExperienceUpdateInput!) {
    updateExperience(id: $id, input: $input) {
        id
        company
        position
        startDate
        endDate
        responsibilities
        enCoure
        description
    }
}
`;

export default function useUpdateExperience() {
    const [updateExperience, { loading, error, data }] = useMutation(UPDATE_EXPERIENCE);
    return { updateExperience, loading, error, data };
}
