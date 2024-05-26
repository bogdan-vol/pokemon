import { List, ListItem, ListItemText } from "@mui/material";
import { PokemonMove } from "pokenode-ts";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

interface Props {
  items: PokemonMove[];
}

export default function Moves({ items }: Props) {
  return (
    <List sx={{ width: "100%" }}>
      {items.map(({ move: { name } }) => (
        <ListItem
          key={name}
          disableGutters
          secondaryAction={<SportsEsportsIcon />}
          className="text-trending-dark-green"
        >
          <ListItemText primary={name} className="capitalize" />
        </ListItem>
      ))}
    </List>
  );
}
