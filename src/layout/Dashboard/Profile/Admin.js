import React, { useState } from "react";
import ProfileFormAdmin from "./ProfileFormAdmin";
import ProfilePassAdmin from "./ProfilePassAdmin";

const AdminPage = () => {
  const [isStepOne, setIsStepOne] = useState(false);

  return (
    <>
      {!isStepOne && <ProfilePassAdmin setIsStepOne={setIsStepOne} />}
      {isStepOne && <ProfileFormAdmin />}
    </>
  );
};

export default AdminPage;
