import React, { Component } from "react";
import "./index.scss";

import * as request from "../../Util/HttpRequest";

export default class Thread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thread: {},
      childLength: 0,
      selectedIndex: null
    };
  }

  handleSelectByIndex = index => {
    let { childLength } = this.state;
    index = Math.max(index, -1);
    index = Math.min(index, childLength - 1);
    // console.log(index);
    this.setState({
      selectedIndex: index
    });
  };

  handleAddSubmit = async () => {
    try {
      let { thread, childLength } = this.state;
      let params = {
        vertex: {
          email: "johnny@wizschool.io",
          type: "BEAD",
          title: `bead`,
          content: `${Date.now()}`
        },
        fromId: thread.id,
        order: childLength
      };
      let response = await request.addVertex(params);
      let result = await response.json();
      console.log("add result", result);
      let { edge, vertex } = result;
      this.setState(state => ({
        thread: {
          ...state.thread,
          childEdges: [
            ...state.thread.childEdges,
            {
              order: edge.order,
              createdAt: edge.createdAt,
              childVertex: {
                ...vertex
              }
            }
          ]
        },
        childLength: state.childLength + 1,
        selectedIndex: edge.order
      }));
    } catch (err) {
      console.error(err);
    }
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    if (!id) return;

    request
      .getVertex({ id: id })
      .then(res => res.json())
      .then(thread => {
        // todo
        let childLength = thread.childEdges.length;
        let selectedIndex = childLength - 1;
        this.setState({ thread, childLength, selectedIndex });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { thread, selectedIndex } = this.state;
    console.log("state", this.state);
    if (!thread.id) {
      return <div>로딩 중입니다..</div>;
    }

    let selected, vertex, ThreadToggle;
    if (selectedIndex === -1) {
      selected = thread; // edges to this vertex?
      vertex = thread;
      ThreadToggle = "on";
    } else {
      selected = thread.childEdges[selectedIndex];
      // console.log("selected", selected);
      vertex = selected.childVertex;
      ThreadToggle = "off";
    }

    return (
      <div className="Page--Thread">
        <section className="section section--Top">
          <div className={`Thread Thread--${ThreadToggle}`}>
            <h2
              className="Thread__title"
              onClick={() => this.handleSelectByIndex(-1)}
            >
              {thread.title}
            </h2>
            <ul className="ChildItemList">
              {thread.childEdges.map((edge, index) => {
                let vertex = edge.childVertex;
                let toggle = index === selectedIndex ? "on" : "off";
                return (
                  <li
                    className={`ChildItem ChildItem--${
                      vertex.type
                    } ChildItem--${toggle}`}
                    key={index}
                    onClick={() => this.handleSelectByIndex(index)}
                  >
                    <p className="ChildItem__type">{vertex.type}</p>
                    <p className="ChildItem__title">{vertex.title}</p>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="Thread__btnRow">
            <button onClick={this.handleAddSubmit}>vertex 추가</button>
          </div>
        </section>
        <section className="section section--Board">
          <div className="Board">
            <p>{vertex.title}</p>
            <p>{vertex.content}</p>
          </div>
        </section>
        <section className="section section--Bottom">
          <div className="Controller">
            <p
              className="Controller__arrowBtn Controller__arrowBtn--left"
              onClick={() => this.handleSelectByIndex(selectedIndex - 1)}
            >
              left
            </p>
            <p
              className="Controller__arrowBtn Controller__arrowBtn--right"
              onClick={() => this.handleSelectByIndex(selectedIndex + 1)}
            >
              right
            </p>
          </div>
        </section>
      </div>
    );
  }
}
