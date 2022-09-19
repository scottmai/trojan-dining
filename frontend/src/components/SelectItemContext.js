import React, { useState } from 'react';

const SelectItemContext = React.createContext();

const SelectItemProvider = (props) => {
    const [selectedItem, setSelectedItem] = useState(null);
    return (
        <SelectItemContext.Provider value={[selectedItem, setSelectedItem]}>
            {props.children}
        </SelectItemContext.Provider>
    );
}

export { SelectItemContext, SelectItemProvider };

