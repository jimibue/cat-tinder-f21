import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Header, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
export default function Home() {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    getCats();
  }, []);
  const getCats = async () => {
    try {
      let res = await axios.get("/api/cats");
      setCats(res.data);
    } catch (err) {
      alert(err);
    }
  };
  // sample get a random cat of arr
  const renderCat = () => {
    if (cats.length == 0) {
      return <p>No cats</p>;
    }
    let index = Math.floor(Math.random() * cats.length);
    let cat = cats[index];
    return (
      <div>
        <br />
        <Header as="h1">Cat Tinder</Header>
        <br />
        <Card key={cat.id}>
          <Image height={200} src={cat.avatar} />
          <Card.Content>
            <Card.Header>{cat.name}</Card.Header>
            <Card.Description>{cat.breed}</Card.Description>
            <Card.Meta>{cat.registry}</Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <Button color="red" icon basic>
              <Icon name="thumbs down" />
            </Button>
            <Button color="green" icon basic>
              <Icon name="thumbs up" />
            </Button>
          </Card.Content>
        </Card>
        <Link to="/my_cats">
          <Button color="blue">My Cats</Button>
        </Link>
      </div>
    );
  };

  return <div>{renderCat()}</div>;
}
