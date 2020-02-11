import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { BrowserRouter, Link } from "react-router-dom"
Enzyme.configure({ adapter: new Adapter() })

import ConcertTile from "./Concerts/ConcertTile"

describe("ConcertTile", () => {
  let wrapper, concert, user

  beforeEach(() => {
    concert = {
    "name": "Guns N' Roses 2020 Tour",
    "date": "July 21, 2020 ",
    "image": "https://s1.ticketm.net/dam/a/26a/a1c6b081-0e43-4660-b28d-c1e5a145826a_1277601_RETINA_LANDSCAPE_16_9.jpg",
    "url": "http://www.ticketsnow.com/InventoryBrowse/TicketList.aspx?PID=2923458",
    "venue": "Fenway Park",
    "tm_id": "Z7r9jZ1Ae0Nob",
    "city": "Boston",
    "state": "MA",
    "address": "4 Yawkey Way",
    "genre": "Rock",
    "sub_genre": "Rock",
    "sale_date": "February 07, 2020 - 05:00pm"
    }

    wrapper = mount(
      <BrowserRouter>
        <ConcertTile
          concert={concert}
          />
      </BrowserRouter>
    )
  })

  it("should render an img tag containing the img received via props", () => {
    expect(wrapper.find('img').props()).toEqual({
      className: "tile-img",
      src: "https://s1.ticketm.net/dam/a/26a/a1c6b081-0e43-4660-b28d-c1e5a145826a_1277601_RETINA_LANDSCAPE_16_9.jpg"})
  });

  it("should render a h4 tag containing the text received via props", () =>{
  expect(wrapper.find('h4').text()).toBe("Guns N' Roses 2020 Tour")
  });

  it("should render a date class", () =>{
  expect(wrapper.find('.date').text()).toBe("July 21, 2020 ")
  });

  it("should render a venue class", () =>{
  expect(wrapper.find('.venue').text()).toBe("Fenway Park - Boston, MA")
  });
})
