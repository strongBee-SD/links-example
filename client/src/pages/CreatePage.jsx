import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import UseHttp from "../hooks/http.hook";

const CreatePage = () => {
  const [link, setLink] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { request } = UseHttp();

  const pressHandler = async (event) => {
    if (event.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          {
            from: link,
          },
          { Authorization: `Bearer ${auth.token}` }
        );
        navigate(`/detail/${data.link._id}`);
      } catch (e) {}
    }
  };

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "4rem" }}>
        <div className="input-field">
          <input
            placeholder="Please, enter link"
            id="link"
            type="text"
            name="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Link</label>
        </div>
      </div>
    </div>
  );
};
export default CreatePage;
