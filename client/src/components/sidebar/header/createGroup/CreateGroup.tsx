/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReturnIcon, ValidIcon } from "@/svg";
import { UnderlineInput } from "./UnderlineInput";
import { Dispatch, useState } from "react";
import { MultipleSelect } from "./MultipleSelect";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { createGroupConversation } from "@/features";

export const CreateGroup = ({
  setShowCreateGroup,
}: {
  setShowCreateGroup: Dispatch<boolean>;
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const { status } = useSelector((state: any) => state.chat);

  const [name, setName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const handleSearch = async (e: any) => {
    if (e.target.value && e.key === "Enter") {
      setSearchResults([]);
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/user?search=${e.target.value}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (data.length > 0) {
          const tempArray: any = [];
          data.forEach(
            (user: { _id: string; name: string; picture: string }) => {
              const temp = {
                value: user._id,
                label: user.name,
                picture: user.picture,
              };
              tempArray.push(temp);
            }
          );
          setSearchResults(tempArray);
        } else {
          setSearchResults([]);
        }
      } catch (error: any) {
        console.log(error.response.data.error.message);
      }
    } else {
      setSearchResults([]);
    }
  };
  const createGroupHandler = async () => {
    if (status !== "loading") {
      const users: string[] = [];
      selectedUsers.forEach((user: { value: string }) => {
        users.push(user.value);
      });
      const values = {
        name,
        users,
        token: user.token,
      };

      await dispatch(createGroupConversation(values));
      setShowCreateGroup(false);
    }
  };
  return (
    <div className="createGroupAnimation relative flex0030 h-full z-40">
      {/* Container */}
      <div className="mt-5">
        {/* Return/Close button */}
        <button
          onClick={() => setShowCreateGroup(false)}
          className="btn w-6 h-6 border"
        >
          <ReturnIcon className="fill-white" />
        </button>
        {/* Group name input */}
        <UnderlineInput name={name} setName={setName} />
        {/* Multiple select */}
        <MultipleSelect
          searchResults={searchResults}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          handleSearch={handleSearch}
        />
        {/* Create group button */}
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 ">
          <button
            onClick={() => createGroupHandler()}
            className="btn bg-green_1 scale-100 hover:bg-green-500"
          >
            {status === "loading" ? (
              <ClipLoader color="#E9EDEF" size={25} />
            ) : (
              <ValidIcon className="fill-white mt-2 h-full" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
