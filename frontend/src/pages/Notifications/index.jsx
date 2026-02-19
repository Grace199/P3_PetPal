import React, { useState, useEffect, useMemo } from "react";
import NotificationRow from "../../components/NotificationRow";
import { ajax_or_login } from "../../util/ajax";
import { useNavigate, useSearchParams } from "react-router-dom";

const Index = () => {
  const [notifications, setNotifications] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [unreadFilter, setUnread] = useState(false);
  const [notifDelete, setDelete] = useState(false);
  const [allFilter, setAll] = useState(true);
  const [readFilter, setRead] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      const queryString = constructQueryString(query);
      const rest = await ajax_or_login(
        `/notification/${queryString ? `?${queryString}` : ""}`,
        { method: "GET" },
        navigate
      );
      if (rest.ok) {
        const data = await rest.json();
        setTotalPage(Math.max(1, Math.ceil(data.count / 20)));
        setNotifications(data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const constructQueryString = (params) => {
    return new URLSearchParams(params).toString();
  };

  const query = useMemo(
    () => ({
      is_read: searchParams.get("is_read") ?? "",
      sort: searchParams.get("sort") ?? "newest",
      page: parseInt(searchParams.get("page") ?? 1),
    }),
    [searchParams]
  );

  const handleUnreadChange = () => {
    if (!unreadFilter) {
      setUnread(true);
      setAll(false);
      setRead(false);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("is_read", false);
      setSearchParams(newSearchParams);
    }
  };
  const handleAllChange = () => {
    if (!allFilter) {
      setUnread(false);
      setAll(true);
      setRead(false);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("is_read", "");
      setSearchParams(newSearchParams);
    }
  };
  const handleReadChange = () => {
    if (!readFilter) {
      setUnread(false);
      setAll(false);
      setRead(true);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("is_read", true);
      setSearchParams(newSearchParams);
    }
  };
  const handleSortChange = (event) => {
    const newSortValue = event.target.value;
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("sort", newSortValue);
    setSearchParams(newSearchParams);
  };

  function formatDate(timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    fetchNotifications();
    setDelete(false);
  }, [query, notifDelete]);

  return (
    <main>
      <div className="rounded-t-3xl bg-primary h-24 flex justify-center items-center xl:mx-desktop md:mx-tablet mx-mobile mt-12">
        <h1 className="text-4xl font-bold text-background max-sm:text-3xl">
          Notifications
        </h1>
      </div>
      <table className=" bg-secondary h-14 flex justify-center items-center xl:mx-desktop md:mx-tablet mx-mobile text-base max-sm:text-xs">
        <tbody className="w-full">
          <tr className="flex justify-around items-center">
            <td className="basis-1/4 flex justify-center items-center text-center ">
              <button
                className={`${
                  allFilter ? "bg-background-secondary" : null
                } hover:bg-background-secondary md:w-20 w-12 h-8 rounded-lg transition ease-in-out`}
                onClick={handleAllChange}
              >
                All
              </button>
            </td>
            <td className="basis-1/4 flex justify-center items-center text-center">
              <button
                className={`${
                  unreadFilter ? "bg-background-secondary" : null
                } hover:bg-background-secondary md:w-20 w-12 h-8 rounded-lg transition ease-in-out`}
                onClick={handleUnreadChange}
              >
                Unread
              </button>
            </td>
            <td className="basis-1/4 flex justify-center items-center text-center">
              <button
                className={`${
                  readFilter ? "bg-background-secondary" : null
                } hover:bg-background-secondary md:w-20 w-12 h-8 rounded-lg transition ease-in-out`}
                onClick={handleReadChange}
              >
                Read
              </button>
            </td>
            <td className="basis-1/4 flex justify-center items-center text-center">
              <select
                name="sort"
                value={query.sort}
                className="text-center flex justify-center items-center col-span-2 rounded-lg md:w-20 w-12 h-8 placeholder-[#ffffffce] cursor-pointer bg-background-secondary focus:outline-none"
                onChange={handleSortChange}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="w-full">
        {notifications &&
          notifications.map((notification) => (
            <NotificationRow
              msg={notification?.msg}
              creation_date={formatDate(notification?.creation_time)}
              is_read={notification?.is_read}
              url={notification?.url}
              ID={notification?.id}
              key={notification?.id}
              setDelete={setDelete}
            />
          ))}
      </div>
      <div className="w-full flex justify-center items-center gap-5 pt-16">
        {query.page > 1 ? (
          <button
            className="bg-transparent border border-primary text-primary font-bold px-5 py-3 rounded-xl hover:scale-105 active:scale-95"
            onClick={() => {
              const newPage = query.page - 1;
              const newSearchParams = new URLSearchParams(searchParams);
              newSearchParams.set("page", newPage);
              setSearchParams(newSearchParams);
            }}
          >
            Prev
          </button>
        ) : (
          <button className="bg-transparent border border-secondary text-secondary font-bold px-5 py-3 rounded-xl">
            Prev
          </button>
        )}

        <p>
          Page {query.page} of {totalPage}
        </p>

        {query.page < totalPage ? (
          <button
            className="bg-transparent border border-primary text-primary font-bold px-5 py-3 rounded-xl hover:scale-105 active:scale-95"
            onClick={() => {
              const newPage = query.page + 1;
              const newSearchParams = new URLSearchParams(searchParams);
              newSearchParams.set("page", newPage);
              setSearchParams(newSearchParams);
            }}
          >
            Next
          </button>
        ) : (
          <button className="bg-transparent border border-secondary text-secondary font-bold px-5 py-3 rounded-xl">
            Next
          </button>
        )}
      </div>
    </main>
  );
};

export default Index;
