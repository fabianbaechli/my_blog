import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Foo from './Foo.js'
import Bar from './Bar.js'

const MainBody = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Foo}/>
      <Route path='/roster' component={Bar}/>
    </Switch>
  </main>
)

export default MainBody
