import axios from "axios";

// const posts = [
//   {
//     id: 1,
//     title: "제목 1",
//     content: "내용 1",
//     createdAt: "2025-01-01",
//   },
//   {
//     id: 2,
//     title: "제목 2",
//     content: "내용 2",
//     createdAt: "2025-02-01",
//   },
//   {
//     id: 3,
//     title: "제목 3",
//     content: "내용 3",
//     createdAt: "2025-03-01",
//   },
//   { id: 4, title: "제목 4", content: "내용 4", createdAt: "2025-04-01" },
//   {
//     id: 5,
//     title: "제목 5",
//     content: "내용 5",
//     createdAt: "2025-05-01",
//   },
// ];

export function getPosts() {
  return axios.get("http://localhost:3000/posts");
}

export function getPostById(id) {
  return axios.get(`http://localhost:3000/posts/${id}`);
}

export function createPost(data) {
  return axios.post("http://localhost:3000/posts", data);
}

export function updatePost(id, data) {
  return axios.put(`http://localhost:3000/posts/${id}`, data);
}

export function deletePost(id) {
  return axios.delete(`http://localhost:3000/posts/${id}`);
}
