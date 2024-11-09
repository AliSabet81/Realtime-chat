/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { SideBarHeader } from "./header";
import { Notifications } from "./notifications";
import { Search, SearchResults } from "./search";
import { Conversations } from "./conversations";

export const Sidebar = ({
  onlineUsers,
  typing,
}: {
  onlineUsers: any;
  typing: any;
}) => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="flex0030 max-w-[30%] h-full select-none">
      {/* Sidebar Header */}
      <SideBarHeader />
      {/* Notifications */}
      <Notifications />
      {/* Search */}
      <Search
        searchLength={searchResults.length}
        setSearchResults={setSearchResults}
      />
      {searchResults.length > 0 ? (
        <>
          {/* Search Results */}
          <SearchResults
            searchResults={searchResults}
            setSearchResults={setSearchResults}
          />
        </>
      ) : (
        <>
          {/* Conversations */}
          <Conversations onlineUsers={onlineUsers} typing={typing} />
        </>
      )}
    </div>
  );
};
