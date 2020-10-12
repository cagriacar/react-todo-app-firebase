import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import db from "./firebase";
import firebase from "firebase";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]); // todo içerisini dolduracağımız alan.
  const [input, setInput] = useState(""); // input içerisini yöneticeğimiz alan - ilk başta boş olması için useState içi boş oluyor

  // Sayfa yüklendiğinde, veritabanını bilgilerini alıp  ekleme / silme işlelerini kontrol etmeli ve  yeni yapılacak işler getirmemiz gerekir.
  // ekleme buttonnuna basıldığında çalışacak işlem  app.js  [] içine belirttiğimizde her seferinde bunun çalışmasını sağlayacak.database deki verileri çekecek.+ orderBy ile sıralama işlemini yapacak desc =>"Z-A"
  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
          }))
        );
      });
  }, []); 

  const addTodo = (event) => {
    event.preventDefault(); //  sayfanın yenilenmesini engeller.

 // Ekleme butonuna bastığımızda veritabanımızda collections'lara da eklemiş oluruz."db.collection().add() methodları ile"
    db.collection("todos").add({  
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // Click eventine tıkladığımızda çalışacak.
    setTodos([...todos, input]); //...spread methodudur.Bütün dizi elemanlarını almamızı sağlar,setTodos() ile todos[] dizisine input'dan gelen yeni değeri sonuna ekler.

    setInput(""); // ekleme işlemi bittikden sonra inputun içerisini boş olması içindir.
  };

  return (
    <div className="App">
      <h1>Todo App </h1>
      <form>
        <FormControl>
          <InputLabel> Write a Todo</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
           // disabled // veritabanın bağlı olduğu pasif hale getirdim.
          />
          {/* input içersindeki değer değiştiğinde onChange() özelliği ile Inputtaki değeri setInput()methodu üzerinden değeri alıuyoruz. */}
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={addTodo}
          disabled={!input} //input değiştiğinde button aktif hale gelecek.
        >
          Ekle
        </Button>
        {/* Click eventimiz çalıştığında addTodo fonsiyonumuz çalışacak ve inputtaki değeri todos dizisine atacak. */}
      </form>

      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} /> //todos içerisindeki değeri .map()methodu ile yeni eklenen değerler ile array olarak Todo.js'e gönderir.
        ))}
      </ul>
    </div>
  );
}

export default App;
