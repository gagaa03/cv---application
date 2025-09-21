import CollapsibleSection from "./CollapsibleSection";
import Icon from "@mdi/react";
import { mdiSchool, mdiTrashCan, mdiPlusCircle } from '@mdi/js';

function Education({ data, setData }) {
    const handleChange = (index, field, value) => {
        const newEdu = [...data.education];
        newEdu[index][field] = value;
        setData({ ...data, education: newEdu });
    };


    const togglePresent = (index) => {
        const newEdu = [...data.education];
        if (newEdu[index].endDate) {
            newEdu[index].endDate = ""; // 設為 Present
        } else {
            newEdu[index].endDate = new Date().toISOString().slice(0, 10); // 設為今天日期
        }
        setData({ ...data, education: newEdu });
    }


    const addEducation = () => {
        setData({
        ...data,
        education: [...data.education, { school: "", startDate: "", endDate: "", degree: "", major: "", description: "" }]
        });
    };

    const removeEducation = (index) => {
        const newEdu = data.education.filter((_, i) => i !== index);
        setData({ ...data, education: newEdu });
    };

    return (
        <CollapsibleSection title="Education" icon={mdiSchool}>
        {data.education.map((edu, index) => (
            <div key={index} className="multi-item">
            <label>School
                <input value={edu.school} onChange={(e) => handleChange(index, "school", e.target.value)} />
            </label>

            <label>Date</label>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input
                    type="date"
                    value={edu.startDate}
                    onChange={(e) => handleChange(index, "startDate", e.target.value)}
                />
                <span>-</span>
                <input
                    type="date"
                    value={edu.endDate || ""}
                    onChange={(e) => handleChange(index, "endDate", e.target.value)}
                />
                <button type="button" className="setEndDate" onClick={() => togglePresent(index)}>
                    {edu.endDate ? "Present" : "Set End Date"}
                </button>
            </div>

            <label>Degree
                <input value={edu.degree} onChange={(e) => handleChange(index, "degree", e.target.value)} />
            </label>
            <label>Major
                <input value={edu.major} onChange={(e) => handleChange(index, "major", e.target.value)} />
            </label>
            <label>Description
                <input value={edu.description} onChange={(e) => handleChange(index, "description", e.target.value)} />
            </label>
            <button type="button" className="remove" onClick={() => removeEducation(index)}><Icon path={mdiTrashCan} size={0.9} /></button>
            <hr />
            </div>
        ))}
        <button type="button" className="add" onClick={addEducation}>
            <Icon path={mdiPlusCircle} size={0.7} />
            <span>Add Education</span>
        </button>
        </CollapsibleSection>
    );
    }
export default Education;
