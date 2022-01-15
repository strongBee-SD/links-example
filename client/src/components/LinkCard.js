const LinkCard = ({ link }) => {
  return (
    <>
      <h2>Link</h2>

      <p>
        Your link:
        <a href={link.to} rel="noopener noreferrer" target="_blank">
          {link.to}
        </a>
      </p>

      <p>
        From:
        <a href={link.from} rel="noopener noreferrer" target="_blank">
          {link.from}
        </a>
      </p>

      <p>
        Clicked number: <strong> {link.clicks}</strong>
      </p>

      <p>
        Created date:
        <strong> {new Date(link.date).toLocaleDateString()}</strong>
      </p>
    </>
  );
};
export default LinkCard;
