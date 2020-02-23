import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { BrowserRouter, Link } from "react-router-dom"
Enzyme.configure({ adapter: new Adapter() })

import CommentTile from "./Concerts/CommentTile"

describe("CommentTile", () => {
  let wrapper, commentData, user

  beforeEach(() => {

    user = {
      id:1,
      email:"email6@email.com",
      role: "member",
      password:"123456",
      city: "Boston",
      user_name: "user1",
      state: "MA",
      zip: "02116"
    }

    commentData = {
      id: 1,
      user_id: 1,
      comment: "Awesome",
      user: user,
      user_name: "user1",
      concert_name: "Billie Eilish",
      tm_id: "1245odj3",
      comment_time: "February 18, 2020 - 06:47pm"
    }

    wrapper = mount(
      <BrowserRouter>
      <CommentTile
        commentData={commentData}
      />
      </BrowserRouter>
    )
  })

  it("should render a comment-user class containing text received via props", () => {
    expect(wrapper.find('.comment-user').text()).toEqual("user1")
  })

  it("should render a comment-text class with text recieved via props", () => {
    expect(wrapper.find('.comment').text()).toEqual("Awesome")
  })

  it("should render a comment-time class with text recieved via props", () => {
    expect(wrapper.find('.comment-time').text()).toEqual("February 18, 2020 - 06:47pm")
  })
})
