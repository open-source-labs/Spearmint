import React, { useState } from "react";
import { deleteAction, updateAction } from "../../../../context/testCaseActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Action = ({ id, dispatchTestCase }) => {
  const [eventType, setEventType] = useState("");
  const [eventValue, setEventValue] = useState("");
  const [queryVariant, setQueryVariant] = useState("");
  const [querySelector, setQuerySelector] = useState("");
  const [queryValue, setQueryValue] = useState("");

  const handleClickDelete = e => {
    dispatchTestCase(deleteAction(id));
  };

  const handleChangeEventType = e => {
    setEventType(e.target.value);
    dispatchTestCase(
      updateAction(
        id,
        e.target.value,
        eventValue,
        queryVariant,
        querySelector,
        queryValue
      )
    );
  };

  const handleChangeEventValue = e => {
    setEventValue(e.target.value);
    dispatchTestCase(
      updateAction(
        id,
        eventType,
        e.target.value,
        queryVariant,
        querySelector,
        queryValue
      )
    );
  };

  const handleChangeQueryVariant = e => {
    setQueryVariant(e.target.value);
    dispatchTestCase(
      updateAction(
        id,
        eventType,
        eventValue,
        e.target.value,
        querySelector,
        queryValue
      )
    );
  };

  const handleChangeQuerySelector = e => {
    setQuerySelector(e.target.value);
    dispatchTestCase(
      updateAction(
        id,
        eventType,
        eventValue,
        queryVariant,
        e.target.value,
        queryValue
      )
    );
  };

  const handleChangeQueryValue = e => {
    setQueryValue(e.target.value);
    dispatchTestCase(
      updateAction(
        id,
        eventType,
        eventValue,
        queryVariant,
        querySelector,
        e.target.value
      )
    );
  };

  const needsEventValue = eventType => {
    const eventsWithValues = [
      "keyDown",
      "keyPress",
      "keyUp",
      "change",
      "input",
      "invalid",
      "submit"
    ];
    return eventsWithValues.includes(eventType);
  };

  return (
    <div>
      <h3>Action</h3>
      <FontAwesomeIcon
        id="delete-action"
        icon="times"
        onClick={handleClickDelete}
      />
      <label htmlFor="event-type">Event Type</label>
      <input type="text" id="event-type" onChange={handleChangeEventType} />
      {needsEventValue(eventType) && (
        <span>
          <label htmlFor="event-value" />
          <input
            type="text"
            id="event-type"
            onChange={handleChangeEventValue}
          />
        </span>
      )}

      <label htmlFor="queryVariant">Query Selector</label>
      <FontAwesomeIcon className="query" icon="question-circle" />
      <select id="queryVariant" onChange={handleChangeQueryVariant}>
        <option value="" />
        <option value="getBy">getBy</option>
        <option value="getAllBy">getAllBy</option>
        <option value="queryBy">queryBy</option>
        <option value="queryAllBy">queryAllBy</option>
        <option value="findBy">findBy</option>
        <option value="findAllBy">findAllBy</option>
      </select>
      <FontAwesomeIcon className="query" icon="question-circle" />
      <select id="queries" onChange={handleChangeQuerySelector}>
        <option value="" />
        <option value="LabelText">LabelText</option>
        <option value="PlaceholderText">PlaceholderText</option>
        <option value="ByText">Text</option>
        <option value="AltText">AltText</option>
        <option value="Title">Title</option>
        <option value="DisplayValue">DisplayValue</option>
        <option value="Role">Role</option>
        <option value="TestId">TestId</option>
        {/* TextMatch Precision & Normalization will be added */}
      </select>
      <label>Query</label>
      <input type="text" onChange={handleChangeQueryValue} />
    </div>
  );
};

export default Action;
