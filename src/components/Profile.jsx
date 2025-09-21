import CollapsibleSection from "./CollapsibleSection";
import { mdiFileAccountOutline } from '@mdi/js';

function Profile({ data, setData}) {
    return (
        <CollapsibleSection title="Profile Summary" icon={mdiFileAccountOutline}>
        <textarea 
            name="profile"
            value={data.profile}
            onChange={(e) => setData({ ...data, profile: e.target.value})}
        />
        </CollapsibleSection>
    );
}

export default Profile;









// export default function Profile() {
//     const [isEditing, setIsEditing] = useState(true);
//     const [profile, setProfile] = useState("");

//     function handleSubmit(e) {
//         e.preventDefault();
//         setIsEditing(false);
//     }

//     return (
//         <div>
//         <h2>Profile Summary</h2>
//         {isEditing ? (
//             <form onSubmit={handleSubmit}>
//             <textarea
//                 rows="5"
//                 value={profile}
//                 onChange={(e) => setProfile(e.target.value)}
//                 placeholder="Write your profile summary here..."
//             />
//             <button type="submit">Submit</button>
//             </form>
//         ) : (
//             <div>
//             <p>{profile}</p>
//             <button onClick={() => setIsEditing(true)}>Edit</button>
//             </div>
//         )}
//         </div>
//     );
// }