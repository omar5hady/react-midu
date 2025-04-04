import { useState } from "react";

const TwitterFollowCard = ({
  userName = "unknown",
  children,
  formatUserName,
  initialIsFollowing = false,
}) => {
  const [isFollowing, setFollowing] = useState(initialIsFollowing);

  const text = isFollowing ? "Siguiendo" : "Seguir";
  const buttonClassName = isFollowing
    ? "tw-followCard-button is-following"
    : "tw-followCard-button";
  const imgSrc = `https://unavatar.io/${userName}`;

  const handleClick = () => {
    setFollowing(!isFollowing);
  };

  return (
    <article className="tw-followCard">
      <header className="tw-followCard-header">
        <img
          className="tw-followCard-avatar"
          alt="El avatar de shady"
          src={imgSrc}
        ></img>
        <div className="tw-followCard-info">
          <strong>{children}</strong>
          <span className="tw-followCard-infoUserName">
            {formatUserName(userName)}
          </span>
        </div>
      </header>
      <aside>
        <button onClick={handleClick} className={buttonClassName}>
          <span className="tw-followCard-text">{text}</span>
          <span className="tw-followCard-stopFollow">Dejar de seguir</span>
        </button>
      </aside>
    </article>
  );
};

export default TwitterFollowCard;
