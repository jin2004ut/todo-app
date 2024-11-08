import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { LIST_TODOS } from "./graphql/Query";
import { CREATE_TODO, UPDATE_TODO, DELETE_TODO } from "./graphql/Mutation";
import Button from "aws-northstar/components/Button";
import Container from "aws-northstar/layouts/Container";
import Form from "aws-northstar/components/Form";
import FormField from "aws-northstar/components/FormField";
import Header from "aws-northstar/components/Header";
import Input from "aws-northstar/components/Input";
import Modal from "aws-northstar/components/Modal";
import Textarea from "aws-northstar/components/Textarea";
import { DatePicker } from "aws-northstar";

const UpdateModal = ({todo, handleUpdate, visible, setVisible}) => {
  const [title, setTitle] = useState(todo.title);
  const [cont, setCont] = useState(todo.content);
  const [dead, setDead] = useState(todo.deadline)
  const handleTitleChange = (e) => setTitle(e);
  const handleContChange = (e) => setCont(e.target.value);
  const handleDeadChange = (date) => setDead(date);

  return(
    <div>
      <Modal title="Todoを編集" visible={visible} onClose={() => setVisible(false)}>
        <Form
          actions={
            <div>
              <Button variant="link" onClick={() => setVisible(false)}>キャンセル</Button>
              <Button variant="primary" onClick={() => handleUpdate(todo.id, title, cont, dead)}>変更</Button>
            </div>
          }
        >
          <FormField label="タイトル" hintText="タイトルを編集">
            <Input type="text" value={title} onChange={(e) => handleTitleChange(e)}/>
          </FormField>
          <FormField label="詳細" hintText="詳細を編集">
            <Textarea value={cont} onChange={(e) => handleContChange(e)}/>
          </FormField>
          <FormField label="期限" hintText="期限を編集">
            <DatePicker value={dead} onChange={(date) => handleDeadChange(date)}/>
          </FormField>
        </Form>
      </Modal>
    </div>
  )
};

const ToDo = ({todo, visible, setVisible, handleUpdate, handleDelete}) => {
  return(
    <div>
      <Container
        headingVariant='h4'
        title={todo.title}
        subtitle={"期限："+new Date(todo.deadline).toLocaleDateString()}
        actionGroup={<div>
          <Button variant='link' onClick={(id) => handleDelete(todo.id)}>削除</Button>
          <Button variant='primary' onClick={() => setVisible(true)}>編集</Button>
        </div>}
      >
        {todo.content}
      </Container>
      <UpdateModal todo={todo} handleUpdate={handleUpdate} visible={visible} setVisible={setVisible}/>
    </div>
  )
};

const App = () => {
  const { data } = useQuery(LIST_TODOS);
  const [createTodo] = useMutation(CREATE_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [title, setTitle] = useState("");
  const [cont, setCont] = useState("");
  const [dead, setDead] = useState("2025-1-1");
  const [visible, setVisible] = useState(false);
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    if (data?.todos) {
       setTodos(data?.todos);}
  }, [data]);

  const handleTitleChange = (e) => setTitle(e);
  const handleContChange = (e) => setCont(e.target.value);
  const handleDeadChange = (date) => setDead(date);
  
  const handleCreate = async (title, content, deadline) => {
    const CreateTodoInput ={title:title,
                            content:content,
                            deadline:deadline}
    const { data: createResponse } = await createTodo({
      variables:{
        createTodoInput:CreateTodoInput
      }
    });
    if (createResponse?.createTodo) {
      const _todo = createResponse?.createTodo
      if (!todos.some((todo) => todo.id === _todo.id)) {
        console.log("ToDoを作成中...");
        let _todos = todos.slice();
        _todos.push(_todo);
        setTitle("");
        setCont("");
        setDead("2025-1-1");
        setTodos(_todos);
      }
    }
  };
  const handleUpdate = async (id, title, content, deadline) => {
    console.log(id + " " + title + " " + content + " " + deadline);
    const UpdateTodoInput ={id:parseInt(id, 10),
                            title:title,
                            content:content,
                            deadline:deadline}
    const { data: updateResponse } = await updateTodo({
    variables: {updateTodoInput:UpdateTodoInput,}
    });
    if (updateResponse?.updateTodo) {
      console.log(`Updated ${id}`);
      const index = todos.findIndex((e) => e.id === id);
      let _todos = todos.slice();
      _todos[index] = { id: id, title: title, content: content, deadline: deadline};
      setTodos(_todos);
      setVisible(false);
    }
  };
  const handleDelete = async (id) => {
    const { data: deleteResponse } = await deleteTodo({
      variables: { id: parseInt(id, 10) }
    });
    if (deleteResponse?.removeTodo) {
      console.log(`Deleted ${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      setVisible(false);
    }
  };
  
  return (
    <div>
      <Header 
        title="Todoアプリ"
      />
      <Container title="ToDoを追加">
      <Form
          actions={
            <div>
              <Button variant="primary" onClick={() => handleCreate(title, cont, dead)}>追加</Button>
            </div>
          }
        >
          <FormField label="タイトル" hintText="新しいTodoのタイトル">
            <Input type="text" value={title} onChange={(e) => handleTitleChange(e)}/>
          </FormField>
          <FormField label="詳細" hintText="新しいTodoの詳細">
            <Textarea value={cont} onChange={(e) => handleContChange(e)}/>
          </FormField>
          <FormField label="期限" hintText="新しいTodoの期限">
            <DatePicker value={dead} onChange={(date) => handleDeadChange(date)}/>
          </FormField>
      </Form>
      </Container>
      <Container title="ToDoリスト">
        { todos != undefined ? todos.map((todo) => (
            <ToDo 
              todo={todo} 
              visible={visible}
              setVisible={setVisible}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              key={todo.id}
            />)) 
          : <div></div>
        }
      </Container>
    </div>
  );
};

export default App;