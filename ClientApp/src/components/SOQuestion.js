import React, { Component } from 'react';

export class SOQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = { question: '', answers: [], loading: true };      

        // grab answer data from the api
        // the filter on the end gives us the is_accepted flag
        let SOQUrl = "https://api.stackexchange.com/2.2/questions/" + props.match.params.qid + "/answers?order=desc&sort=activity&site=stackoverflow&filter=!--1nZx2SAHs1";        
        fetch(SOQUrl)
            .then(response => response.json())
            .then(data => {
                //randomize the array of answers we got.
                let array = data.items;
                for (let i = array.length-1; i > 0; --i) {
                    const pickItr = Math.floor(Math.random() * i );
                    const cur = array[i];
                    console.log(pickItr);
                    console.log(cur);
                    array[i] = array[pickItr];                    
                    array[pickItr] = cur;
                }

                this.setState({ question: '', answers: array, loading: true });
            });

        // grab question data from the api.
        // that filter on the end limits the data we recieve to just the title and body of the question
        // annoyingly, the SO Api allows you to get some information about the question an answer belongs to from the /questions/{ids}/answers endpoint 
        //...but not the body! Hence, this second api call to just /questions/{ids}
        let justQuestionUrl = "https://api.stackexchange.com/2.2/questions/" + props.match.params.qid + "?order=desc&sort=activity&site=stackoverflow&filter=!BHMIb2uwE7zo5vlTU9xHLOf3-tY-Ea";
        fetch(justQuestionUrl)
            .then(response => response.json())
            .then(data => {                
                this.setState({ question: data.items[0], answers: this.state.answers, loading: false});
            });


    }  

    
        

    

    


    static renderAnswers(answers, question) {        
        function rightAnswer() {            
            // if the user got it right, highlight that answer in green and show them some text that says "Correct!"
            document.getElementById("rightAnswer").style.backgroundColor = 'rgb(100, 240, 125)';
            let infobox = document.getElementById("rightAnswerInfo");
            infobox.innerHTML = "<h3>Correct!</h3>";
            clearAllButtons();
        }

        function wrongAnswer(id) {
            // if the user guessed wrong, highlight the answer that they guessed in red. Then, highlight the correct answer in green.
            // also, give them a nice helpful "Wrong!" to make their day better
            let trId = 'answer' + id;
            let info = trId + 'Info';
            document.getElementById(trId).style.backgroundColor = 'rgb(255, 100, 80)';
            let infobox = document.getElementById(info);            
            infobox.innerHTML = "<h3>Wrong!</h3>"
            document.getElementById("rightAnswer").style.backgroundColor = 'rgb(100, 240, 125)';
            clearAllButtons();
        }

        function clearAllButtons() {
            // after the user guesses, get rid of the buttons on the page so they can't try to guess again            
            // it iterates through the list backwards due to the way that DOM pops the elements off the top of the array (and page)
            let buttons = document.getElementsByClassName("btn-lg");
            for (let i = buttons.length -1; i >= 0 ; --i) {
                buttons[i].remove();
            }            
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
                                return (<tr id="rightAnswer" key={a.answer_id}>
                                    <td><div id="rightAnswerInfo"></div></td>
                                    <td><a onClick={rightAnswer} class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Guess this one</a></td>
                                    <td><div dangerouslySetInnerHTML={{ __html: a.body }}></div></td>
                                </tr>)


                            return (
                                <tr id={'answer' + a.answer_id} key={a.answer_id}>
                                    <td><div id={'answer' + a.answer_id  + 'Info'}></div></td>
                                <td><a onClick={wrongAnswer.bind(this,a.answer_id)} class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Guess this one</a></td>
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