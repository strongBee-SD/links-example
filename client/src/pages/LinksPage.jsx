import { useState, useContext, useCallback, useEffect } from "react";
import UseHttp from "../hooks/http.hook";
import AuthContext from "../context/AuthContext";
import Loader from "../components/Loader";
import LinksList from "../components/LinksList";

const LinksPage = () => {
  const [links, setLinks] = useState(false);
  const { request, loading } = UseHttp();
  const { token } = useContext(AuthContext);

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request("/api/link", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      console.log(fetched);
      setLinks(fetched);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) {
    return <Loader />;
  }

  return <>{!loading && <LinksList links={links} />}</>;
};

export default LinksPage;
