import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import JSONDATA from "./MOCK_DATA.json";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModal() {
  const {
    setShowEventModal,
    daySelected,
    setDaySelected,
    dispatchCalEvent,
    selectedEvent,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");

  const [endDate, setEndDate] = useState(
    selectedEvent ? selectedEvent.endDate : ""
  );

  const [owner, setOwner] = useState(selectedEvent ? selectedEvent.owner : "");

  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );

  const [priority, setPriority] = useState(
    selectedEvent ? selectedEvent.priority : ""
  );

  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,

      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  }
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4 ">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>

            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />

            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>

            <p>
              <span className="text-gray-600 text-l font-semibold">
                Start:{" "}
              </span>{" "}
              {daySelected.format("DD/MM/YYYY")}
            </p>
            {/*             
            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>

             <p><span className="text-gray-600 text-l font-semibold">Start: </span><DatePicker selected={daySelected} formatDate="dd/mm/yyyy" onChange={(date) => setDaySelected(date)} /></p>  */}
            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>

            <p>
              <span className="text-gray-600 text-l font-semibold">End: </span>
              <DatePicker
                selected={endDate}
                dateFormat="dd/MM/yyyy"
                onChange={(date) => setEndDate(date)}
                minDate={new Date(daySelected)}
              />
            </p>

            <span className="material-icons-outlined text-gray-400">
              segment
            </span>

            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              segment
            </span>

            {/* <input
                type="text"
                name="owner"
                placeholder="Add owner's name..."
                value={owner}
                required
                className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => setOwner(e.target.value)}
              />
              <select>
                {JSONDATA.filter((val) => {
                  if (
                    val.first_name
                      .toLowerCase()
                      .includes(owner.toLowerCase())
                  ) {
                    return val;
                  }
                }).map((val, key) => {
                  return <option>{val.first_name}</option>;
                })}
              </select> */}

            <label>
              Choose an owner:
              <select value={owner} onChange={(e) => setOwner(e.target.value)}>
                <option value="Pronoy">Pronoy</option>
                <option value="Mugundh">Mugundh</option>
                <option value="Rahuk">Rahuk</option>
                <option value="Superman">Superman</option>
              </select>
            </label>

            <span className="material-icons-outlined text-gray-400">
              bookmark_border
            </span>

            <label>
              Pick your Priority Level:
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
                <option value="mango">Mango</option>
              </select>
            </label>
            {/* 
            <input
              type="text"
              name="owner"
              placeholder="Add a description"
              value={description}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />
            */}
            <span className="material-icons-outlined text-gray-400">
              bookmark_border
            </span>
            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
