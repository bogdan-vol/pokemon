import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

interface Props {
  name: string;
  id: string;
}

export default function PokemonItem({ name, id }: Props) {
  return (
    <div className="border-2 bg-trending-dark-green rounded-md my-1">
      <ListItem>
        <ListItemAvatar>
          <Avatar
            sx={{ height: 100, width: 100 }}
            alt="Remy Sharp"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <div className="text-3xl text-trending-dark-orange">{name}</div>
          }
          className="capitalize"
        />
      </ListItem>
    </div>
  );
}
