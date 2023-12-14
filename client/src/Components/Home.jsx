import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthProvider";
import axios from "../api/axios";
import Post from "./Post";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

export default function Homepage() {
  const [tweetText, setTweetText] = useState("");
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const handleTweet = () => {
    if (tweetText.trim() === "") return;
    axios
      .post("/tweet", { tweetText }, { withCredentials: true })
      .then((response) => {
        setTweetText("");
        toast.info("Your post was sent");
        setPosts((prev) => [response.data.newTweet, ...prev]);
      })
      .catch((error) => {
        toast.error("Error posting tweet ! ");
      });
  };

  const handleLogout = () => {
    axios
      .get("/auth/logout", { withCredentials: true })
      .then((response) => {
        localStorage.removeItem("loggedIn");
        setAuth({});
        navigate("/login");
      })
      .catch((error) => console.error("Failed to logout:", error));
  };

  useEffect(() => {
    axios
      .get("/tweet", { withCredentials: true })
      .then((response) => {
        setPosts(response.data.tweets);
      })
      .catch((error) => console.error("Failed to fetch tweet:", error));
  }, []);

  return (
    <div className="bg-black min-h-screen text-white md:flex justify-center">
      <div className="md:border-l md:border-r border-gray-800 md:w-[650px]">
        <header className=" px-5 py-3  sticky flex justify-between items-center ">
          <p className="font-medium md:text-lg">{auth?.displayName}</p>
          <button onClick={handleLogout} className="text-gray-400">
            Logout
          </button>
        </header>
        <Toaster richColors position="top-center" />
        <main>
          {/* Photo section open */}
          <section>
            <div className="relative">
              <div className="bg-gray-700 h-36 md:h-48">
                <img
                  src={auth?.coverPhoto?.replace("_normal", "")}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="ml-4 flex justify-center items-end absolute -bottom-12 left-0 w-24 md:w-28 h-24 md:h-28 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <img
                  src={auth?.profileImageUrl?.replace("_normal", "")}
                  alt="Profile picture"
                  className="w-full h-full object-cover"
                />{" "}
              </div>
            </div>
          </section>
          {/* Photo section close */}

          {/* Info section open */}

          <section className="mt-10 p-5">
            <h1 className="font-bold text-lg">{auth?.displayName}</h1>
            <p className="text-gray-500">{auth?.username}</p>
            <p className="mt-2 text-sm">{auth?.bio}</p>
            <div className="flex items-center gap-1 mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>
              <p className=" text-gray-500">
                Joined at{" "}
                {new Date(auth?.joinedDate).toLocaleString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </section>
          {/* Info section close */}

          {/* Post Section */}

          <section>
            <div className="border-b border-blue-500 px-5 py-2">
              <p className="font-semibold">Posts</p>
            </div>

            {/* post adding form */}
            <div className="px-5 pt-4 border-b border-gray-500">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <img
                    src={auth?.profileImageUrl}
                    alt="Profile picture"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <textarea
                  type="text"
                  onChange={(e) => setTweetText(e.target.value)}
                  value={tweetText}
                  className="bg-black  outline-none placeholder:text-lg w-full border-b border-gray-800"
                  placeholder="What is happening?!"
                />
              </div>
              <div className="flex justify-end py-2">
                <button
                  onClick={handleTweet}
                  disabled={tweetText.trim() === ""}
                  className="bg-blue-500 px-4 text-sm py-1 rounded-2xl flex justify-center items-center font-semibold disabled:bg-blue-300"
                >
                  Post
                </button>
              </div>
            </div>
            {/* post adding form close */}
          </section>

          {/* Post Section close */}

          <section>
            {posts?.map((post, i) => {
              return <Post key={post._id} post={post} setPosts={setPosts} />;
            })}
          </section>
        </main>
      </div>
    </div>
  );
}
