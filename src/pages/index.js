import { useEffect, useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";

export default function Home() {
  const initialState = {
    title: "",
    info: "",
  };

  const [notes, setNotes] = useState();
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    fetch("http://localhost:5000/notes")
      .then((res) => res.json())
      .then((res) => setNotes(res));
  }, []);

  const handleNote = (e) => {
    switch (e.target.name) {
      case "title":
        setFormData({
          ...formData,
          title: e.target.value,
        });
        break;
      case "info":
        setFormData({
          ...formData,
          info: e.target.value,
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {};

  const openNote = (e, id) => {
    console.log(id);
    fetch(`http://localhost:5000/notes/${id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setFormData({
          title: res.title,
          info: res.info,
        });
      });
  };

  return (
    <article className="flex justify-between h-screen px-2 py-5">
      <section className="w-1/6 h-full flex flex-col justify-start items-center border-r-2 border-gray-600">
        <h3 className="text-2xl">Notes list</h3>
        <ul className="flex flex-col py-5 pr-2 gap-2 w-full h-full">
          {notes?.map(({ id, title, date }) => (
            <li
              key={id}
              onClick={(e) => openNote(e, id)}
              className="self-start w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-md px-2 cursor-pointer hover:from-violet-600 hover:to-fuchsia-600 shadow-md"
            >
              <h3 className="text-xl">
                {title.length > 19 ? `${title.slice(0, 19)}...` : title}
              </h3>
              <span className="text-sm ">{date.slice(0, 10)}</span>
            </li>
          ))}
        </ul>
        <button className="flex items-center gap-2 text-lg bg-gradient-to-r from-purple-500 to-pink-500 px-2 rounded-md shadow-md hover:scale-110 transition-all">
          <span>New note</span> <AiOutlinePlusSquare />
        </button>
      </section>
      <section className="w-5/6 h-full flex flex-col justify-between px-10 py-5 items-center">
        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="New note"
          onChange={handleNote}
          className="bg-transparent text-gray-50 border-b-2 border-gray-600 focus:border-fuchsia-600 outline-none w-3/6 px-2"
        />
        <textarea
          name="info"
          cols="110"
          rows="15"
          placeholder="Note info"
          value={formData.info}
          onChange={handleNote}
          className="bg-transparent text-gray-50 border-b-2 border-gray-600 focus:border-fuchsia-600 outline-none resize-none bg-gray-800 px-2 w-full"
        ></textarea>
        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-fuchsia-500 to-teal-600 w-1/6 rounded-md tracking-widest hover:scale-105 transition-all shadow-md"
        >
          SAVE
        </button>
      </section>
    </article>
  );
}
