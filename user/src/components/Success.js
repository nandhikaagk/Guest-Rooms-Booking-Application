import React from 'react';
const Success = ({ message }) => {
    return (
        <div>
            <div class="alert alert-success">
                {message}
            </div>
        </div>
    )
}
export default Success;