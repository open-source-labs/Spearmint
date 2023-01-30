/*
 * Handles modals that pop up from pressing buttons "New Test +" or "Run Test",
 * which render on the top Test Menu component.
 */

import React, { useState, useContext, useReducer } from 'react';
import { useNewTest, useGenerateScript } from '../Modals/modalHooks';
import { setTabIndex } from '../../context/actions/globalActions';
import styles from '../Modals/Modal.module.scss';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GlobalContext, globalReducer } from '../../context/reducers/globalReducer';;
import { Button } from '@mui/material';
import ReactInstructions from './ReactInstructions';

const ipc = require('electron').ipcRenderer;
const os = require('os');

/**
 * This react component conditionally renders a specific test type instruction based on which test type is selected in its global context
 * @returns { JSX.Element } Renders the Instructions component
*/
const Instructions = ({
  title,
  testType = null,
  puppeteerUrl = 'sample.io',
  accTestType
}) => {
  
  const script = useGenerateScript(title, testType, puppeteerUrl, accTestType);
  const [btnFeedback, setBtnFeedback] = useState({ changedDir: false, installed: false });

  const [, dispatchToGlobal] = useContext(GlobalContext)

  // Change execute command based on os platform
  let execute = '\n';
  if (os.platform() === 'win32') {
    execute = '\r';
  }

  /**
   * This is a function that changes your current directory to the correct file path.
   * @returns { void } Returns void.
   */
  const changeDirectory = () => {
    ipc.send('terminal.toTerm', `${script.cd}${execute}`);
    setBtnFeedback({ ...btnFeedback, changedDir: true });
  };

  /**
   * This is a function that installs dependencies needed for the specific test type
   * @returns { void } Returns void
   */
  const installDependencies = () => {
    ipc.send('terminal.toTerm', `${script.install}${execute}`);
    setBtnFeedback({ ...btnFeedback, installed: true });
    dispatchToGlobal(setTabIndex(2));
  };

  // EndPointGuide component definition, conditionally rendered
  /**
   * Function that conditionally renders only when endpoint testing is selected in its global context
   * @returns { (JSX.Element|null) } Conditionally returns either the EndPointGuide component or null
   */
  const EndPointGuide = () => {
    // endpoint guide only exists when user is in endpoint testing
    if (script.endPointGuide) {
      const array = [];
      for (let step in script.endPointGuide) {
        array.push(
          <div id={styles.endPointGuide}>
            {script.endPointGuide[step]}
            {'\n'}
          </div>
        );
      }
      // return accordion element
      return (
        <Accordion hidden={false}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id={styles.accordionSummary}
          >
            Endpoint Testing Configuration Guide
          </AccordionSummary>
          <AccordionDetails id={styles.configGuide}>{array}</AccordionDetails>
        </Accordion>
      );
    }
    // return anything to not render accordion
    return null;
  };


  /**
   * Function that conditionally renders only when GraphQL testing is selected in its global context
   * @returns { (JSX.Element | null) } Conditionally returns either the GraphQLGuide or null
   */
  const GraphQLGuide = () => {
    if (script.graphQLGuide) {
      const array = [];
      for (let step in script.graphQLGuide) {
        array.push(
          <div id={styles.graphQLGuide}>
            {script.graphQLGuide[step]}
            {'\n'}
          </div>
        );
      }
      // return accordion element
      return (
        <Accordion hidden={false}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id={styles.accordionSummary}
          >
            GraphQL Testing Configuration Guide
          </AccordionSummary>
          <AccordionDetails id={styles.configGuide}>{array}</AccordionDetails>
        </Accordion>
      );
    }
    // return anything to not render accordion
    return null;
  };

  /**
   * Function that conditionally renders only when react testing is selected in its global context
   * @returns { (JSX.Element | null) } Conditionally returns either the ReactDependencies component or null
   */
  const ReactDependencies = () => {
    if (title === 'hooks' || title === 'react') {
      return (
        <>
          <Accordion hidden={false}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id={styles.accordionSummary}
            >
              3. Important React Babel Configuration
            </AccordionSummary>
            <AccordionDetails id={styles.configGuide}>
              <div id={styles.accordionDiv}>
                <div> Ensure that your project contains the following file: </div>
                <pre>
                  <div className='code-wrapper'>
                    <code>babel.config.js</code>
                  </div>
                </pre>
              </div>
              <div>
                and includes the following code:
                <br />
              </div>
              <pre>
                <div className='code-wrapper'>
                  <code>
                    {`module.exports = {presets: ['@babel/preset-env', '@babel/preset-react']}`}
                  </code>
                </div>
              </pre>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id={styles.accordionSummary}>
                React Demo
            </AccordionSummary>
            <AccordionDetails>
              <ReactInstructions/>
            </AccordionDetails>
          </Accordion>
        </>
      );
    } else if (title === 'solid') {
      return (
        <Accordion hidden={false}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id={styles.accordionSummary}
          >
            3. Important Solid Babel Configuration
          </AccordionSummary>
          <AccordionDetails id={styles.configGuide}>
            <div id={styles.accordionDiv}>
              <div> Ensure that your project contains the following file: </div>
              <pre>
                <div className='code-wrapper'>
                  <code>babel.config.js</code>
                </div>
              </pre>
            </div>
            <div>
              and includes the following code:
              <br />
            </div>
            <pre>
              <div className='code-wrapper'>
                <code>
                  {`module.exports = {"presets": ["@babel/preset-env","babel-preset-solid", "@babel/preset-typescript"]}`}
                </code>
              </div>
            </pre>
          </AccordionDetails>
        </Accordion>
      );
    } else if (title === 'svelte') {
      return (
        <Accordion hidden={false}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id={styles.accordionSummary}
          >
            3. Important Svelte Babel Configuration
          </AccordionSummary>
          <AccordionDetails id={styles.configGuide}>
            <div id={styles.accordionDiv}>
              <div> Ensure that your project contains the following file: </div>
              <pre>
                <div className='code-wrapper'>
                  <code>babel.config.js</code>
                </div>
              </pre>
            </div>
            <div>
              and includes the following code:
              <br />
            </div>
            <pre>
              <div className='code-wrapper'>
                <code>
                  {`module.exports = {presets: [['@babel/preset-env', { targets: { node: "current" } }]]}`}
                </code>
              </div>
            </pre>
          </AccordionDetails>
        </Accordion>
      );
    }
    return null;
  };

  return (
      <div>
        {/* Configuration Guide */}
        <EndPointGuide />
        <GraphQLGuide />
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id={styles.accordionSummary}
          >
            Configuration Guide
          </AccordionSummary>
          <AccordionDetails id={styles.accordionDetails}>
            <div style={{ width: '100%' }}>
              {/* Change Directory */}
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id={styles.accordionSummary}
                >
                  1. Set terminal to root directory.
                </AccordionSummary>
                <AccordionDetails id={styles.accordionDetails}>
                  <div id={styles.accordionDiv}>
                    <pre>
                      <div className='code-wrapper'>
                        <code>{script.cd}</code>
                      </div>
                    </pre>
                    <span id={styles.runTestButtons}>
                      <Button id={styles.save}
                        className='changeDirectory'
                        onClick={changeDirectory}
                        size="small"
                      >
                        Change Directory
                      </Button>

                      {btnFeedback.changedDir === false ? null : (
                        <p>Directory has been changed to root directory.</p>
                      )}

                    </span>
                  </div>
                </AccordionDetails>
              </Accordion>
              {/* Install Dependencies */}
              {/* conditional rendering for Deno, since it does not require npm */}
              {title === 'deno' ? null: <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id={styles.accordionSummary}
                >
                  2. Install dependencies.
                </AccordionSummary>
                <AccordionDetails id={styles.accordionDetails}>
                  <div id={styles.accordionDiv}>
                    <pre>
                      <div className='code-wrapper' id={styles.codeWrapper}>
                        <code>{script.install}</code>
                      </div>
                    </pre>
                    <span id={styles.runTestButtons}>
                      <Button id={styles.save}
                        onClick={installDependencies}
                        size="small"
                      >
                        Install
                      </Button>
                    </span>
                  </div>
                </AccordionDetails>
              </Accordion>}
              {/* Create config file only if title is react or hook */}
              <ReactDependencies />
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
  );
};

export default Instructions;
