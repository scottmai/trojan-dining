import React from "react";

const AllergenModal = (props) => {

    const onClose = (e) => {
        props.onClose && props.onClose(e);
    }

    if (!props.show) {
        return null;
    }

    return (
        <div className="allergenModal">
            <div className="modal-bg" onClick={onClose}> </div>
            <div className={`container ${props.show ? "modal-open" : ""}`}>
                <button className="close-button" onClick={onClose}>X</button>
                <div className="row allergen-list justify-content-center">
                    <div className="col-10">
                        <h2>Allergen Key</h2>
                        <ul>
                            <li>
                                <span className="allergen-dairy">&#11044;</span>
                                Dairy
                            </li>
                            <li>
                                <span className="allergen-eggs">&#11044;</span>
                                Eggs
                            </li>
                            <li>
                                <span className="allergen-fish">&#11044;</span>
                                Fish
                            </li>
                            <li>
                                <span className="allergen-food-not-analyzed-for-allergens">&#11044;</span>
                                Food Not Analyzed for Allergens
                            </li>
                            <li>
                                <span className="allergen-peanuts">&#11044;</span>
                                Peanuts
                            </li>
                            <li>
                                <span className="allergen-pork">&#11044;</span>
                                Pork
                            </li>
                            <li>
                                <span className="allergen-sesame">&#11044;</span>
                                Sesame
                            </li>
                            <li>
                                <span className="allergen-shellfish">&#11044;</span>
                                Shellfish
                            </li>
                            <li>
                                <span className="allergen-soy">&#11044;</span>
                                Soy
                            </li>
                            <li>
                                <span className="allergen-tree-nuts">&#11044;</span>
                                Tree Nuts
                            </li>
                            <li>
                                <span className="allergen-vegan">&#11044;</span>
                                Vegan
                            </li>
                            <li>
                                <span className="allergen-vegeterian">&#11044;</span>
                                Vegetarian
                            </li>
                            <li>
                                <span className="allergen-gluten">&#11044;</span>
                                Wheat/Gluten
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AllergenModal;