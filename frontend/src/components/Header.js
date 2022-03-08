const Header = ({locationName}) => {
    return (
        <div className="header row">
            <h2 className="col-7">{locationName}</h2>
            
            {/* TODO: Calendar link */}
            <button className="col">January 20, 2022</button>
        </div>
    );
}

export default Header;
