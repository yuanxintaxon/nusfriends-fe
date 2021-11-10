import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import { Col, Row, Layout, Button, Spin } from "antd";
import {
  PlusOutlined,
  HeartFilled,
  ConsoleSqlOutlined,
} from "@ant-design/icons";

import styled from "styled-components";

import ContainerHeader from "../components/ContainerHeader";
import CreateCommentModal from "../components/CreateCommentModal";
import CommentsCard from "../components/CommentsCard";
import SideBar from "../components/SideBar";

import axios from "axios";
import { Url } from "../constants/global";

function Comments(props) {
  const { Sider, Content } = Layout;

  let { circleId } = useParams();
  let { postId } = useParams();

  const location = useLocation();
  const [modalVisible, setModalVisible] = useState(false);

  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [circle, setCircle] = useState();
  const [loading, setLoading] = useState(true);

  const openCreateModal = () => setModalVisible(true);
  function closeCreateModal() {
    setModalVisible(false);
  }

  const loadPageData = async () => {
    try {
      await axios.get(`${Url}/circles/circleId/${circleId}`).then((res) => {
        setCircle(res.data[0]);
        headData.breadcrumbData[1].name = res.data[0].name;
      });
      await axios.get(`${Url}/posts/${postId}`).then((res) => {
        setPost(res.data[0]);
        headData.breadcrumbData[2].name = res.data[0].title;
      });
      await axios.get(`${Url}/comments/post/${postId}`).then((res) => {
        setComments(res.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPageData();
  }, []);

  /* START -- SETUP FOR COMPONENT */
  const tabData = [
    {
      icon: "CommentOutlined",
      title: "All Posts",
      path: "/my-circles/" + circleId + "/all-posts",
    },
    {
      icon: "TrophyOutlined",
      title: "Leaderboard",
      path: "/my-circles/replace by id/leaderboard",
    },
  ];

  const [headData, setHeadData] = useState({
    breadcrumbData: [
      {
        name: "My Circles",
        path: "/my-circles",
      },
      {
        name: "placeholder",
        path: "/my-circles/" + circleId + "/all-posts",
      },
      {
        name: "placeholder",
        path: "this can be empty",
      },
    ],
  });
  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <Layout
          style={{ height: "100vh", backgroundColor: "var(--accent-bg)" }}
        >
          <Sider style={{ backgroundColor: "var(--accent-bg)" }}>
            <SideBar tabData={tabData} />
          </Sider>
          <Content style={{ backgroundColor: "var(--accent-bg)" }}>
            <Row justify="start">
              <Col style={{ marginLeft: 100 }}>
                <ContainerHeader headData={headData} />
              </Col>
            </Row>

            <Row
              justify="start"
              style={{
                display: "flex",
                flexDirection: "row",
                width: "90%",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  marginLeft: "auto",
                }}
              >
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={openCreateModal}
                >
                  Comment
                </Button>
                <CreateCommentModal
                  modalVisible={modalVisible}
                  closeCreateModal={closeCreateModal}
                  postId={postId}
                />
              </div>
            </Row>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <CommentsCard
                type="post"
                title={post.title}
                description={post.content}
                likes={post.likes}
                comments={post.comments}
                posted={post.userid}
                postedName={post.name}
                postedClassification={post.classification}
                postedPhoto={post.photo}
                id={post.postid}
                posterId={post.userid}
              />

              {comments.map((comment) => (
                <CommentsCard
                  type="comment"
                  description={comment.content}
                  likes={comment.likes}
                  posted={comment.userid}
                  postedName={comment.name}
                  postedClassification={comment.classification}
                  postedPhoto={comment.photo}
                  id={comment.commentid}
                  posterId={comment.userid}
                />
              ))}
            </div>
          </Content>
        </Layout>
      )}
    </div>
  );
}

export default Comments;
