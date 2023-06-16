import React, { useEffect, useState } from 'react';
import './App.css';
import { User } from './types';

function App() {
  const [userCard, setUserCard] = useState<User>();

  useEffect(() => {
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((json) => {
        setUserCard(json.results[0]);
      });
  }, []);

  const renderTouchable = (prefix: string, displayText: string) => {
    const link = `${prefix}${displayText}`
    return <a href={link}>{displayText}</a>
  }

  const renderUserCard = () => {
    if(!userCard) return

    const { location, email, name, phone, picture, login } = userCard

    return (
      <div className="card">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            columnGap: 10,
            marginBottom: 10,
          }}
        >
          <p className="cardTitle">
            {name.first} {name.last}
          </p>
          <p className="cardTitle" style={{ opacity: 0.5 }}>
            @{login?.username}
          </p>
        </div>

        <div className="cardContainer">
          <div className="cardRow">
            <p className="cardBody">{renderTouchable("mailto:", email)}</p>
            <p className="cardBody">{renderTouchable("tel:", phone)}</p>
          </div>
          <p className="cardBody">
            {location?.street?.number} {location?.street?.name}
          </p>
          <p className="cardBody">
            {location?.city}, {location?.state} {location?.postcode}
          </p>
          <p className="cardBody">{location?.country}</p>
          <div className="spacer" />
          {renderTouchable("", "https://randomuser.me/")}
        </div>
        <div className="cardImage">
          <img
            style={{
              height: 100,
              width: 100,
              borderRadius: 100,
            }}
            src={picture?.large}
            alt="the user"
          />
        </div>
      </div>
    );
  }
  
  return (
    <div className='root'>
      <div className="container">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div className='spacer'/>
        {renderUserCard()}
      </div>
    </div>
  );
}

export default App;
