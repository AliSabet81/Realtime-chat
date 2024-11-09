import { Contact } from "./Contact";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const SearchResults = ({
  searchResults,
  setSearchResults,
}: {
  searchResults: any;
  setSearchResults: any;
}) => {
  return (
    <div className="w-full convos scrollbar">
      <div>
        {/* Heading */}
        <div className="flex flex-col px-8 pt-8">
          <h1 className="font-extralight text-md text-green_2">Contacts</h1>
          <span className="w-full mt-4 ml-10 border-b dark:border-b-dark_border_1"></span>
        </div>
        {/* Results */}
        <ul>
          {searchResults &&
            searchResults.map((user: any) => (
              <Contact contact={user} key={user._id} setSearchResults={setSearchResults}/>
            ))}
        </ul>
      </div>
    </div>
  );
};
