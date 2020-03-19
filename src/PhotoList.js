import React from 'react';

export default function PhotoList(props) {

    if (props.nbSearchResults === 0) {
        return (<span>No photo found</span>);

    } else {
        return (
            <div>
                { props.photoContainers }
            </div>
        );
    }
}
