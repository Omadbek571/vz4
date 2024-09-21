import React from 'react';

function Card(props) {
    const { username, email, lang, id, desc } = props.user;
    const { deleteItem } = props;

    return (
        <div  className='card'>
            <h3>Name:{username}</h3>
            <h3>Gmail: {email}</h3>
            <h3>Desc: {desc}</h3>

            {lang.length > 0 && (
                <div>
                    {lang.map((value) => (
                        <span key={value}>
                            {value}
                        </span>
                    ))}
                </div>
            )}
            <br />
            <button onClick={() => id && deleteItem(id)}>Delete</button>
        </div>
    );
}

export default Card;
