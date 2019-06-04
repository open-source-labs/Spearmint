import React, { useState } from 'react';
import styles from '../Assertion/Assertion.module.scss';
import { deleteAssertion, updateAssertion } from '../../../context/testCaseActions';
const minusIcon = require('../../../assets/images/minus-box-outline.png');
const questionIcon = require('../../../assets/images/help-circle.png');

const LastAssertion = ({ id, dispatchToTestCase, isLast }) => {
  const [queryVariant, setQueryVariant] = useState('');
  const [querySelector, setQuerySelector] = useState('');
  const [assertionValue, setAssertionValue] = useState('');
  const [matcher, setMatcher] = useState('');
  const [matcherValue, setMatcherValue] = useState('');

  const SETTER_MAP = {
    queryVariant: value => setQueryVariant(value),
    querySelector: value => setQuerySelector(value),
    assertionValue: value => setAssertionValue(value),
    matcher: value => setMatcher(value),
    matcherValue: value => setMatcherValue(value),
  };

  let newAssertion = {
    id,
    queryVariant,
    querySelector,
    assertionValue,
    matcher,
    matcherValue,
  };

  const handleChangeAssertionFields = (e, field) => {
    SETTER_MAP[field](e.target.value);
    newAssertion[field] = e.target.value;
    dispatchToTestCase(updateAssertion(newAssertion));
  };

  const handleClickDelete = e => {
    dispatchToTestCase(deleteAssertion(id));
  };

  const style = { width: '15px', height: '15px' };
  return (
    <section id={styles.assertion}>
      <div id={styles.assertionHeader}>
        <h3>Assertion</h3>
        {!isLast && <img src={minusIcon} style={style} alt='delete' onClick={handleClickDelete} />}
      </div>
      <label htmlFor='queryVariant'>Query Selector</label>
      <img src={questionIcon} alt='help' style={style} />
      <select id='queryVariant' onChange={e => handleChangeAssertionFields(e, 'queryVariant')}>
        <option value='' />
        <option value='getBy'>getBy</option>
        <option value='getAllBy'>getAllBy</option>
        <option value='queryBy'>queryBy</option>
        <option value='queryAllBy'>queryAllBy</option>
        <option value='findBy'>findBy</option>
        <option value='findAllBy'>findAllBy</option>
      </select>
      <img src={questionIcon} alt='help' style={style} />
      <select id='querySelector' onChange={e => handleChangeAssertionFields(e, 'querySelector')}>
        <option value='' />
        <option value='LabelText'>LabelText</option>
        <option value='PlaceholderText'>PlaceholderText</option>
        <option value='ByText'>Text</option>
        <option value='AltText'>AltText</option>
        <option value='Title'>Title</option>
        <option value='DisplayValue'>DisplayValue</option>
        <option value='Role'>Role</option>
        <option value='TestId'>TestId</option>
        {/* TextMatch Precision & Normalization will be added */}
      </select>
      <input type='text' onChange={e => handleChangeAssertionFields(e, 'assertionValue')} />
      <label htmlFor='matcher'>Matcher</label>
      <input type='text' id='matcher' onChange={e => handleChangeAssertionFields(e, 'matcher')} />
      <label htmlFor='matcherValue'>Value</label>
      <input
        type='text'
        id='matcherValue'
        onChange={e => handleChangeAssertionFields(e, 'matcherValue')}
      />
    </section>
  );
};

export default LastAssertion;
