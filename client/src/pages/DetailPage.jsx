import React, { useEffect, useState, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import UseHttp from "../hooks/http.hook";
import AuthContext from "../context/AuthContext";
import Loader from "../components/Loader";
import LinkCard from "../components/LinkCard";

const DetailPage = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = UseHttp();
  const [link, setLink] = useState(false);
  const linkId = useParams().id;

  const getLink = useCallback(async () => {
    try {
      if (linkId === "underfind") {
        return true;
      } else {
        const fetched = await request(`/api/link/${linkId}`, "GET", null, {
          Authorization: `Bearer ${token}`,
        });
        setLink(fetched);
      }
    } catch (e) {}
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loader />;
  }

  return <>{!loading && link && <LinkCard link={link} />}</>;
};

export default DetailPage;
