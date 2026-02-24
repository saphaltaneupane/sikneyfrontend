import ProfileModal from "@/components/dashboard/editprofile";
import React from "react";

const editpage = () => {
  return (
    <div>
      <ProfileModal isOpen={true} onClose={() => {}} />
    </div>
  );
};

export default editpage;
