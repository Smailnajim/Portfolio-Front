

export default function UserInfo({user}){
    return(
        <section className="text-center bg-gray-50 p-10 rounded-lg mb-8">
            <img src={user.image? user.image: "./../../public/Pfp.jpg"} alt={`${user.firstName} ${user.lastName}`} className="w-32 h-32 rounded-full object-cover mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{user.firstName} {user.lastName}</h1>
            <p className="text-xl text-blue-600 mb-3">{user.role}</p>
            <p className="text-gray-600 mb-4">{user.bio}</p>
            <p className="text-gray-500">Email: {user.email}</p>
            <p className="text-gray-500 mb-4">Phone: {user.phone}</p>
            
            <div className="flex justify-center gap-3">
                {user.reseauxSociaux?.map((social, index) => (
                    <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        {social.platform}
                    </a>
                ))}
            </div>
        </section>
    );
} 