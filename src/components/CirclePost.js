import React, { useState } from "react";
import { Link } from "react-router-dom";

import styled, { StyleSheetManager } from "styled-components";
import { HeartFilled, CommentOutlined } from "@ant-design/icons";

import "../styles/CirclePost.css";
import PlaceholderPicture from "./PlaceholderPicture";

function CirclePost({
  circleNameVisible,
  circleName,
  postTitle,
  postText,
  posted,
  numLikes,
  numComments,
  circleId,
  postId,
}) {
  return (
    <div style={{ width: "750px" }}>
      <Link
        to={{
          pathname: "/my-circles/" + circleId + "/" + postId + "/comments",
          circleName: circleName,
          state: {
            circleName: circleName,
            circleId: circleId,
            postTitle: postTitle,
            postId: postId,
          },
        }}
        onClick={() => console.log("clicked")}
      >
        <h3 style={{ textAlign: "left" }}>
          {circleNameVisible === true ? circleName : null}
        </h3>

        <CircleCard>
          <div style={styles.wrapper}>
            <div style={styles.userWrapper}>
              <ProfileCard>
                {/* Profile and user details*/}
                {/* temp holder for profile pic */}
                <PlaceholderPicture
                  height={"40px"}
                  width={"40px"}
                  name={"john"}
                />

                {/* to input profile details */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                  }}
                  className="profileitems"
                >
                  <ProfileName className="profilename">John Doe</ProfileName>
                  <ProfileInfo className="profileinfo">
                    Y3 Information Systems
                  </ProfileInfo>
                </div>
              </ProfileCard>
            </div>
            {/* Right side for when Circles post was posted*/}
            <div
              style={{
                flexDirection: "row-reverse",
                display: "flex",
                textAlign: "right",
              }}
            >
              {posted}
            </div>
          </div>

          <h4 style={{ textAlign: "left", paddingBottom: "15px" }}>
            {postTitle}
          </h4>
          <p style={{ textAlign: "left", paddingBottom: "10px" }}>{postText}</p>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {/* Bottom Row (Likes and comments) */}
            <div style={styles.bottomRowWrapper}>
              <HeartFilled style={styles.heartStyles} />
              <text style={styles.textStyle}>{numLikes}</text>

              <CommentOutlined style={styles.commentStyle} />

              <text style={styles.textStyle}>{numComments}</text>
            </div>
          </div>
        </CircleCard>
      </Link>
    </div>
  );
}

const CircleCard = styled.div`
  background-color: var(--base-0);
  border-radius: var(--br-lg);
  width: 750px;
  box-shadow: var(--shadow);
  margin-bottom: 36px;
  padding: 16px;
`;

const ProfileCard = styled.div`
  min-width: 200px;
  display: flex;
  flex-direction: row;

  &:hover {
    cursor: pointer;
    text-shadow: 1px 1px 10px var(--accent-lightpink);
    .profilename {
      color: var(--accent-darkpink);
    }
    .profileinfo {
      color: var(--accent-lightpink);
    }
    .profilepicture {
      box-shadow: var(--shadow);
    }
  }
`;

const ProfileName = styled.span`
  font-size: var(--fs-b4);
  color: var(--base-100);
`;

const ProfileInfo = styled.span`
  font-size: var(--fs-b3);
  color: var(--base-20);
`;

const styles = {
  wrapper: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    paddingBottom: "20px",
    overflowX: "hidden",
  },
  userWrapper: {
    flexDirection: "row",
    display: "flex",
  },
  bottomRowWrapper: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingRight: "10px",
    display: "flex",
    alignItems: "center",
  },
  heartStyles: {
    color: "#D25864",
    fontSize: "20px",
    paddingRight: "10px",
  },
  textStyle: {
    color: "#D25864",
    fontSize: 16,
    paddingRight: "30px",
  },
  commentStyle: {
    color: "#D25864",
    fontSize: "20px",
    paddingRight: "15px",
  },
};
export default CirclePost;
