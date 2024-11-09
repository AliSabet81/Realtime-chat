import { logout } from "@/features";
import { Dispatch } from "react";
import { useDispatch } from "react-redux";

export const Menu = ({
  setShowCreateGroup,
}: {
  setShowCreateGroup: Dispatch<boolean>;
}) => {
  const dispatch = useDispatch();
  return (
    <div className="absolute right-1 z-50 dark:bg-dark_bg_2 dark:text-dark_text_1 shadow-md w-52">
      <ul>
        <li
          onClick={() => setShowCreateGroup(true)}
          className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3"
        >
          <span>New Group</span>
        </li>
        <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>New Community</span>
        </li>{" "}
        <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>Start messages</span>
        </li>{" "}
        <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>Setting</span>
        </li>{" "}
        <li
          className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3"
          onClick={() => dispatch(logout())}
        >
          <span>Logout</span>
        </li>{" "}
      </ul>
    </div>
  );
};
