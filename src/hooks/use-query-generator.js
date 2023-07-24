import { useState, useEffect } from 'react';

function useQueryGenerator(initialValues) {
    const [values, setValues] = useState(initialValues);
    const [selectedGroups, setSelectedGroups] = useState([]);

    useEffect(() => {
        // Here you can make the API call to get the selected groups
        // and update the selectedGroups state
    }, []);

    function handleValuesChange(name, value) {
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    }

    function handleSelectedGroupsChange(groups) {
        setSelectedGroups(groups);
    }

    function generateQueryString() {
        const queryString = new URLSearchParams();
        Object.entries(values).forEach(([key, value]) => {
            if (value) {
                if (key === 'group_ides') {
                    selectedGroups.forEach((group, index) => {
                        queryString.append(`group_ides[${index}]`, group.id);
                    });
                } else {
                    queryString.append(key, value);
                }
            }
        });
        return queryString.toString();
    }

    return {
        values,
        selectedGroups,
        handleValuesChange,
        handleSelectedGroupsChange,
        generateQueryString,
    };
}
export default useQueryGenerator;
