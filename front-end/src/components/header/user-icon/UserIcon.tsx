import { MdFace } from "react-icons/md";
import styles from "./UserIcon.module.css";
import { User } from "../../../models/User";
export const UserIcon = ({ user }: { user?: User }) => {
  return (
    <div className="flex flex-1 items-center justify-center gap-3 ml-3 mr-4">
      {user?.name && <span className="text-white text-md">{user.name}</span>}

      <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full overflow-hidden">
        {user?.profilePicSrc && <img src={user.profilePicSrc} />}
        {!user?.profilePicSrc && <MdFace />}
      </div>
    </div>
  );
};
