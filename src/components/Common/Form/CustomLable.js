import React from "react";

function CustomLable({ id, name, weight }) {
  const fontWeight = weight ? "600" : "300";
  const style = {
    alignSelf: "flex-start ",
    marginBottom: "1%",
    fontSize: "13px",
    fontWeight: fontWeight,
  };
  return (
    <label style={style} htmlFor={id}>
      {name}
    </label>
  );
}

export default CustomLable;
