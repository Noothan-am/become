import React, { useEffect, useState } from "react";
const coinImage = require("../assets/svg/big-coin.svg").default;
const style = require("../styles/leaderboard.module.css").default;

function Leaderboard({ user }: any) {
  return (
    <>
      <div className={style["leaderboard-single-person"]}>
        <div className={style["leaderboard-number"]}>1</div>
        <div className={style["leaderboard-name"]}>{user.name}</div>
      </div>
    </>
  );
}

function LeaderBoardWithCoin({ userDetails }: any) {
  const [leaderboardUsers, setLeaderboardUsers] = useState<any>([]);
  const [count, setCount] = useState<any>(0);
  const fetchAllUserDetails = async () => {
    try {
      const response: any = await fetch(
        `${process.env.REACT_APP_API_URL}/all-user`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Error while fetching users");
      if (response) {
        const jsonData = await response.json();
        const data = jsonData
          .map((eachData: any) => {
            return eachData;
          })
          .sort((a: any, b: any) => b.coins - a.coins);
        setLeaderboardUsers([data[0], data[1]]);
      }
    } catch (err) {
      console.log("Error while fetching users");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllUserDetails()
      .then(() => {
        console.log("User details fetched");
      })
      .catch((error) => {
        console.log("Error in fetching user details", error);
      });
  }, []);

  return (
    <>
      <div className={style["profile__firstpart"]}>
        <div className={style["profile__firstpart-coins"]}>
          <div className={style["coins__content"]}>
            <img src={coinImage} alt="" />
            <div className={style["total__coins"]}>{userDetails.coins}</div>
          </div>
          <div className={style["coins_text"]}>My Coins</div>
        </div>
        <div className={style["profile__firstpart-leaderboard"]}>
          <div className={style["leaderboard-heading"]}>LEADERBOARD</div>
          <div className={style["leaderboard-members"]}>
            {leaderboardUsers.map((eachUser: any) => {
              return <Leaderboard user={eachUser} count={count} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default LeaderBoardWithCoin;
