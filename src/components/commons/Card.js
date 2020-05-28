import React from "react";

const Card = props => {
    let {className, header, children, footer} = props;
    return (
        <article className={`slds-card slds-theme_default custom-card ${className}`}>
            {header || <DefaultHeader {...props}/>}
            <div className="slds-scrollable slds-p-around--xx-small custom-card__content">{children}</div>
            <footer className="slds-card__footer custom-card__footer">{footer}</footer>
        </article>
    );
};

const DefaultHeader = ({icon, label, headerActions}) => {
    return (
        <div className="slds-p-around--small slds-grid custom-card__header">
            <header className="slds-media slds-media_center slds-has-flexi-truncate">
                {!!icon && <div className="slds-media__figure">{icon}</div>}
                <div className="slds-media__body">
                    <h2 className="slds-card__header-title">{label}</h2>
                </div>
                {!!headerActions && <div className="slds-no-flex">{headerActions}</div>}
            </header>
        </div>
    );
}

export default Card;