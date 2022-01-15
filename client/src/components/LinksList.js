import { Link } from "react-router-dom";

const LinksList = ({ links }) => {
  if (!links.length) {
    return <p className="center">No links yet</p>;
  }
  return (
    <table className="highlight">
      <thead>
        <tr>
          <th>№</th>
          <th>Full Name</th>
          <th>Short Name</th>
          <th>Active click</th>
        </tr>
      </thead>

      <tbody>
        {links.map((e, i) => {
          return (
            <tr key={e._id}>
              <td>{i + 1}</td>
              <td>{e.from}</td>
              <td>{e.to}</td>
              <td>{<Link to={`/detail/${e._id}`}>Open</Link>}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default LinksList;
