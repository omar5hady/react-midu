import { useState } from "react";
import "./App.css";
import TwitterFollowCard from "./TwitterFollowCard";

export const App = () => {
  const addAt = (userName) => `@${userName}`;

  const users = [
    {
      userName: "midudev",
      name: "Miguel Duran",
      isFollowing: false,
    },
    {
      userName: "omar5hady",
      name: "Omar Shady",
      isFollowing: true,
    },
    {
      userName: "pegchan",
      name: "Miguel Malaquias",
      isFollowing: true,
    },
    {
      userName: "karengwaifu",
      name: "Karen",
      isFollowing: false,
    },
  ];

  return (
    <section className="App">
      {users.map(({userName, name, isFollowing}) => (
        <TwitterFollowCard key={userName}
          formatUserName={addAt}
          userName={userName}
          initialIsFollowing={isFollowing}
        >
          {name}
        </TwitterFollowCard>
      ))}
    </section>
  );
};
