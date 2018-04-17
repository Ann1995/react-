import React from 'react';
import './Item.css';

const Item = (props) => {

    return (
        <div key={props.mainkey} className="col-sm-12 card_main ">
            <div className="card">
                <div className="card-body">
                    <div className="col-sm-12 row">
                        <button
                            type="button "
                            className="close col-sm-12"
                            onClick={props
                            .handleDelete
                            .bind(null, props.mainkey)}>&times;</button>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">{props.errorid}</div>
                        <div className="col-sm-6">{props
                                .errortimestamp
                                .replace("+00:00", " UCT")}</div>
                        <div className="col-sm-12">{props.errorCode}</div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Item;
