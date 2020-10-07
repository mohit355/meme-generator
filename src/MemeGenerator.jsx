import React, { Component } from "react";

class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.generateRandomImg = this.generateRandomImg.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        // console.log(memes);
        this.setState({
          allMemeImgs: memes,
        });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  generateRandomImg(event) {
    const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
    const randMemeImg = this.state.allMemeImgs[randNum].url;
    this.setState({
      randomImg: randMemeImg,
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form className="meme-form">
          <input
            type="text"
            name="topText"
            value={this.state.topText}
            onChange={this.handleChange}
            placeholder="top text"
            autoComplete="off"
          />
          <input
            type="text"
            name="bottomText"
            value={this.state.bottomText}
            onChange={this.handleChange}
            placeholder="bottom text"
            autoComplete="off"
          />
          <button onClick={this.generateRandomImg}>Generate</button>
        </form>
        <div className="meme">
          <img className="memeimage" src={this.state.randomImg} alt="" />
          <h1 className="top"> {this.state.topText} </h1>
          <h1 className="bottom"> {this.state.bottomText} </h1>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
