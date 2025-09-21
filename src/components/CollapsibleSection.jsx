import { useState } from "react";
import Icon from '@mdi/react';
import { mdiMenuDown } from '@mdi/js';

function CollapsibleSection({ title, icon, children }) {
    const [open, setOpen] = useState(false);

    return (
        <div className={`section ${title.toLowerCase().replace(/\s+/g, '-')}`}>
            <button className="section-header" onClick={() => setOpen(!open)} aria-expanded={open}>
                {icon && <Icon path={icon} size={1} className="section-icon" />}
                <span>{title}</span>
                <Icon path={mdiMenuDown} size={1} className="toggle-icon" />
            </button>
            {open && <div className="section-content">{children}</div>}
        </div>
    );
}

export default CollapsibleSection;