export default function Education({education}){
    return(
        <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">Education</h2>
            {education?.map((edu, index) => (
                <div key={index} className="bg-white border border-gray-200 p-5 mb-4 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
                    <p className="text-blue-600 font-medium">{edu.institution}</p>
                    <p className="text-gray-500">{edu.startDate} - {edu.endDate}</p>
                    <p className="text-gray-600 mt-2">{edu.description}</p>
                </div>
            ))}
        </section>
    );
} 