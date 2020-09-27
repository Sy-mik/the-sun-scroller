import React from 'react'
import { Transition, animated } from 'react-spring/renderprops'
import classnames from 'classnames'
import './styles.css'

const itemsText = [
    {text: "Hey, do you want to learn more about the sun? ☀️", left:false,isLink:false},
    {text:"Sure!", left:true, isLink:false},
    {text:"Check this one", left:false, isLink:false},
    {text:"https://solarsystem.nasa.gov/solar-system/sun/in-depth/", left:false, isLink:true},
    {text:"Thanks! What about some videos?", left:true,isLink:false},
    {text:"Here you go 🚀", left:false, isLink:false},
    {text:"https://www.youtube.com/watch?v=3mnSDifDSxQ/", left:false, isLink:true},
    {text:"https://www.youtube.com/watch?v=oHHSSJDJ4oo/", left:false, isLink:true},  
];

function addItem(state) {

  const items = [...state.items]
  items.push({ key: state.items.length, text:itemsText[count].text, left:itemsText[count].left, 
    first:count==0,
    ast: count===itemsText.length-1, 
    isLink:itemsText[count].isLink })
  
  return { items }
}

let count = 0
export default class LearnMoreChatContainer extends React.PureComponent {
  state = { items: [] }

  list = React.createRef()
  el = React.createRef()

  addItems = () =>
    setTimeout(
      () => void (this.setState(addItem), count++,count < itemsText.length && this.addItems()),count==0 ? 0 : 1500
    )
    
  componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling);
  }
    
  trackScrolling = () => {
    if (this.isBottom(this.list)) {
        this.addItems();
        document.removeEventListener('scroll', this.trackScrolling);
    }
  };
  isBottom(el) {
  return el.current.getBoundingClientRect().bottom-300 <= window.innerHeight;
}


  render() {
    return (
      <div className="chat-container" style={{height:600}}>
        <ul className="ul-c" ref={this.list}>
          <Transition
            native
            items={this.state.items}
            keys={item => item.key}
            from={{ opacity: 0, transform: 'translate3d(0,60px,0)' }}
            enter={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            config={{ tension: 50, friction: 25 }}>
            {({ text, left, first, last, isLink }, i, state) => styles => (
              <animated.li
                ref={state === 'enter' && this.el}
                className={classnames({ left, right: !left, first, last })}
                style={styles}>

                {isLink ? <a target="_blank" href={text}>{text}</a>: text}
                
              </animated.li>
            )}
          </Transition>
        </ul>
      </div>
    )
  }

  componentDidUpdate() {
    if (this.el.current)
      this.el.current.scrollIntoView({
        behavior: "smooth", block: "end", inline: "nearest"
      })
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }

}