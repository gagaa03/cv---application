import CollapsibleSection from "./CollapsibleSection";
import Icon from "@mdi/react";        
import { mdiCog, mdiTrashCan, mdiPlusCircle } from '@mdi/js';

function Skills({ data, setData }) {
    const handleChange = (index, value) => {
        const newSkills = [...data.skills];
        newSkills[index] = value;
        setData({ ...data, skills: newSkills });
    };

    const addSkill = () => {
        setData({ ...data, skills: [...data.skills, ""] });
    };

    const removeSkill = (index) => {
        const newSkills = data.skills.filter((_, i) => i !== index);
        setData({ ...data, skills: newSkills });
    };

    return (
        <CollapsibleSection title="Skills" icon={mdiCog}>
        {data.skills.map((skill, index) => (
            <div key={index} className="multi-item">
            <input value={skill} onChange={(e) => handleChange(index, e.target.value)} />
            <button type="button" onClick={() => removeSkill(index)}> <Icon path={mdiTrashCan} size={0.7} /> </button>
            </div>
        ))}
        <button type="button" className="add" onClick={addSkill}>
            <Icon path={mdiPlusCircle} size={0.7} />
            <span>Add Skill</span>
        </button>
        </CollapsibleSection>
    );
}

export default Skills;









// import { useState } from "react";

// export default function Skills() {
//     const [isEditing, setIsEditing] = useState(true);
//     const [skills, setSkills] = useState("");

//     function handleSubmit(e) {
//         e.preventDefault();
//         setIsEditing(false);
//     }

//     return (
//         <div>
//         <h2>Skills</h2>
//         {isEditing ? (
//             <form onSubmit={handleSubmit}>
//             <textarea
//                 rows="3"
//                 value={skills}
//                 onChange={(e) => setSkills(e.target.value)}
//                 placeholder="List your skills..."
//             />
//             <button type="submit">Submit</button>
//             </form>
//         ) : (
//             <div>
//             <p>{skills}</p>
//             <button onClick={() => setIsEditing(true)}>Edit</button>
//             </div>
//         )}
//         </div>
//     );
// }