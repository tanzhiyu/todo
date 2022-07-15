import { useCallback, useMemo, useState } from "react";
import styles from "./style.module.css";

let id = 0;

export default function Todo() {
  const [value, setValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState("");

  const handleAddClick = () => {
    if (!value) {
      return;
    }
    id++;
    console.log(id);
    const todo = {
      value,
      id,
      done: false,
    };
    setTodoList((prevList) => [...prevList, todo]);
    setValue("");
  };

  const handleEdit = (i) => {
    if (i !== editIndex) {
      setEditIndex(i);
      setEditValue(todoList.find((todo, index) => index === i).value);
    }
  };

  const handleSave = (i) => {
    setTodoList((list) =>
      list.map((todo, index) => {
        if (i === index) {
          return { ...todo, value: editValue };
        }
        return todo;
      })
    );
    setEditIndex(-1);
  };

  const handleDone = (i) => {
    const done = todoList.find((todo, index) => index === i);
    if (!done) {
      return;
    }
    setTodoList((list) =>
      list.map((todo, index) => {
        if (i === index) {
          return { ...todo, done: true };
        }
        return todo;
      })
    );
  };

  const allDone = useMemo(() => {
    return todoList.every((todo) => !!todo.done);
  });

  const totoLength = useMemo(() => {
    return todoList.filter((todo) => !todo.done).length;
  }, [todoList]);

  const handleAllCheck = () => {
    if (allDone) {
      return;
    }
    setTodoList((prevList) =>
      prevList.map((todo) => ({ ...todo, done: true }))
    );
  };
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>ToDo List</h1>
      <div className={styles.in}>
        <input
          type="text"
          placeholder="what need to be done?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handleAddClick}>Create</button>
      </div>
      <div className={styles.list}>
        {todoList.map((todo, i) => (
          <div
            key={todo.id}
            className={`${styles.todo} ${todo.done ? styles.done : ""}`}
          >
            <div>
              <input
                type="checkbox"
                onChange={() => handleDone(i)}
                checked={todo.done}
              />
              {editIndex === i ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
              ) : (
                <span>{todo.value}</span>
              )}
            </div>
            {editIndex === i ? (
              <button onClick={() => handleSave(i)}>Save</button>
            ) : (
              <button
                className={todo.done ? styles.notAllow : ""}
                onClick={() => handleEdit(i)}
              >
                Edit
              </button>
            )}
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <div>
          <label htmlFor="all">all</label>
          <input
            type="checkbox"
            name="all"
            checked={allDone}
            onChange={handleAllCheck}
          />
        </div>
        <div>you have {totoLength} todo</div>
        <button>delete</button>
      </div>
      <div className={styles.text}>
        <TextScroll />
      </div>
    </div>
  );
}

function TextScroll() {
  return (
    <div className={styles.noticeContainer}>
      <div className={styles.noticeWrap}>
        <div className={styles.noticeRow}>
          1.这是公告1公告1公告1公告1公告1公告1公告1
        </div>
        <div className={styles.noticeRow}>
          2.这是公告2公告2公告2公告2公告2公告2公告2
        </div>
      </div>
    </div>
  );
}
