import React from 'react'
import { Link } from 'react-router-dom'

const MainBox = () => {
    return (
        <div className="mainbox">
            <div className="box">
                <div className="leftBox">
                    <div className="leftBoxTop" style={{ "animationDelay": "1s" }} >
                        <div className="head"><span>Prompt</span></div>
                        <div className="leftBoxTopBottom">
                            <h4>Max Profit With K Transactions</h4>
                            <div>
                                <div style={{ maxWidth: "150px", "animationDelay": '1s' }} />
                                <div style={{ "animationDelay": '1s' }} />
                                <div style={{ "animationDelay": '1s' }} />
                                <div style={{ maxWidth: "150px", "animationDelay": '1.2s' }} />
                                <div style={{ maxWidth: "150px", "animationDelay": '1.4s' }} /><br />
                                <div style={{ "animationDelay": '1s' }} />
                                <div style={{ maxWidth: "150px", "animationDelay": '1s' }} />
                                <div style={{ maxWidth: "150px", "animationDelay": '1.6s' }} />
                                <div style={{ maxWidth: "150px", "animationDelay": '1s' }} />
                                <div style={{ maxWidth: "150px", "animationDelay": '1.8s' }} />
                            </div>

                        </div>
                    </div>
                    <div className="leftBoxBottom" style={{ height: 184, "animationDelay": '1.5s' }}>
                        <div className="head"><span>Tests</span></div>
                        <div className="leftBoxBottomBottom">
                            <div style={{ "animationDelay": '2s' }}>
                                <span style={{ width: '8.20556%', backgroundColor: '#be8a28' }} />
                                <span style={{ width: '11.0197%', backgroundColor: '#5e5efb' }} />
                                <span style={{ width: '5.41402%', backgroundColor: '#5a395a' }} />
                                <span style={{ width: '17.1151%', backgroundColor: '#48aca2' }} />
                            </div>
                            <div style={{ "animationDelay": '2.3s' }}>
                                <span style={{ width: '21.4231%', backgroundColor: '#48aca2' }} />
                                <span style={{ width: '6.68326%', backgroundColor: '#5e5efb' }} />
                                <span style={{ width: '21.14%', backgroundColor: '#be8a28' }} />
                                <span style={{ width: '19.1112%', backgroundColor: '#5a395a' }} />
                            </div>
                            <div style={{ "animationDelay": '2.6s' }}>
                                <span style={{ width: '11.1365%', backgroundColor: '#5e5efb' }} />
                                <span style={{ width: '21.0259%', backgroundColor: '#be8a28' }} />
                                <span style={{ width: '8.86862%', backgroundColor: '#5a395a' }} />
                                <span style={{ width: '14.2613%', backgroundColor: '#48aca2' }} />
                            </div>
                            <div style={{ "animationDelay": '2.9s' }}>
                                <span style={{ width: '14.9313%', backgroundColor: '#5a395a' }} />
                                <span style={{ width: '18.6642%', backgroundColor: '#5e5efb' }} />
                                <span style={{ width: '8.36862%', backgroundColor: '#48aca2' }} /><span style={{ width: '5.95403%' }} />
                            </div>
                        </div>
                    </div >

                </div >
                <div className="rightBox">
                    <div className="rightBoxTop" style={{ "animationDelay": '2s' }}>
                        <div className="head"><span>Input</span>
                            <button>Run</button>
                        </div>
                        <div className="rightBoxTopBottom">
                            <div style={{ paddingLeft: 0, animationDelay: '1.2s' }}><span className="green" /><span className="green" /><span className="brown" /></div>
                            <div style={{ paddingLeft: 20, animationDelay: '1.2s' }}><span className="neon" /><span /><span className="neon" /><span className="green" /></div>
                            <div style={{ paddingLeft: 40 }}><span /><span className="green" /><span className="brown" /><span className="neon" /></div>
                            <div style={{ paddingLeft: 40 }}><span className="orange" /><span className="neon" /><span className="neon" /><span className="green" /></div>
                            <div style={{ paddingLeft: 20 }}><span className="orange" /><span className="blue" /></div><br />
                            <div style={{ paddingLeft: 0 }}><span className="blue" /><span className="blue" /><span className="neon" />
                            </div>
                            <div style={{ paddingLeft: 20 }}><span className="blue" /><span className="green" /><span className="green" /><span /></div>
                            <div style={{ paddingLeft: 40 }}><span className="brown" /><span className="green" /><span className="neon" /><span className="green" /></div>
                            <div style={{ paddingLeft: 40 }}><span className="blue" /><span className="blue" /><span className="brown" /><span className="brown" /></div>
                            <div style={{ paddingLeft: 20 }}><span className="green" /><span className="blue" /></div>
                        </div>
                    </div>
                    <div className="rightBoxBottom" style={{ height: 185, "animationDelay": '2.5s' }}>
                        <div className="head"><span>Output</span>
                            <button className="submitalgo" style={{ backgroundColor: 'green' }}>Submit</button>
                        </div>
                        <div className="rightBoxBottomBottom">
                            <div className="loading" data-tip />
                            <div>
                                <div className="wrong" style={{ transform: 'scale(1)', "animationDelay": '5s' }}>
                                    <svg viewBox="0 0 232 232" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle className="circle" cx={116} cy={116} r="108.5" stroke="currentColor" strokeWidth={15}>
                                        </circle>
                                        <path className="line1" stroke="currentColor" strokeWidth={15} strokeLinecap="round" d="M67.32 162.789l95.236-95.681" />
                                        <path className="line2" stroke="currentColor" strokeWidth={15} strokeLinecap="round" d="M164.9 162.562L69.219 67.325" />
                                    </svg>
                                    <div />
                                </div>
                                <div style={{ transform: 'scale(1)', "animationDelay": '5.5s' }}>
                                    <svg viewBox="0 0 232 232" fill="none" xmlns="http://www.w3.org/2000/svg" className="right">
                                        <circle className="circle" cx={116} cy={116} r="108.5" stroke="currentColor" strokeWidth={15} strokeLinejoin="round" />
                                        <path className="line1" stroke="currentColor" strokeWidth={15} strokeLinecap="round" strokeLinejoin="round" d="M65.606 114.888l37.282 36.506" />
                                        <path className="line2" stroke="currentColor" strokeWidth={15} strokeLinecap="round" strokeLinejoin="round" d="M177.741 80.603l-73.138 69.656" />
                                    </svg>
                                    <div />
                                </div>
                                <div className="wrong" style={{ transform: 'scale(1)', "animationDelay": '6s' }}>
                                    <svg viewBox="0 0 232 232" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle className="circle" cx={116} cy={116} r="108.5" stroke="currentColor" strokeWidth={15}>
                                        </circle>
                                        <path className="line1" stroke="currentColor" strokeWidth={15} strokeLinecap="round" d="M67.32 162.789l95.236-95.681" />
                                        <path className="line2" stroke="currentColor" strokeWidth={15} strokeLinecap="round" d="M164.9 162.562L69.219 67.325" />
                                    </svg>
                                    <div />
                                </div >
                                <div className="wrong" style={{ transform: 'scale(1)', "animationDelay": '6.5s' }}>
                                    <svg viewBox="0 0 232 232" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle className="circle" cx={116} cy={116} r="108.5" stroke="currentColor" strokeWidth={15}>
                                        </circle>
                                        <path className="line1" stroke="currentColor" strokeWidth={15} strokeLinecap="round" d="M67.32 162.789l95.236-95.681" />
                                        <path className="line2" stroke="currentColor" strokeWidth={15} strokeLinecap="round" d="M164.9 162.562L69.219 67.325" />
                                    </svg>
                                    <div />
                                </div >
                                <div style={{ transform: 'scale(1)', "animationDelay": '7s' }}>
                                    <svg viewBox="0 0 232 232" fill="none" xmlns="http://www.w3.org/2000/svg" className="right">
                                        <circle className="circle" cx={116} cy={116} r="108.5" stroke="currentColor" strokeWidth={15} strokeLinejoin="round" />
                                        <path className="line1" stroke="currentColor" strokeWidth={15} strokeLinecap="round" strokeLinejoin="round" d="M65.606 114.888l37.282 36.506" />
                                        <path className="line2" stroke="currentColor" strokeWidth={15} strokeLinecap="round" strokeLinejoin="round" d="M177.741 80.603l-73.138 69.656" />
                                    </svg>
                                    <div />
                                </div >
                                <div style={{ transform: 'scale(1)', "animationDelay": '7.2s' }}>
                                    <Link to="/create">
                                        <button className='btn btn-dark' >Run</button>
                                    </Link>
                                </div>
                            </div >
                        </div >
                    </div >
                </div >

            </div >
        </div >
    )
}

export default MainBox
