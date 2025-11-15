import { Link } from "react-router-dom";

export default function ProfileCard({
    image = "./../../public/Pfp.jpg",
    id = "unknown",
    firstName = "Anonymous",
    email = "no-email@example.com",
    phone = "N/A",
    bio = "No bio available"
} = {}) {
    return (
        <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
                <Link to={`/profiles/${id}`}><img
                    src={ image? image:"./../../public/Pfp.jpg" } 
                    alt={firstName} 
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                /></Link>
                <h2 className="text-xl font-bold text-center text-gray-800 mb-2">{firstName}</h2>
                <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex items-center">
                        <span className="font-medium">Email:</span> 
                        <span className="ml-2">{email}</span>
                    </p>
                    <p className="flex items-center">
                        <span className="font-medium">Phone:</span> 
                        <span className="ml-2">{phone}</span>
                    </p>
                    <p className="mt-3">
                        <span className="font-medium block mb-1">Bio:</span>
                        <span className="text-gray-700">{bio}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}