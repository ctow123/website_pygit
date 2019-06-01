import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Switch from '@material-ui/core/Switch';


import { Link as RRLink } from 'react-router-dom';
import { withRouter, Switch as RRSwitch } from 'react-router';

/* props.children is a reference to the child elements of this components, e.g. what's
 * inside
 * <TabChooser>
 *   <Child1 .. />
 *   <Child2 .. />
 * </TabChooser>
 */

import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';
const styles = {
  theme: {
    color: 'white',
    fontSize: 11,
    backgroundColor: 'black'
  }
};
const TabChooser = ({ children }) => {
  console.log(children.props.children);
  children = children.props.children;
  console.log(children);
  const [currentTab, selectTab] = useState(0); // currently selected tab by index
  const [currentTabSpinning, makeCurrentTabSpinning] = useState(false); // display spinner or not
  let selectedTab = children[currentTab]; // react element corresponding to selected tab
  return (
    <>
      <Toolbar style={styles.theme}>
        <Tabs>
          {children.map((tab, i) => (
            <Tab onClick={() => selectTab(i)} label={tab.props.label}>

              {tab.props.label}
            </Tab>
          ))}
        </Tabs>
      </Toolbar>
      <div className={`tab ${currentTabSpinning ? 'spinner' : ''}`}>
        {/* Since the element is already created when passed as a child, we
            can't just add a property.  React.cloneElement allows us to add
            a property 'showSpinner' that allows the embedded tab component
            to turn the spinner off and on.
         */}
        {React.cloneElement(selectedTab, {
          showSpinner: makeCurrentTabSpinning
        })}
      </div>
    </>
  );
};

// ^ react clone element clones the actual welcome.js file and displays it
export default TabChooser;
