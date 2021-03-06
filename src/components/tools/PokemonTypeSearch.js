import React, { useContext, useState } from "react";
import { Grid, Image, Button } from "semantic-ui-react";
import AppContext from "../../context/AppContext";

const PokemonTypeSearch = () => {
  const { state, dispatch } = useContext(AppContext);
  const { firstTypeSelected, secondTypeSelected } = state;
  const [pokemonTypes] = useState([
    "water",
    "electric",
    "dragon",
    "normal",
    "fire",
    "flying",
    "fighting",
    "dark",
    "bug",
    "ghost",
    "grass",
    "ground",
    "fairy",
    "ice",
    "poison",
    "psychic",
    "rock",
    "steel",
  ]);

  const getTypeEntrys = async (type) => {
    //get pokemon data
    let fetchType = await fetch(
      `https://pokeapi.co/api/v2/type/${type}`
    ).catch((err) => console.log(err));

    let typeDataEntry = await fetchType.json();

    let allWantedPokemon = typeDataEntry.pokemon.map((i, k) => {
      let name = i.pokemon.name;
      let url = i.pokemon.url;

      return {
        name: name,
        typePossible: type,
        url: url,
      };
    });

    return { allWantedPokemon };
  };

  const handleUpdate = (value) => {
    if (!firstTypeSelected) {
      // Update first selected
      dispatch({ type: "UPDATE_FIRST_SELECTED_TYPE", payload: value });

      getTypeEntrys(value)
        .then((res) => {
          dispatch({
            type: "UPDATE_FIRST_POKEMON_LIST_WANTED",
            payload: res,
          });
        })
        .catch((err) => console.log("Error @ getTypeEntries", err));
    } else if (
      firstTypeSelected &&
      !secondTypeSelected &&
      firstTypeSelected !== value
    ) {
      // Update second selected
      dispatch({ type: "UPDATE_SECOND_SELECTED_TYPE", payload: value });
      getTypeEntrys(value)
        .then((res) => {
          dispatch({
            type: "UPDATE_SECOND_POKEMON_LIST_WANTED",
            payload: res,
          });
        })
        .catch((err) => console.log("Error @ getTypeEntries", err));
    } else {
      // Clear
      dispatch({ type: "CLEAR_SELECTED_TYPE" });
      dispatch({ type: "CLEAR_SEARCH" });
    }
  };

  return (
    <Grid>
      <Grid.Row columns="3">
        {pokemonTypes.map((type, key) => (
          <Grid.Column key={key} style={{ marginBottom: 20 }}>
            <Button
              compact
              color={
                firstTypeSelected === type
                  ? "green"
                  : secondTypeSelected === type
                  ? "green"
                  : null
              }
              onClick={() => handleUpdate(type)}
            >
              <Image
                src={require(`../../assets/typeIcons/${type}.png`)}
                alt={`The Pokemon type ${type}`}
                width={"100%"}
              />
            </Button>
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  );
};
export default PokemonTypeSearch;
