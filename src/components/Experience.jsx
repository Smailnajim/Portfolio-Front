export default function Experience({experiences}){
    return(
        <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">Experience</h2>
            {experiences?.map((exp) => (
                <div key={exp.id} className="bg-white border border-gray-200 p-5 mb-4 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800">{exp.position}</h3>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                    <p className="text-gray-500">{exp.startDate} - {exp.enCoure ? "Present" : exp.endDate}</p>
                    <p className="text-gray-600 mt-2">{exp.description}</p>
                    <p className="text-gray-600">{exp.responsibilities}</p>
                </div>
            ))}
        </section>
    );
} 