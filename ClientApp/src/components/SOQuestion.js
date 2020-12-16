import React, { Component } from 'react';

export class SOQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = { question: '', answers: [], loading: true };        
        let SOQUrl = "https://api.stackexchange.com/2.2/questions/" + props.match.params.qid + "/answers?order=desc&sort=activity&site=stackoverflow&filter=!--1nZx2SAHs1";
        fetch(SOQUrl)
            .then(response => response.json())
            .then(data => {                
                this.setState({ question: '', answers: data.items, loading: false });
            });
    }

    static renderAnswers(answers) {
        let dom = new DOMParser();
        return (
            <table className='table'>                
                <tbody>
                    {answers.map(a =>
                        <tr key={a.answer_id}>
                            <td><a href="#" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">This one</a></td>     
                            <td><div dangerouslySetInnerHTML={{ __html: a.body }}></div></td>                            
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : SOQuestion.renderAnswers(this.state.answers);

        return (<div>
                {contents}
                </div>
            );
    }
}