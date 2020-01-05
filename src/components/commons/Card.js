import React from "react";

const Card = props => {
    let {label, className, icon, headerActions} = props;
    return (
        <article className={`slds-card slds-theme_default custom-card ${className}`}>
            <div className="slds-card__header slds-grid custom-card__header">
                <header className="slds-media slds-media_center slds-has-flexi-truncate">
                    {!!icon && <div className="slds-media__figure">{icon}</div>}
                    <div className="slds-media__body">
                        <h2 className="slds-card__header-title">{label}</h2>
                    </div>
                    {!!headerActions && <div className="slds-no-flex">{headerActions}</div>}
                </header>
            </div>
            <footer className="slds-scrollable slds-p-around--x-small custom-card__content">
                {props.children}
            </footer>
        </article>
    );
};

export default Card;