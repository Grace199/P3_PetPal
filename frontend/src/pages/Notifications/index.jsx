import { useState, useEffect, useMemo } from "react";
import NotificationRow from "../../components/NotificationRow";
import { ajax_or_login } from "../../util/ajax";
import { useNavigate, useSearchParams } from "react-router-dom";

const Index = () => {
  const [notifications, setNotifications] = useState([]);
  const [totalPage, setTotalPage] = useState(1);

  // Instead of notifDelete boolean, use a refresh key you bump after deletes
  const [refreshKey, setRefreshKey] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = useMemo(() => {
    const pageRaw = searchParams.get("page");
    const page = Number(pageRaw ?? 1);

    return {
      // "", "true", or "false"
      is_read: searchParams.get("is_read") ?? "",
      sort: searchParams.get("sort") ?? "newest",
      page: Number.isFinite(page) && page > 0 ? page : 1,
    };
  }, [searchParams]);

  const isAll = query.is_read === "";
  const isUnread = query.is_read === "false";
  const isRead = query.is_read === "true";

  const constructQueryString = (params) => {
    const sp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== "" && v !== null && v !== undefined) sp.set(k, String(v));
    });
    return sp.toString();
  };

  const setIsReadFilter = (value) => {
    const next = new URLSearchParams(searchParams);

    if (value === "") next.delete("is_read");
    else next.set("is_read", value); // "true" or "false"

    next.set("page", "1");
    setSearchParams(next);
  };

  const handleUnreadChange = () => setIsReadFilter("false");
  const handleAllChange = () => setIsReadFilter("");
  const handleReadChange = () => setIsReadFilter("true");

  const handleSortChange = (event) => {
    const next = new URLSearchParams(searchParams);
    next.set("sort", event.target.value);
    next.set("page", "1");
    setSearchParams(next);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const qs = constructQueryString(query);

        const res = await ajax_or_login(
          `/notification/${qs ? `?${qs}` : ""}`,
          { method: "GET" },
          navigate
        );

        if (!res.ok) return;

        const data = await res.json();
        setTotalPage(Math.max(1, Math.ceil((data.count ?? 0) / 20)));
        setNotifications(Array.isArray(data.results) ? data.results : []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotifications();
  }, [query, refreshKey, navigate]);

  return (
    <main>
      <div className="rounded-t-3xl bg-primary h-24 flex justify-center items-center xl:mx-desktop md:mx-tablet mx-mobile mt-12">
        <h1 className="text-4xl font-bold text-background max-sm:text-3xl">
          Notifications
        </h1>
      </div>

      <table className="bg-secondary h-14 flex justify-center items-center xl:mx-desktop md:mx-tablet mx-mobile text-base max-sm:text-xs">
        <tbody className="w-full">
          <tr className="flex justify-around items-center">
            <td className="basis-1/4 flex justify-center items-center text-center">
              <button
                className={`${isAll ? "bg-background-secondary" : ""} hover:bg-background-secondary md:w-20 w-12 h-8 rounded-lg transition ease-in-out`}
                onClick={handleAllChange}
              >
                All
              </button>
            </td>

            <td className="basis-1/4 flex justify-center items-center text-center">
              <button
                className={`${isUnread ? "bg-background-secondary" : ""} hover:bg-background-secondary md:w-20 w-12 h-8 rounded-lg transition ease-in-out`}
                onClick={handleUnreadChange}
              >
                Unread
              </button>
            </td>

            <td className="basis-1/4 flex justify-center items-center text-center">
              <button
                className={`${isRead ? "bg-background-secondary" : ""} hover:bg-background-secondary md:w-20 w-12 h-8 rounded-lg transition ease-in-out`}
                onClick={handleReadChange}
              >
                Read
              </button>
            </td>

            <td className="basis-1/4 flex justify-center items-center text-center">
              <select
                name="sort"
                value={query.sort}
                className="text-center flex justify-center items-center col-span-2 rounded-lg md:w-20 w-12 h-8 cursor-pointer bg-background-secondary focus:outline-none"
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
        {notifications.map((notification) => (
          <NotificationRow
            key={notification?.id}
            msg={notification?.msg}
            creation_date={formatDate(notification?.creation_time)}
            is_read={notification?.is_read}
            url={notification?.url}
            ID={notification?.id}
            // child calls this after successful delete:
            setDelete={() => setRefreshKey((k) => k + 1)}
          />
        ))}
      </div>

      <div className="w-full flex justify-center items-center gap-5 pt-16">
        {query.page > 1 ? (
          <button
            className="bg-transparent border border-primary text-primary font-bold px-5 py-3 rounded-xl hover:scale-105 active:scale-95"
            onClick={() => {
              const next = new URLSearchParams(searchParams);
              next.set("page", String(query.page - 1));
              setSearchParams(next);
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
              const next = new URLSearchParams(searchParams);
              next.set("page", String(query.page + 1));
              setSearchParams(next);
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