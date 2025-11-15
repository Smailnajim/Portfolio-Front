
export default function Competences({competences}){
    return(
        <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
                {competences?.map((skill) => (
                    <div key={skill.id} className="bg-gray-100 px-4 py-2 rounded-full">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-gray-600 ml-2">Level: {skill.level}</span>
                    </div>
                ))}
            </div>
        </section>
    );
} 