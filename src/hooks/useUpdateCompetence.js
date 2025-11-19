import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const UPDATE_COMPETENCE = gql`
mutation UpdateCompetence($id: ID!, $input: CompetenceUpdateInput!) {
    updateCompetence(id: $id, input: $input) {
        id
        name
        level
    }
}
`;

export default function useUpdateCompetence() {
    const [updateCompetence, { loading, error, data }] = useMutation(UPDATE_COMPETENCE);
    return { updateCompetence, loading, error, data };
}
