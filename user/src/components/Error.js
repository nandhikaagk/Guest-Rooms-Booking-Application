import React from 'react';
const Error = ({ message }) => {
    return (
        <div>
            <div className="alert alert-danger">
                {message}
            </div>
        </div>
    );
};

export default Error;
