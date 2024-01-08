import { useState } from "react";

const Header = ({
  onSearch,
  onCreate,
  showUpdateForm,
  showModal,
  user,
  signInForm,
  signUpForm,
  setUser,
}) => {
  const [query, setQuery] = useState("");
  const [isloading, setIsloading] = useState(false);

  async function handleSubmit(e) {
    setIsloading(true);
    e.preventDefault();
    await onSearch(query);
    setIsloading(false);
    setQuery("");
    showModal(false);
  }

  function handleShowForm() {
    onCreate(true);
    showUpdateForm(false);
    showModal(true);
    signInForm(false);
    signUpForm(false);
  }

  return (
    <header className=" bg-sky-500/75 p-5 md:flex items-center justify-items-center justify-between">
      <h1 className="text-4xl m-4 text-center text-white font-bold ">
        {" "}
        Blog AI✍🏽
      </h1>
      <div className="mb-3 md:mb-0">
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            className="p-2 outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <button className="bg-sky-500/75 p-2 text-white" type="submit">
            {isloading ? "wait please" : "search for article"}
          </button>
        </form>
      </div>
      <div className="flex ">
        {user ? (
          <>
            <button
              className="bg-sky-500/75 p-2 text-white"
              onClick={handleShowForm}
            >
              create an article
            </button>
            <button className="bg-sky-500/75 p-2 text-white ml-4">
              create an article with AI ✨
            </button>
            <button
              className="bg-sky-500/75 p-2 text-white ml-4"
              onClick={() => setUser("")}
            >
              Log out ❌
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-sky-500/75 p-2 text-white md:mr-3"
              onClick={() => {
                signUpForm(true);
                signInForm(false);
                showModal(true);
              }}
            >
              create an account for more features 😊
            </button>
            <button
              className="bg-sky-500/75 p-2 text-white"
              onClick={() => {
                signInForm(true);
                signUpForm(false);
                showModal(true);
              }}
            >
              Sign In 🪪
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
