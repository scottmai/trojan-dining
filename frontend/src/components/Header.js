const Header = ({locationName}) => {
    return (
        <div className="header">
            <h2>{locationName}</h2>
            
            {/* TODO: Calendar link */}
            <button>January 20, 2022</button>
        </div>
    );
}

export default Header;