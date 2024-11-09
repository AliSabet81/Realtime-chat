/* eslint-disable @typescript-eslint/no-explicit-any */
import Select from "react-select";

export const MultipleSelect = ({
  searchResults,
  setSelectedUsers,
  handleSearch,
}: any) => {
  return (
    <div className="mt-4">
      <Select
        isMulti
        options={searchResults}
        onChange={setSelectedUsers}
        onKeyDown={(e) => handleSearch(e)}
        placeholder="Search, select users"
        formatOptionLabel={(user: { label: string; picture: string }) => (
          <div className="flex items-center gap-1">
            <img src={user.picture} alt="" className="w-8 h-8 rounded-full" />
            <span className="text-[#222]">{user.label}</span>
          </div>
        )}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            border: "none",
            borderColor: "transparent",
            background: "transparent",
            color: "white",
          }),
        }}
      />
    </div>
  );
};
