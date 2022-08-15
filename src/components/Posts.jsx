import axios from "axios";
import React, { useEffect, useState } from "react";

const Posts = () => {
  const [data, setData] = useState(null);
  const [userInput, setUserInput] = useState({ title: "", body: "" });

  // input Onchange
  const userInputHandler = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  // 데이터 가져오기(get)
  const getData = async () => {
    const res = await axios.get("http://localhost:8000/posts");
    setData(res.data);
  };

  // 글쓰기 post(생성)
  const postData = async () => {
    const res = await axios.post("http://localhost:8000/posts", userInput);
    console.log(res.data);
    getData();
  };

  // 삭제 고유한 id값 필요!!!
  const deleteData = async (id) => {
    const res = await axios.delete(`http://localhost:8000/posts/${id}`);
    getData();
  };
  // put 수정
  const putData = async (id) => {
    const res = await axios.put(`http://localhost:8000/posts/${id}`, userInput);
    getData();
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      Posts
      {data &&
        data.map((item) => (
          <p key={item.id}>
            {item.body}
            <button onClick={() => deleteData(item.id)}>삭제</button>
            <button onClick={() => putData(item.id)}>수정</button>
          </p>
        ))}
      <input type="text" name="title" onChange={userInputHandler} />
      <input type="text" name="body" onChange={userInputHandler} />
      <button onClick={postData}>글쓰기</button>
    </div>
  );
};

export default Posts;
