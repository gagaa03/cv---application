import CollapsibleSection from "./CollapsibleSection";
import Icon from "@mdi/react";
import { mdiBriefcase, mdiTrashCan, mdiPlusCircle } from '@mdi/js';

function Experience({ data, setData}) {
    const handleChange = (index, field, value) => {
        const newExp = [...data.experience];
        newExp[index][field] = value;
        setData({ ...data, experience: newExp });
    }

    const togglePresent = (index) => {
        const newExp = [...data.experience];
        if (newExp[index].endDate) {
            newExp[index].endDate = ""; // 設為 Present
        } else {
            newExp[index].endDate = new Date().toISOString().slice(0, 10); // 設為今天日期
        }
        setData({ ...data, experience: newExp });
    }

    const addExperience = () => {
        setData({
            ...data,
            experience: [ ...data.experience, {company: "", startDate: "", endDate: "", position: "", description: ""}]
        });
    };

    const removeExperience = (index) => {
        const newExp = data.experience.filter((_, i) => i !== index);
        setData({ ...data, experience: newExp });
    }
  
  
    return (
        <CollapsibleSection title="Work Experience" icon={mdiBriefcase}>
            {data.experience.map((exp, index) => (
                <div key={index} className="multi-item">
                    <label>Company
                        <input value={exp.company} onChange={(e) => handleChange(index, "company", e.target.value)} />
                    </label>

                    <label>Date</label>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                        <input
                            type="date"
                            value={exp.startDate}
                            onChange={(e) => handleChange(index, "startDate", e.target.value)}
                        />
                        <span>-</span>
                        <input
                            type="date"
                            value={exp.endDate || ""}
                            onChange={(e) => handleChange(index, "endDate", e.target.value)}
                        />
                        <button type="button" className="setEndDate" onClick={() => togglePresent(index)}>
                            {exp.endDate ? "Present" : "Set End Date"}
                        </button>
                    </div>

                    <label>Position
                        <input value={exp.position} onChange={(e) => handleChange(index, "position", e.target.value)} />
                    </label>

                    <label>Description
                        <textarea value={exp.description} onChange={(e) => handleChange(index, "description", e.target.value)} />
                    </label>

                    <button type="button" className="remove" onClick={() => removeExperience(index)}><Icon path={mdiTrashCan} size={0.9} /></button>
                    <hr />
                </div>
            ))}
            <button type="button" className="add" onClick={addExperience}>
                <Icon path={mdiPlusCircle} size={0.7} />
                <span>Add Experience</span>
            </button>
        </CollapsibleSection>
  );
}

export default Experience;

