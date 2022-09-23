import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faBookBookmark } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";

const MyLists = () => {
  const [toWatch, setToWatch] = useState([]);
  const [seen, setSeen] = useState([]);

  const [openToWatch, setOpenToWatch] = useState(false);
  const [openSeen, setOpenSeen] = useState(false);

  const showToastMsg = () => {
    toast.error("Item removed from the list", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    let listToWatch = JSON.parse(localStorage.getItem("listToWatch"));
    let listSeen = JSON.parse(localStorage.getItem("listSeen"));
    if (listToWatch !== null) {
      setToWatch(listToWatch);
    }
    if (listSeen !== null) {
      setSeen(listSeen);
    }
  }, []);

  const handleDeleteSeen = (film) => {
    let newSeen = seen.filter((films) => films.title !== film.title);
    setSeen(newSeen);
    showToastMsg();
  };
  const handleDeleteToWatch = (film) => {
    let newToWatch = toWatch.filter((films) => films.title !== film.title);
    setToWatch(newToWatch);
    showToastMsg();
  };

  useEffect(() => {
    localStorage.setItem("listToWatch", JSON.stringify(toWatch));
    localStorage.setItem("listSeen", JSON.stringify(seen));
  }, [toWatch, seen]);

  const displayListToWatch =
    openToWatch &&
    toWatch.map((film) => {
      return (
        <div key={film.id} className="col">
          <div className="card">
            <img src={film.image} className="card-img-top" alt={film.title} />
            <div className="card-body">
              <h5 className="card-title d-inline">{film.title}</h5>
              <button
                onClick={() => handleDeleteToWatch(film)}
                className="modalBtnIcoTrash ms-2"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        </div>
      );
    });
  const displayListSeen =
    openSeen &&
    seen.map((film) => {
      return (
        <div key={film.id} className="col">
          <div className="card">
            <img src={film.image} className="card-img-top" alt={film.title} />
            <div className="card-body ">
              <h5 className="card-title d-inline">{film.title}</h5>
              <button
                onClick={() => handleDeleteSeen(film)}
                className="modalBtnIcoTrash ms-2"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        </div>
      );
    });

  return (
    <div className="pt-5">
      <ToastContainer />
      <h2 className="ps-4" style={{ color: "#dfd8d8" }}>
        Choose a list:
      </h2>

      <button
        className="modalBtnIco w-25 mt-2 ms-4"
        onClick={() => setOpenToWatch(!openToWatch)}
        aria-controls="example-fade-text"
        aria-expanded={openToWatch}
      >
        <FontAwesomeIcon className="pe-2" icon={faBookBookmark} />
        To Watch
      </button>

      <button
        className="modalBtnIco w-25"
        onClick={() => setOpenSeen(!openSeen)}
        aria-controls="example-fade-text"
        aria-expanded={openSeen}
      >
        <FontAwesomeIcon className="pe-2" icon={faEye} />
        Already Seen
      </button>
      {openSeen && (
        <h2 style={{ color: "#dfd8d8" }} className="pt-5 ps-4">
          Already Seen
        </h2>
      )}
      <div className="container pt-5 d-flex pb-5">
        <div className="row row-cols-1 row-cols-md-3 g-5">
          {displayListSeen}
        </div>
      </div>
      {openToWatch && (
        <h2 style={{ color: "#dfd8d8" }} className="pt-5 ps-4">
          To Watch
        </h2>
      )}
      <div className="container pt-5 d-flex pb-5">
        <div className="row row-cols-1 row-cols-md-3 g-5">
          {displayListToWatch}
        </div>
      </div>
    </div>
  );
};

export default MyLists;
