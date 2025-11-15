export default function Projects({projects}){
    return(
        <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">Projects</h2>
            {projects?.map((project) => (
                <div key={project.id} className="bg-white border border-gray-200 p-5 mb-4 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800">{project.title}</h3>
                    <p className="text-gray-600 mb-3">{project.description}</p>
                    <div className="flex gap-2">
                        {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">Demo</a>}
                        
                            <a href={project.code.link} target="_blank" rel="noopener noreferrer" className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-800">
                                {project.code.platform}
                            </a>
                        
                    </div>
                </div>
            ))}
        </section>
    );
} 