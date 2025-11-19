import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const UPDATE_PROJECT = gql`
mutation UpdateProject($id: ID!, $input: ProjectUpdateInput!) {
    updateProject(id: $id, input: $input) {
        id
        title
        description
        demo
        code {
            platform
            link
        }
    }
}
`;

export default function useUpdateProject() {
    const [updateProject, { loading, error, data }] = useMutation(UPDATE_PROJECT);
    return { updateProject, loading, error, data };
}
