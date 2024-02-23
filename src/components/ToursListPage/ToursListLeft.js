import toursListPage from "@/data/toursListPage";
import React, { useState } from "react";
import Slider from "react-rangeslider";
import Select from "react-select";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Col, Row } from "react-bootstrap";

const { categories, durations } = toursListPage;

const ToursListLeft = (props) => {
  var { searchTours, tourTypesList, toursByPrices } = props;

  const customStyle = {
    valueContainer: (provided) => ({
      ...provided,
      color: "#787780",
      fontSize: 13,
      fontWeight: 500,
    }),
    singleValue: (provided) => ({
      ...provided,
      cursor: "pointer",
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: 5,
      border: "none",
      boxShadow: "none",
      zIndex: 10,
    }),
    option: (provided, state) => ({
      ...provided,
      color: "white",
      padding: "4px 20px",
      backgroundColor: state.isSelected ? "#e8604c" : "#313041",
      transition: "all 0.4s ease",
      cursor: "pointer",
      borderBottom:
        state.label === tourTypesList[tourTypesList.length - 1].label
          ? "none"
          : "0.5px solid #ffffff33",
      "&:hover": {
        backgroundColor: "#e8604c",
      },
      borderRadius:
        state.label === tourTypesList[tourTypesList.length - 1].label
          ? "0 0 8px 8px"
          : 0,
      fontSize: 16,
      fontWeight: 500,
    }),
    control: (base) => ({
      ...base,
      borderColor: "transparent",
      boxShadow: "none",
      borderRadius: "8px",
      "&:hover": {
        borderColor: "transparent"
      },
      padding: 14,
    }),
  };

  const [showReview, setShowReview] = useState(true);
  const [showCategory, setShowCategory] = useState(true);
  const [showDuration, setShowDuration] = useState(true);
  const [selected, setSelected] = useState(tourTypesList[0]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState();
  let count = 6;

  const handleSelect = ({ label }) => {
    console.log(label)
    setSelected(label);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      type: selected,
      startDate: moment(formData.get("startDate")).format("YYYY-MM-DDTHH:MM:SS"),
      endDate: moment(formData.get("endDate")).format("YYYY-MM-DDTHH:MM:SS"),
      location: formData.get("location"),
    };

    for (const [key, value] of Object.entries(data)) {

      if (value === "Invalid date" || value === undefined) {
        data[key] = "";
      }
    }

    searchTours(data);
  };

  const handlePriceFilter = (e) => {
    e.preventDefault();
    const inputs = ["minPrice", "maxPrice"];
    const fromData = new FormData(e.target);
    const data = {};
    inputs.forEach((input) => (data[input] = fromData.get(input)));
    toursByPrices(data);
  };

  return (
    <div className="tours-list__left">
      <div className="tours-list__sidebar">
        <div className="tours-list__sidebar-search">
          <h3 className="tours-list__sidebar-search-title">Search Tours</h3>
          <form onSubmit={handleSubmit} className="tours-list__sidebar-form">
            <div className="tours-list__sidebar-input">
              <input type="text" placeholder="Where to" name="location" required />
            </div>
            <div className="tours-list__sidebar-input">
              <DatePicker
                name="startDate"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="hasDatepicker"
                placeholderText="Start Date (Optional)"
              />
            </div>

            <div className="tours-list__sidebar-input">
              <DatePicker
                name="endDate"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="hasDatepicker"
                placeholderText="End Date (Optional)"
              />
            </div>
            <div className="tours-list__sidebar-input">
              <Select
                id="typeId"
                name="type"
                options={tourTypesList}
                onChange={handleSelect}
                styles={customStyle}
                isSearchable={false}
                components={{
                  IndicatorSeparator: () => null,
                }}
                placeholder="Type (Optional)"
                instanceId="tourTypeSelect4"
              />
            </div>
            <button type="submit" className="thm-btn tours-list__sidebar-btn">
              search
            </button>
          </form>
        </div>
        <div className="tour-sidebar__sorter-wrap">
          <div className="tour-sidebar__sorter-single">
            <div className="tour-sidebar__sorter-top">
              <form
                onSubmit={(e) => handlePriceFilter(e)}>
                <Row>
                  <Col md="12" lg="12">
                    <h3>Price</h3>
                  </Col>
                  <Col lg="5" md="5" xs="5" className="mt-3">
                    <div className="tours-list__sidebar-input">
                      <input type="number" placeholder="Min" name="minPrice" min="0" required />
                    </div>
                  </Col>
                  <Col lg="1" md="1" xs="1" style={{ paddingTop: "14px", fontWeight: "bold" }}>
                    -
                  </Col>
                  <Col lg="5" md="5" xs="5" className="mt-3">
                    <div className="tours-list__sidebar-input">
                      <input type="number" placeholder="Max" name="maxPrice" min="0" required />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg="12" md="12" xs="12">
                    <button type="submit" className="thm-btn w-100 mt-2" style={{ height: "3em", padding: "0" }}> SUBMIT </button>
                  </Col>
                </Row>
              </form>
            </div>
          </div>

          <div className="tour-sidebar__sorter-single">
            <div className="tour-sidebar__sorter-top">
              <h3>Review Score</h3>
              <button
                onClick={() => setShowReview((preShow) => !preShow)}
                className="tour-sidebar__sorter-toggler"
              ></button>
            </div>
            {showReview && (
              <div className="tour-sidebar__sorter-content">
                <div className="tour-sidebar__sorter-inputs">
                  {Array.from(Array(5)).map((_, i) => {
                    count--;
                    return (
                      <p key={i}>
                        <input
                          type="checkbox"
                          id={`review-${count}`}
                          name="radio-group"
                        />
                        <label htmlFor={`review-${count}`}>
                          {Array.from(Array(5)).map((_, j) => (
                            <i
                              key={j}
                              className={`fa fa-star${j + 1 <= count ? " active" : ""
                                }`}
                            ></i>
                          ))}
                        </label>
                      </p>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="tour-sidebar__sorter-single">
            <div className="tour-sidebar__sorter-top">
              <h3>Categories</h3>
              <button
                onClick={() => setShowCategory((preShow) => !preShow)}
                className="tour-sidebar__sorter-toggler"
              ></button>
            </div>
            {showCategory && (
              <div className="tour-sidebar__sorter-content">
                <div className="tour-sidebar__sorter-inputs">
                  {categories.map((category, index) => (
                    <p key={index}>
                      <input
                        type="checkbox"
                        id={`cat-${index + 1}`}
                        name="radio-group"
                      />
                      <label htmlFor={`cat-${index + 1}`}>{category}</label>
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="tour-sidebar__sorter-single">
            <div className="tour-sidebar__sorter-top">
              <h3>Duration</h3>
              <button
                onClick={() => setShowDuration((preShow) => !preShow)}
                className="tour-sidebar__sorter-toggler"
              ></button>
            </div>
            {showDuration && (
              <div className="tour-sidebar__sorter-content">
                <div className="tour-sidebar__sorter-inputs">
                  {durations.map((duration, index) => (
                    <p key={index}>
                      <input
                        type="checkbox"
                        id={`duration-${index + 1}`}
                        name="radio-group"
                      />
                      <label htmlFor={`duration-${index + 1}`}>
                        {duration}
                      </label>
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToursListLeft;
