import React from 'react';

const BaseLayout = (props) => {
    return (
        <div style={{ height: 'calc(100vh)', overflowY: 'hidden' }}>
            <div className="d-flex col-12" style={{ height: 'calc(100vh)' }}>

                <div className='col-md-8 d-sm-none d-md-block'>
                    <img src="https://i.pinimg.com/originals/94/f5/3b/94f53bd1f3f7e1975450ae207c54ff1a.jpg" alt="marea logo" className='img-fluid pattern-border' />
                </div>

                <div className="col-md-4 col-sm-12">
                    {props.children}
                </div>

            </div>
        </div>
    );
}


export default BaseLayout