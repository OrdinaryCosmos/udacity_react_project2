import React from 'react'
import { connect } from 'react-redux'

function User(props) {// change to stateless component

    let { users } = props;
    let userIDlist = Object.keys(users);
    userIDlist.sort((a, b) => { // sort the users according to the total number of questions they have answered AND questions they have created. 
        return (users[b].questions.length + Object.keys(users[b].answers).length) - (users[a].questions.length + Object.keys(users[a].answers).length)
    })
    return (
        <div>
            {userIDlist.map(userID => {
                let user = users[userID]
                return <div className="user-card" key={userID}>
                    <div className="img-container">
                        <div style={{ backgroundImage: `url(${user.avatarURL})` }} ></div>
                    </div>
                    <div className="usertext">
                        <h3>{user.name}</h3>
                        <div>
                            <span>Answered questions</span>
                            <span>{Object.keys(user.answers).length}</span>
                        </div>
                        <div>
                            <span>Created questions</span>
                            <span>{user.questions.length}</span>
                        </div>
                    </div>

                    <div className="user-score">
                        <p>score <br /><br />
                            {user.questions.length + Object.keys(user.answers).length}</p>
                    </div>




                </div>


            })}
        </div>
    )
}


const mapStateToProps = (state) => ({
    users: state.users
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(User)
