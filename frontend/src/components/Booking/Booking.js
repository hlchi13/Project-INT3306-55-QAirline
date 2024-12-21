import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Booking.css";
import AirportSearch from "./AirportSearch.js";
import DatePicker from "./DatePicker.js";
import Notification from "../Notification/Notification.js";
import PassengerSelector from "./PassengerSelector.js";
import Slideshow from "../slide/Slideshow.jsx";
import { BACKEND_BASE_URL } from "../../services/api.js";


function Booking() {
  const [passengerData, setPassengerData] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const handlePassengerChange = (updatedPassengers) => {
    setPassengerData(updatedPassengers);
  };

  const passengerSummary = (() => {
    const { adults, children, infants } = passengerData;
    let summary = `${adults} Người lớn`;
    if (children > 0) summary += `, ${children} Trẻ em`;
    if (infants > 0) summary += `, ${infants} Trẻ sơ sinh`;
    return summary;
  })();

  const startAirportInputRef = useRef(null);
  const endAirportInputRef = useRef(null);
  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);

  const [flightForwardData, setFlightForwardData] = useState([]);
  const [flightBackwardData, setFlightBackwardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState("roundTrip");
  const [airports, setAirports] = useState([]);
  const [query, setQuery] = useState("");

  const [idBeginAirport, setIdBeginAirport] = useState(null);
  const [idEndAirport, setIdEndAirport] = useState(null);
  const [startDestination, setStartDestination] = useState(null);
  const [endDestination, setEndDestination] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const handleDateChange = (date, isEnd) => {
    if (isEnd) {
      setReturnDate(date);
    } else {
      setDepartureDate(date);
    }
  };

  const navigate = useNavigate();
  const [id2Destination, setId2Destination] = useState(null);

  useEffect(() => {
    const fetchAirport = async () => {
      try {
        const res = await fetch(`${BACKEND_BASE_URL}/flights/`, {
          method: "GET",
        });
        if (res.ok) {
          const result = await res.json();
          setAirports(result);
          setId2Destination(
            result.reduce((acc, airport) => {
              acc[airport.idairport] = airport.city;
              return acc;
            }, {})
          );
        } else {
          throw new Error("Failed to fetch airport data!");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAirport();
  }, []);

  const handleSelectAirport = (type, id) => {
    if (type === "Start") {
      setIdBeginAirport(id);
      setStartDestination(id2Destination[id]);
    } else {
      setIdEndAirport(id);
      setEndDestination(id2Destination[id]);
    }
  };

  const handleFlightTypeChange = (type) => {
    setSelectedType(type);
    const returnDate = document.querySelector(".input-enddate");
    const endDes = document.querySelector(".input-enddes");
    if (type === "oneWay") {
      returnDate.classList.add("hidden-return");
      endDes.classList.add("hidden-end");
    }

    if (type === "roundTrip") {
      returnDate.classList.remove("hidden-return");
      endDes.classList.remove("hidden-end");
    }
    if (type === "multiWay") {
      returnDate.classList.add("hidden-return");
      endDes.classList.remove("hidden-end");
    }
  };

  const handleSubmit = async () => {
    if (selectedType === "roundTrip") {
      if (!idBeginAirport || !idEndAirport || !departureDate || !returnDate) {
        setShowNotification(true); // Hiển thị thông báo
        setTimeout(() => {
          setShowNotification(false); // Ẩn thông báo sau 3 giây
        }, 3000);
      } else {
        const startDay = departureDate.getDate();
        const startMonth = departureDate.getMonth() + 1;
        const startYear = departureDate.getFullYear();
        const endDay = returnDate.getDate();
        const endMonth = returnDate.getMonth() + 1;
        const endYear = returnDate.getFullYear();

        const url_forward = `${BACKEND_BASE_URL}/flight/searchFlight?day=${startDay}&month=${startMonth}&year=${startYear}&idBeginAirport=${idBeginAirport}&idEndAirport=${idEndAirport}`;
        const url_backward = `${BACKEND_BASE_URL}/flight/searchFlight?day=${endDay}&month=${endMonth}&year=${endYear}&idBeginAirport=${idEndAirport}&idEndAirport=${idBeginAirport}`;

        try {
          const response_forward = await fetch(url_forward, { method: "GET" });
          const response_backward = await fetch(url_backward, {
            method: "GET",
          });
          if (
            (response_forward.ok || response_forward.status === 404) &&
            (response_backward.ok || response_backward.status === 404)
          ) {
            const data_forward = response_forward.ok
              ? await response_forward.json()
              : [];
            const data_backward = response_backward.ok
              ? await response_backward.json()
              : [];
            setFlightForwardData(data_forward);
            setFlightBackwardData(data_backward);

            navigate("/searchflights", {
              state: {
                flightForwardData: data_forward,
                flightBackwardData: data_backward,
                startDestination,
                endDestination,
                selectedType,
                passengerSummary,
              },
            });
          } else {
            setError("No flights found or an error occurred.");
          }
        } catch (err) {
          setError("An error occurred: " + err.message);
        } finally {
          setLoading(false);
        }
      }
    } else {
      if (!idBeginAirport || !idEndAirport || !departureDate) {
        setShowNotification(true); // Hiển thị thông báo
        setTimeout(() => {
          setShowNotification(false); // Ẩn thông báo sau 3 giây
        }, 3000);
      } else {
        const startDay = departureDate.getDate();
        const startMonth = departureDate.getMonth() + 1;
        const startYear = departureDate.getFullYear();

        const url_forward = `${BACKEND_BASE_URL}/flight/searchFlight?day=${startDay}&month=${startMonth}&year=${startYear}&idBeginAirport=${idBeginAirport}&idEndAirport=${idEndAirport}`;

        try {
          const response_forward = await fetch(url_forward, { method: "GET" });

          if (response_forward.ok || response_forward.status === 404) {
            const data_forward = response_forward.ok
              ? await response_forward.json()
              : [];
            setFlightForwardData(data_forward);
            navigate("/searchflights", {
              state: {
                flightForwardData: data_forward,
                // flightBackwardData: flightBackwardData,
                startDestination,
                endDestination,
                selectedType,
                passengerSummary,
              },
            });
          } else {
            setError("No flights found or an error occurred.");
          }
        } catch (err) {
          setError("An error occurred: " + err.message);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  return (
    <div className="main-content">
      <Notification
        message="Please fill in all fields"
        show={showNotification}
      />
      <div className="content">
        <Slideshow />
          
          <div className="main-booking">
            <div className="booking-table">
              <h1>Đặt vé máy bay</h1>
              <div className="flight-options">
                
              <label
                  className="radio-label"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    fontWeight: "600",
                    color: "white",
                  }}
                >
                  <input
                    type="radio"
                    className="custom-radio"
                    name="flightType"
                    value="oneWay"
                    checked={selectedType === "oneWay"}
                    onChange={() => handleFlightTypeChange("oneWay")}
                    style={{
                      marginRight: "5px",
                      marginBottom: "5px",
                      cursor: "pointer",
                    }}
                  />
                  Một chiều
                </label>
                
                <label
                  className="radio-label"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "20px",
                    cursor: "pointer",
                    fontWeight: "600",
                    color: "white",
                  }}
                >
                  <input
                    className="custom-radio"
                    type="radio"
                    name="flightType"
                    value="roundTrip"
                    checked={selectedType === "roundTrip"}
                    onChange={() => handleFlightTypeChange("roundTrip")}
                    style={{
                      marginRight: "5px",
                      marginBottom: "5px",
                      cursor: "pointer",
                    }}
                  />
                  Khứ hồi
                </label>

                <label
                  className="radio-label"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    fontWeight: "600",
                    color: "white",
                  }}
                >
                  <input
                    type="radio"
                    className="custom-radio"
                    name="flightType"
                    value="multiWay"
                    checked={selectedType === "multiWay"}
                    onChange={() => handleFlightTypeChange("multiWay")}
                    style={{
                      marginRight: "5px",
                      marginBottom: "5px",
                      cursor: "pointer",
                    }}
                  />
                  Đa chặng
                </label>
              </div>
              <div className="booking-container">
                <div className="flight-details">
                  <div className="flight-search-bar">
                    <div className="input-group">
                      <span className="icon">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M6 19.5456L8 19.5456L13 11.4172L18.5 11.4172C18.8978 11.4172 19.2794 11.2566 19.5607 10.9708C19.842 10.685 20 10.2974 20 9.89314C20 9.48894 19.842 9.10128 19.5607 8.81546C19.2794 8.52965 18.8978 8.36908 18.5 8.36908L13 8.36908L8 0.240722L6 0.240722L8.5 8.36908L3 8.36908L1.5 6.33699L-2.62268e-07 6.33699L1 9.89314L-5.68248e-07 13.4493L1.5 13.4493L3 11.4172L8.5 11.4172L6 19.5456Z"
                            fill="#333333"
                          />
                        </svg>
                      </span>
                      <AirportSearch
                        airports={airports}
                        type="Start"
                        idOther={idEndAirport}
                        onSelectAirport={handleSelectAirport}
                        nextInputRef={startDatePickerRef}
                        inputRef={startAirportInputRef}
                      />
                    </div>

                    <DatePicker
                      type="Ngày đi"
                      ref={startDatePickerRef}
                      nextInputRef={endAirportInputRef}
                      isEnd={false}
                      onDateChange={handleDateChange}
                    />
                  </div>

                  <div className="flight-search-bar input-enddes">
                    <div className="input-group">
                      <span className="icon">
                        <svg
                          width="13"
                          height="19"
                          viewBox="0 0 13 19"
                          fill="none"
                        >
                          <path
                            d="M10.6161 1.85455C9.44983 0.6671 7.86807 0 6.21875 0C4.56944 0 2.98767 0.6671 1.82143 1.85455C0.655188 3.04199 0 4.65252 0 6.33182C0 11.0807 6.21875 18.0909 6.21875 18.0909C6.21875 18.0909 12.4375 11.0807 12.4375 6.33182C12.4375 4.65252 11.7823 3.04199 10.6161 1.85455Z"
                            fill="#333333"
                          ></path>
                          <circle
                            cx="6.21879"
                            cy="6.21879"
                            r="2.8267"
                            fill="white"
                          ></circle>
                        </svg>
                      </span>
                      <AirportSearch
                        airports={airports}
                        type="End"
                        idOther={idBeginAirport}
                        onSelectAirport={handleSelectAirport}
                        nextInputRef={endDatePickerRef}
                        inputRef={endAirportInputRef}
                      />
                    </div>

                    <DatePicker
                      type="Ngày về"
                      ref={endDatePickerRef}
                      nextInputRef={null}
                      isEnd={true}
                      onDateChange={handleDateChange}
                    />
                  </div>
                  
                  <PassengerSelector onPassengerChange={handlePassengerChange} />
                  <div className="promotion-code">
                      <span className="icon">
                      <svg width="22" height="14" viewBox="0 0 22 14" fill="none"> 
                        <path d="M20.8386 0H1.94422C1.66583 0 1.39883 0.105357 1.20198 0.292893C1.00512 0.48043 0.894531 0.734784 0.894531 1V5H1.8319C2.87739 5 3.84731 5.681 4.01526 6.664C4.06642 6.95104 4.05122 7.24525 3.97071 7.52612C3.89021 7.80698 3.74633 8.06772 3.54914 8.29015C3.35194 8.51258 3.10617 8.69133 2.82897 8.81393C2.55177 8.93654 2.24983 9.00004 1.94422 9H0.894531V13C0.894531 13.2652 1.00512 13.5196 1.20198 13.7071C1.39883 13.8946 1.66583 14 1.94422 14H20.8386C21.117 14 21.384 13.8946 21.5809 13.7071C21.7777 13.5196 21.8883 13.2652 21.8883 13V9H20.8386C20.533 9.00004 20.2311 8.93654 19.9539 8.81393C19.6767 8.69133 19.4309 8.51258 19.2337 8.29015C19.0365 8.06772 18.8926 7.80698 18.8121 7.52612C18.7316 7.24525 18.7164 6.95104 18.7676 6.664C18.9355 5.681 19.9055 5 20.9509 5H21.8883V1C21.8883 0.734784 21.7777 0.48043 21.5809 0.292893C21.384 0.105357 21.117 0 20.8386 0ZM8.24236 4C8.52075 4 8.78774 4.10536 8.9846 4.29289C9.18145 4.48043 9.29205 4.73478 9.29205 5C9.29205 5.26522 9.18145 5.51957 8.9846 5.70711C8.78774 5.89464 8.52075 6 8.24236 6C7.96396 6 7.69697 5.89464 7.50012 5.70711C7.30326 5.51957 7.19267 5.26522 7.19267 5C7.19267 4.73478 7.30326 4.48043 7.50012 4.29289C7.69697 4.10536 7.96396 4 8.24236 4ZM7.40261 10.4L13.7007 2.4L15.3802 3.6L9.08211 11.6L7.40261 10.4ZM14.5405 10C14.2621 10 13.9951 9.89464 13.7983 9.70711C13.6014 9.51957 13.4908 9.26522 13.4908 9C13.4908 8.73478 13.6014 8.48043 13.7983 8.29289C13.9951 8.10536 14.2621 8 14.5405 8C14.8189 8 15.0859 8.10536 15.2827 8.29289C15.4796 8.48043 15.5902 8.73478 15.5902 9C15.5902 9.26522 15.4796 9.51957 15.2827 9.70711C15.0859 9.89464 14.8189 10 14.5405 10Z" fill="#333333">
                        </path>
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Promotion Code"
                      className="input-promotion"
                    />
                  </div>
                  <div className="bottom">
                    <button className="search-flights" onClick={handleSubmit}>
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </div>
      </div>
    </div>
  );
}

export default Booking;
