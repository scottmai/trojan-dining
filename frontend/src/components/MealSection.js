import PropTypes from 'prop-types';
import MealItem from './MealItem'

const MealSection = (props) => {

    const items = [];
    
    // Populate items
    for (let i=0; i<10; i++) {
        items.push(<MealItem name={'Food Item ' + i} />);
        console.log(items[i]);
    }

    return (
        <div className='mealSection'>
            <h1>{props.stationName}</h1>
            <ul>
                {items.map(item => <li>{item}</li>)}
            </ul>
        </div>
    );
}

MealSection.propTypes = {
    stationName: PropTypes.string.isRequired,
    // itemList: PropTypes.string.array.isRequired,
}

export default MealSection;