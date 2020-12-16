import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { SOQuestionSet } from './components/SOQuestionSet'
import {SOQuestion} from './components/SOQuestion'

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetchdata' component={FetchData} />
        <Route path='/soq' component={SOQuestionSet} />
        <Route path='/q/:qid' component={SOQuestion} />
      </Layout>
    );
  }
}
