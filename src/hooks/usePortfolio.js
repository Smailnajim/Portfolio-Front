import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { useParams } from "react-router-dom";


const GET_PORTFOLIO = gql`
query GetPortfolio($userId: ID!) {
    getPortfolio(userId: $userId) {
        user {
            id
            image
            firstName
            lastName
            email
            phone
            bio
            reseauxSociaux {
                platform
                link
            }
        }
        competences {
            id
            userId
            name
            level
        }
        education {
            userId
            institution
            degree
            startDate
            endDate
            description
        }
        experiences {
            id
            competenceId
            company
            position
            startDate
            endDate
            responsibilities
            enCoure
            description
        }
        projects {
            id
            CompetenceId
            title
            description
            demo
            code {
                platform
                link
            }
        }
    }
}
`;
export default function usePortfolio() {
    const {id} = useParams();
    const { loading, error, data } = useQuery(GET_PORTFOLIO, {
        variables: {userId: id}
    });
    return { loading, error, data };
}