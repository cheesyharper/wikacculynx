import React, { Component } from 'react';

export class SOQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = { question: '', answers: [], loading: true };        
        let SOQUrl = "https://api.stackexchange.com/2.2/questions/" + props.match.params.qid + "/answers?order=desc&sort=activity&site=stackoverflow&filter=!--1nZx2SAHs1";        
        fetch(SOQUrl)
            .then(response => response.json())
            .then(data => {                
                this.setState({ question: '', answers: data.items, loading: true });
            });

        let justQuestionUrl = "https://api.stackexchange.com/2.2/questions/" + props.match.params.qid + "?order=desc&sort=activity&site=stackoverflow&filter=!BHMIb2uwE7zo5vlTU9xHLOf3-tY-Ea";
        fetch(justQuestionUrl)
            .then(response => response.json())
            .then(data => {                
                this.setState({ question: data.items[0], answers: this.state.answers, loading: false});
            });


    }  

    

    static renderAnswers(answers, question) {        
        function rightAnswer() {
            
        }

        function wrongAnswer() {

        }

        return (            

            <div>
                <div><h2>Question:</h2></div>
                <table>
                    <tbody>
                            <tr>
                            <td><h3>{question.title}</h3></td>
                            </tr>
                            <tr>
                                <td><div dangerouslySetInnerHTML={{ __html: question.body }}></div></td>
                            </tr>
                        </tbody>                    
                </table>
            
                <div><h2>Answers:</h2></div>
                <table className='table'>                
                    <tbody>
                        {answers.map(a => {
                            if (a.is_accepted)
                                return (<tr key={a.answer_id}>
                                    <td><a onClick={rightAnswer} class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Guess this one</a></td>
                                    <td><div dangerouslySetInnerHTML={{ __html: a.body }}></div></td>
                                </tr>)


                            return (
                            <tr key={a.answer_id}>
                                <td><a onClick={wrongAnswer} class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Don't guess this one</a></td>
                                <td><div dangerouslySetInnerHTML={{ __html: a.body }}></div></td>
                            </tr>)
                        }
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : SOQuestion.renderAnswers(this.state.answers, this.state.question);

        return (<div>
                {contents}
                </div>
            );
    }
}