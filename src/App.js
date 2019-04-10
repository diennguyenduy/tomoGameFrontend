import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import Web3 from 'web3'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

import './App.css';



class App extends Component {

    constructor(props){
        super(props)
        this.state ={
            account : '0x0',
            balance : '',
            question: '',
            answer : [],
            ranking :[
                {
                    account: '',
                    correct: ''
                }
            ]
        }    
    }
    
    async componentDidMount(){

        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

        await web3.eth.getCoinbase().then((account)=>{
            this.setState({account})
        });

        await web3.eth.getBalance(this.state.account).then((balance)=>{
            balance = web3.utils.fromWei(balance);
            this.setState({balance})
        })
        
    }
    
    render() {
        
        const { rank } = this.props;
        const {question} = this.props.question;
        console.log(this.props.question.project_hunter) // can get data from firebase

        return (   
            <div>
                <Container>
                    <Row className="set_height">
                        <Col className = "box_color" xs="8">
                            <div className="margin_box ">
                                {/* question */}
                                <div className = "question"> 
                                    <Col className = "user_account">
                                        <h5><strong>Your account :</strong> {this.state.account}</h5>
                                        <p><strong>Balance :</strong> {this.state.balance} <strong>ETH</strong></p>
                                    </Col>
                                    <Col className = "question_box">
                                        <div className ="question_position">
                                            <h1>Question</h1>
                                            {/* <h1 >{question.project_hunter.B0V9KVe5UzoD9z4GgWhC.question} </h1> */}
                                        </div>
                                    </Col>
                                </div>
                                {/* answer */}
                                <Col className = "question">
                                    <div className = "answer_position">
                                        <Col >
                                            <Button className = "answer_box" outline color="primary">
                                                A.
                                                {/* A. {question.project_hunter.B0V9KVe5UzoD9z4GgWhC.answer[0]} */}
                                            </Button>
                                        </Col>                                        
                                        <Col >
                                            <Button className = "answer_box" outline color="primary">
                                                B.
                                                {/* B. {question.project_hunter.B0V9KVe5UzoD9z4GgWhC.answer[1]} */}
                                            </Button>
                                        </Col>
                                        <Col >
                                            <Button className = "answer_box" outline color="primary">
                                                C.
                                                {/* C. {question.project_hunter.B0V9KVe5UzoD9z4GgWhC.answer[2]} */}
                                            </Button>
                                        </Col>
                                    </div>                                    
                                </Col>
                            </div>
                        </Col>
                        <Col className = "box_color" xs="4">
                            <div className="ranking margin_box" >
                                {/* Ranking */}
                                <div className = "ranking_title">
                                    <h1>Ranking</h1>
                                </div>
                                {/* member ranking */}
                                <div className = "person_rank_box">
                                    {
                                        rank.map(rank => (
                                            <div key={rank.account} className = "person_rank">
                                                <p className = "user_account">
                                                    <span className = "ellipsis">{rank.account}</span>
                                                    <span className = "indent">{rank.account}</span>                                        
                                                </p>
                                                <p>
                                                    {rank.correct}/10
                                                </p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    // console.log(state.firestore.data) // get data firebase 
    return {
        question : state.firestore.data,
        rank : state.rank.ranking
    }
}

export default compose(
    connect(mapStatetoProps),
    firestoreConnect([
        { collection : 'project_hunter'}
    ])
)(App);
