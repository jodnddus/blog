import * as React from "react";
import { Link } from "gatsby";
import { imageCropper, rounded } from "./styles.module.css";

const ProfileImage = () => {
  return (
    <div className={imageCropper}>
      <Link to="https://github.com/jodnddus" target="_blank">
        <img
          src="https://avatars.githubusercontent.com/u/26714488?s=400&u=c611104c99aabcd132b933b7a49201acedbb8ff5&v=4"
          className={rounded}
        />
      </Link>
    </div>
  );
};

export default ProfileImage;
