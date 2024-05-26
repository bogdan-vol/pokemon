import { Divider, Grid, List, ListItem, ListItemText } from "@mui/material";
import { PokemonStat } from "pokenode-ts";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

interface Props {
  items: PokemonStat[];
}

export default function Stats({ items }: Props) {
  return (
    <List sx={{ width: "100%" }}>
      {items.map(({ base_stat, effort, stat }) => (
        <ListItem
          key={stat.name}
          disableGutters
          secondaryAction={<QueryStatsIcon />}
          className="text-trending-dark-green"
        >
          <Grid container spacing={2}>
            <Grid item xs={4}>
              Name: {stat.name}
            </Grid>
            <Grid item xs={4}>
              Base stat: {base_stat}
            </Grid>
            <Grid item xs={4}>
              Effort: {effort}
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </List>
  );
}
