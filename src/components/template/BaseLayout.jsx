import React from 'react';

const BaseLayout = (props) => {
    return (
        <div style={{ height: '100vh' }}>
            <div className="d-flex col-12" style={{ height: '100vh' }}>

                <div className='col-md-8 d-none d-md-block fill' style={{ overflowY: 'hidden' }}>
                    <img src="https://i.pinimg.com/originals/94/f5/3b/94f53bd1f3f7e1975450ae207c54ff1a.jpg" alt="marea logo" className='img-fluid pattern-border' />
                </div>

                <div className="col-md-4 col-sm-12 col-xs-12" style={{ overflowY: 'auto' }}>
                    {props.children}
                </div>

            </div>
        </div>
    );
}


export default BaseLayout