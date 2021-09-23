import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Header, Image } from "semantic-ui-react";

export default function MyCats() {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    getCats();
  }, []);
  const getCats = async () => {
    try {
      let res = await axios.get("/api/my_cats");
      setCats(res.data);
    } catch (err) {
      alert(err);
    }
  };

  // loop over all cats
  const renderCats = () => {
    if (cats.length == 0) {
      return <p>No Liked Cats</p>;
    }
    return cats.map((cat) => {
      return (
        <Card key={cat.id}>
          <Image height={200} src={cat.avatar} />
          <Card.Content>
            <Card.Header>{cat.name}</Card.Header>
            <Card.Description>{cat.breed}</Card.Description>
            <Card.Meta>{cat.registry}</Card.Meta>
          </Card.Content>
        </Card>
      );
    });
  };

  return (
    <div>
      <h1>My Cats</h1>
      {renderCats()}
    </div>
  );
}
