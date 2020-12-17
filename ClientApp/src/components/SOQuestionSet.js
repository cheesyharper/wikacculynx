import React, { Component } from 'react';

export class SOQuestionSet extends Component {
    constructor(props) {
        super(props);
        this.state = { questions: [], loading: true };        
        let hourAgo = parseInt((Date.now() / 1000) - (48*360));       
        let SOApiUrl = "https://api.stackexchange.com/2.2/search/advanced?fromdate=" + hourAgo + "&order=desc&sort=activity&accepted=True&site=stackoverflow";
        fetch(SOApiUrl)
            .then(response => response.json())
            .then(data => {

                let goodQs = [];
                for (let i = 0; i < data.items.length; ++i) {
                    if (data.items[i].is_answered && data.items[i].answer_count > 1) {
                        goodQs.push(data.items[i]);
                    }
                }
                this.setState({ questions: goodQs, loading: false });
            })
    }


    static renderQuestionTable(qs) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Votes</th>
                        <th>Answers</th>
                        <th>Views</th>
                        <th>Question</th>
                    </tr>
                </thead>
                <tbody>
                    {qs.map(q =>                        
                        <tr key={q.score}>                            
                            <td><a href={'q/' + q.question_id} class="btn btn-primary btn-lg active" role="button" aria-pressed="true">View</a></td>
                            <td>{q.score}</td>
                            <td>{q.answer_count}</td>
                            <td>{q.view_count}</td>
                            <td>{q.title}</td>                            
                        </tr>                        
                    )}
                </tbody>
            </table>
        );
    }


    

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : SOQuestionSet.renderQuestionTable(this.state.questions);

        return (
            <div>
                <h1>Recent Questions</h1>
                <p>Click on a question to view its answers.</p>
                {contents}
            </div>
        );
    }

}