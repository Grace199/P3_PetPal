import { useState, useEffect, useMemo } from "react";
import NotificationRow from "../../components/NotificationRow";
import { ajax_or_login } from "../../util/ajax";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination";

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
        <h1 className="text-4xl font-bold text-white max-sm:text-3xl">
          Notifications
        </h1>
      </div>

      {/* Filter + sort bar */}
      <div className="bg-background-secondary xl:mx-desktop md:mx-tablet mx-mobile px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 p-1 bg-white rounded-full">
          {[
            { label: "All", active: isAll, onClick: handleAllChange },
            { label: "Unread", active: isUnread, onClick: handleUnreadChange },
            { label: "Read", active: isRead, onClick: handleReadChange },
          ].map((tab) => (
            <button
              key={tab.label}
              onClick={tab.onClick}
              className={`text-sm font-semibold px-4 sm:px-5 py-1.5 rounded-full transition duration-200 ${
                tab.active ? "bg-primary text-white" : "text-text/70 hover:text-text"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <select
            name="sort"
            value={query.sort}
            className="appearance-none cursor-pointer bg-white text-text font-medium text-sm py-2 pl-4 pr-9 rounded-full border border-black/10 focus:border-primary focus:outline-none"
            onChange={handleSortChange}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
          <i className="uil uil-angle-down absolute right-2.5 top-1/2 -translate-y-1/2 text-text/50 pointer-events-none text-lg"></i>
        </div>
      </div>

      <div className="xl:mx-desktop md:mx-tablet mx-mobile">
        {notifications.length > 0 ? notifications.map((notification) => (
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
        )) : (
          <p className="text-center text-text/60 py-16">
            {isUnread ? "No unread notifications." : isRead ? "No read notifications." : "You have no notifications."}
          </p>
        )}
      </div>

      <div className="pb-16">
        <Pagination
          page={query.page}
          totalPages={totalPage}
          onChange={(p) => {
            const next = new URLSearchParams(searchParams);
            next.set("page", String(p));
            setSearchParams(next);
          }}
        />
      </div>
    </main>
  );
};

export default Index;