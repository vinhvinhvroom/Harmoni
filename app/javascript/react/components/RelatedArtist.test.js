import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { BrowserRouter, Link } from "react-router-dom"
Enzyme.configure({ adapter: new Adapter() })

import RelatedArtist from "./Concerts/RelatedArtist"

describe("RelatedArtist", () => {
  let wrapper, relatedArtistData

  beforeEach(() => {

    relatedArtistData = {
      name: "King Princess",
      spotifyLink: "https://open.spotify.com/artist/6beUvFUlKliUYJdLOXNj9C",
      image: "https://i.scdn.co/image/b8f778308036602ebb89f81a4bde02ed49525b4b",
      genre: "dance pop"
    }

    wrapper = mount(
      <BrowserRouter>
      <RelatedArtist
        name="King Princess"
        spotifyLink="https://open.spotify.com/artist/6beUvFUlKliUYJdLOXNj9C"
        image="https://i.scdn.co/image/b8f778308036602ebb89f81a4bde02ed49525b4b"
        genre="dance pop"
      />
      </BrowserRouter>
    )
  })

  it("should render a h4 tag containing text received via props", () => {
    expect(wrapper.find('h4').text()).toEqual("King Princess")
  })

  it("should render an img tag containing the img received via props", () => {
    expect(wrapper.find('img').props()).toEqual({
      className: "show show-related-img",
      src: "https://i.scdn.co/image/b8f778308036602ebb89f81a4bde02ed49525b4b"})
  });

  it("should render a h5 tag with text recieved via props", () => {
    expect(wrapper.find('h5').text()).toEqual("dance pop")
  })

})
