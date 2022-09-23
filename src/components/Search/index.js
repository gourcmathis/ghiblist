import React, { useEffect, useState } from "react";
import { MDBInputGroup, MDBInput } from "mdb-react-ui-kit";
import axios from "axios";
import Modal from "../Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookBookmark } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Search = () => {
  const [title, setTitle] = useState("");
  const [filmInfos, setFilmInfos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalInfo, setModalInfo] = useState([]);
  const [toWatch, setToWatch] = useState([]);
  const [seen, setSeen] = useState([]);
  const [filmDispay, setFilmDispay] = useState([])

  const showToastMsg = () => {
    toast.success("Add to the list !", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showToastMsgWarn = () => {
    toast.warn("Already in that list !", {
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
    axios.get("https://ghibliapi.herokuapp.com/films").then((res) => {
      setFilmInfos(res.data);
    });
    let listToWatch = JSON.parse(localStorage.getItem("listToWatch"));
    let listSeen = JSON.parse(localStorage.getItem("listSeen"));
    listToWatch && setToWatch(listToWatch);
    listSeen && setSeen(listSeen);
  }, []);

  const showModal = (film) => {
    setOpenModal(true);
    setModalInfo(film);
  };

  const hideModal = () => {
    setModalInfo([]);
    setOpenModal(false);
  };

  const saveToWatch = (film) => {
    let res = true;
    for (let i = 0; i < toWatch.length; i++) {
      toWatch[i].id === film.id && (res = false);
    }
    if (res) {
      setToWatch([...toWatch, film]);
      showToastMsg();
    } else {
      showToastMsgWarn();
    }
  };

  useEffect(() => {
    localStorage.setItem("listToWatch", JSON.stringify(toWatch));
    localStorage.setItem("listSeen", JSON.stringify(seen));
  }, [toWatch, seen]);



  useEffect(() => {
    setFilmDispay(filmInfos.filter((film) => (film.title.toLowerCase().includes(title.toLowerCase()))))
  },[title,filmInfos])

  const saveSeen = (film) => {
    let res = true;
    for (let i = 0; i < seen.length; i++) {
      seen[i].id === film.id && (res = false);
    }
    if (res) {
      setSeen([...seen, film]);
      showToastMsg();
    } else {
      showToastMsgWarn();
    }
  };

  const showMovies = filmDispay.map((film) => {
    return (
      <div key={film.id} className="col">
        <div className="card">
          <img src={film.image} className="card-img-top" alt={film.title} />
          <div className="card-body">
            <h5 className="card-title">{film.title}</h5>
            <button onClick={() => showModal(film)} className="btn btn-primary">
              Infos
            </button>
          </div>
        </div>
      </div>
    );
  });

  const resultInModal = (
    <>
      <div className="modalHeader">
        <h2>{modalInfo.title}</h2>
      </div>
      <div className="modalBody">
        <div className="filmImage">
          <img src={modalInfo.image} alt={modalInfo.title} />
        </div>

        <div className="filmDetails">
          <h3>Synopsis</h3>
          {modalInfo.description}
          <h3 className="pt-4 mb-0">Informations</h3>
          Director: {modalInfo.director}
          <br />
          Producer: {modalInfo.producer}
          <br />
          Release date: {modalInfo.release_date}
          <br />
          Running time: {modalInfo.running_time} min
          <br />
          Rate: {modalInfo.rt_score}/100
        </div>
      </div>

      <div className="modalFooter">
        <button onClick={() => saveToWatch(modalInfo)} className="modalBtnIco">
          <FontAwesomeIcon icon={faBookBookmark} />
        </button>
        <button onClick={() => saveSeen(modalInfo)} className="modalBtnIco">
          <FontAwesomeIcon icon={faEye} />
        </button>
        <button onClick={hideModal} className="modalBtn">
          Fermer
        </button>
      </div>
    </>
  );

  return (
    <>
      <ToastContainer />
      <div className="container">
        <MDBInputGroup className="d-flex justify-content-center pt-5">
          <MDBInput
            label="Search"
            className="bg-light"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </MDBInputGroup>
      </div>
      <div className="container pt-5 d-flex pb-5">
        <div className="row row-cols-1 row-cols-md-3 g-5">{showMovies}</div>
      </div>
      <Modal hideModal={hideModal} showModal={openModal}>
        {resultInModal}
      </Modal>
    </>
  );
};

export default Search;
