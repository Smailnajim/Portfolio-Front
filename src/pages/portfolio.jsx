import usePortfolio from "../hooks/usePortfolio";
import UserInfo from "../components/UserInfo";
import Competences from '../components/Competences';
import Education from "../components/Education";
import Experience from "../components/Experience";
import Projects from "../components/Projects";

export default function Portfolio() {
    const { loading, error, data } = usePortfolio();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const portfolio = data?.getPortfolio;
    if (!portfolio) return <div>this user has no portfolio</div>;

    const { user, competences, education, experiences, projects } = portfolio;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <UserInfo user={user}/>
            <Competences competences={competences}/>
            <Education education={education}/>
            <Experience experiences={experiences}/>
            <Projects projects={projects}/>
        </div>
    );
}