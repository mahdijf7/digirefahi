import React, { useState } from 'react';

const ChartContext = React.createContext({
    selectedNode: {},
    selectNode: (node) => {},
});

export const ChartContextProvider = (props) => {
    const [selectedNode, setSelectedNode] = useState({});

    const selectNode = (node) => { 
        setSelectedNode(selectedNode && node.id === selectedNode.id ? {} : node);
    };

    const context = {
        selectedNode: selectedNode,
        selectNode: selectNode,
    };

    return <ChartContext.Provider value={context}>{props.children}</ChartContext.Provider>;
};

export default ChartContext;
