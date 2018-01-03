import React from 'react'

import c from '../model/Constants.js'
import DataSource from '../model/DataSource.js'
import style from "../style/AdminController.scss"

import Header from "./Header"
import ContentContainer from './ContentContainer'

export const AdminController = () => (
  <div className="BlogController">
    <Header
      header_content="Admin"
    />
    <ContentContainer>
      <div className="content">
        <form>
          <div className="field">
            <input placeholder="Username" type="text" name="name" />
          </div>
          <div className="field">
            <input placeholder="Password" type="password" name="name" />
          </div>
          <br/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </ContentContainer>
  </div>
)
