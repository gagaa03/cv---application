import CollapsibleSection from "./CollapsibleSection";
import { mdiAccountTie } from '@mdi/js';

function GeneralInfo({ data, setData }) {
    const handleChange = (e) => {
        setData({ ...data, [e.target.name] : e.target.value})
    }

    return (
        <CollapsibleSection title="Personal Information" icon={mdiAccountTie}>
            <label>
                First Name
                <input
                    type="text"
                    name="firstName"
                    value={data.firstName}
                    onChange={handleChange}
                />
            </label>
            <label>
                Last Name
                <input
                    type="text"
                    name="lastName"
                    value={data.lastName}
                    onChange={handleChange}
                />
            </label>
            <label>
                M.I.
                <input
                    type="text"
                    name="middleInitial"
                    value={data.middleInitial}
                    onChange={handleChange}
                />
            </label>
            <label>
                Job Title
                <input
                    type="text"
                    name="jobTitle"
                    value={data.jobTitle}
                    onChange={handleChange}
                />
            </label>
            <label>
                Phone
                <input
                    type="text"
                    name="phone"
                    value={data.phone}
                    onChange={handleChange}
                />
            </label>
            <label>
                Email
                <input 
                    type="text" 
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                />
            </label>
            <label>
                Github
                <input 
                    type="text" 
                    name="github"
                    value={data.github}
                    onChange={handleChange}
                />
            </label>
            <label>
                Personal Website
                <input 
                    type="text" 
                    name="website"
                    value={data.website}
                    onChange={handleChange}
                />
            </label>
            <label>
                Location
                <input 
                    type="text" 
                    name="location"
                    value={data.location}
                    onChange={handleChange}
                />
            </label>
        </CollapsibleSection>
    );
}

export default GeneralInfo;



