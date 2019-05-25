import React, { useState } from "react";
import { deleteAssertion, updateAssertion } from "./testCaseActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Assertion = ({ id, dispatchTestCase }) => {
  const [queryVariant, setQueryVariant] = useState("");
  const [querySelector, setQuerySelector] = useState("");
  const [assertionValue, setAssertionValue] = useState("");
  const [matcher, setMatcher] = useState("");

  const handleClickDelete = e => {
    dispatchTestCase(deleteAssertion(id));
  };

  const handleChangeQueryVariant = e => {
    setQueryVariant(e.target.value);
    dispatchTestCase(
      updateAssertion(
        id,
        e.target.value,
        querySelector,
        assertionValue,
        matcher
      )
    );
  };
  const handleChangeQuerySelector = e => {
    setQuerySelector(e.target.value);
    dispatchTestCase(
      updateAssertion(id, queryVariant, e.target.value, assertionValue, matcher)
    );
  };
  const handleChangeAssertionValue = e => {
    setAssertionValue(e.target.value);
    dispatchTestCase(
      updateAssertion(id, queryVariant, querySelector, e.target.value, matcher)
    );
  };
  const handleChangeMatcher = e => {
    setMatcher(e.target.value);
    dispatchTestCase(
      updateAssertion(
        id,
        queryVariant,
        querySelector,
        assertionValue,
        e.target.value
      )
    );
  };
  return (
    <div>
      <h3>Assertion</h3>
      <FontAwesomeIcon
        id="delete-action"
        icon="times"
        onClick={handleClickDelete}
      />
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
      <input type="text" onChange={handleChangeAssertionValue} />
      <p>Matcher</p>
      <input type="text" onChange={handleChangeMatcher} />
    </div>
  );
};

export default Assertion;
